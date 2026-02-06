import { GoogleGenAI, Type } from "@google/genai";
import { Platform, GeneratedPost, TopicCategory } from "../types";

const API_KEY_STORAGE_KEY = 'gemini_api_key';

// Get API key from localStorage or environment variable
const getApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedKey) {
      return storedKey;
    }
  }
  // Fallback to environment variable for server-side or initial load
  // Vite requires VITE_ prefix for client-side env vars
  return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || process.env.API_KEY || '';
};

// Initialize AI client with dynamic API key
const getAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Gemini API key is not set. Please configure it in Settings.');
  }
  return new GoogleGenAI({ apiKey });
};

// System instructions for different personas
const SYSTEM_INSTRUCTION_RED = `You are a top-tier influencer on Xiaohongshu (Little Red Book). 
Your writing style is emotional, engaging, and uses the "Internet wormhole" style.
- You MUST use emojis liberally (e.g., ✨, 💡, 🍓, 😭, 📝).
- Structure: Catchy Headline -> Emotional Hook -> Core Value/Story -> Call to Action -> Tags.
- Tone: "Sisters!", "Family!", explicit sharing of personal experience, helpful tips.
- Use spacing to make it readable on mobile.
- Language: Traditional Chinese (Taiwan/HK style) mixed with trending slang.`;

const SYSTEM_INSTRUCTION_IG = `You are a professional Social Media Manager for Instagram.
Your writing style is aesthetic, clean, and value-driven.
- Structure: Hook (first line) -> Line break -> Body (bullet points or short paragraphs) -> CTA (Save this post) -> Tags block.
- Tone: Inspiring, chill, or informative.
- Formatting: Use line breaks effectively. Use bullet points (• or -).
- Language: Traditional Chinese.`;

export const generateTrendingTopic = async (category: TopicCategory): Promise<string> => {
  try {
    const ai = getAI();
    const prompt = `Generate a realistic, viral-worthy discussion topic or "hot take" that might appear on Threads right now regarding "${category}". 
    It should be in Traditional Chinese (Taiwan colloquial style).
    It should be raw, conversational, and slightly controversial or very relatable. 
    Just return the text of the post, nothing else.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
      }
    });

    return response.text?.trim() || "Failed to generate topic.";
  } catch (error) {
    console.error("Error generating topic:", error);
    return "Could not fetch trending topics at this time.";
  }
};

export const transformContent = async (
  sourceText: string,
  platform: Platform
): Promise<GeneratedPost> => {
  const ai = getAI();
  const isRed = platform === Platform.XIAOHONGSHU;
  const systemInstruction = isRed ? SYSTEM_INSTRUCTION_RED : SYSTEM_INSTRUCTION_IG;
  const modelName = 'gemini-3-flash-preview';

  const prompt = `
    Rewrite the following source text for ${platform}.
    
    Source Text:
    """
    ${sourceText}
    """

    Requirements:
    1. Extract the core meaning but completely rewrite the format.
    2. If it's Xiaohongshu, create a clickbait title. If Instagram, create a strong hook line.
    3. Generate 10-15 relevant hashtags.
    4. Also suggest a short English prompt for an AI image generator that would fit this post vibe.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Title for the post (crucial for Xiaohongshu)" },
            content: { type: Type.STRING, description: " The main body of the post including emojis and formatting" },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of hashtags without #" },
            imagePrompt: { type: Type.STRING, description: "A prompt to generate an image for this post" }
          },
          required: ["content", "hashtags"]
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    return {
      title: data.title,
      content: data.content,
      hashtags: data.hashtags || [],
      imagePrompt: data.imagePrompt
    };
  } catch (error) {
    console.error("Error transforming content:", error);
    throw new Error("Failed to transform content. Please try again.");
  }
};

/**
 * Extract image data from API response
 * Handles multiple possible response formats
 */
const extractImageFromResponse = (response: any): string | null => {
    // Try to get candidates array
    const candidates = response?.candidates || response?.data?.candidates || [];
    if (candidates.length === 0) {
        return null;
    }

    const content = candidates[0]?.content || candidates[0];
    const parts = content?.parts || content?.data?.parts || [];

    // Check all possible image data formats
    const imageFormats = [
        // Format 1: inlineData (base64)
        (part: any) => {
            if (part.inlineData?.data) {
                const mimeType = part.inlineData.mimeType || 'image/png';
                return `data:${mimeType};base64,${part.inlineData.data}`;
            }
            return null;
        },
        // Format 2: inline_data (snake_case)
        (part: any) => {
            if (part.inline_data?.data) {
                const mimeType = part.inline_data.mime_type || part.inline_data.mimeType || 'image/png';
                return `data:${mimeType};base64,${part.inline_data.data}`;
            }
            return null;
        },
        // Format 3: imageUrl
        (part: any) => part.imageUrl?.url || part.imageUrl || null,
        // Format 4: image_url
        (part: any) => part.image_url?.url || part.image_url || null,
        // Format 5: fileData
        (part: any) => part.fileData?.fileUri || part.fileData?.uri || null,
        // Format 6: image property directly
        (part: any) => {
            if (typeof part.image === 'string') {
                return part.image.startsWith('data:') ? part.image : `data:image/png;base64,${part.image}`;
            }
            if (part.image?.data) {
                const mimeType = part.image.mimeType || 'image/png';
                return `data:${mimeType};base64,${part.image.data}`;
            }
            return null;
        },
    ];

    // Try each format on each part
    for (const part of parts) {
        for (const formatChecker of imageFormats) {
            const result = formatChecker(part);
            if (result) {
                return result;
            }
        }
    }

    // Check if response.text contains image data
    const text = response?.text || response?.data?.text;
    if (text) {
        if (text.startsWith('data:image')) {
            return text;
        }
        // Sometimes base64 is returned as plain text
        if (text.length > 100 && /^[A-Za-z0-9+/=]+$/.test(text)) {
            return `data:image/png;base64,${text}`;
        }
    }

    return null;
};

/**
 * Generate image using Gemini API
 * Simplified error handling with better error messages
 */
export const generateImage = async (prompt: string): Promise<string | null> => {
    const ai = getAI();
    const modelName = 'gemini-2.5-flash-image';

    // Try different API call formats
    const apiCallFormats = [
        // Format 1: Direct content generation with image modality
        () =>
            ai.models.generateContent({
                model: modelName,
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                config: {
                    responseModalities: ['IMAGE'],
                    temperature: 0.7,
                },
            }),
        // Format 2: Simple prompt with config
        () =>
            ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                    responseModalities: ['IMAGE'],
                },
            }),
        // Format 3: With generationConfig
        () =>
            ai.models.generateContent({
                model: modelName,
                contents: prompt,
                generationConfig: {
                    responseModalities: ['IMAGE'],
                },
            }),
    ];

    let lastError: Error | null = null;

    // Try each API call format
    for (const apiCall of apiCallFormats) {
        try {
            const response = await apiCall();
            const imageData = extractImageFromResponse(response);

            if (imageData) {
                return imageData;
            }

            // If we got a response but no image, log for debugging
            console.warn('API call succeeded but no image found:', response);
        } catch (error: any) {
            lastError = error;
            // Continue to next format
            continue;
        }
    }

    // If all formats failed, provide specific error messages
    const errorMsg = lastError?.message || 'Unknown error';
    console.error('Error generating image:', lastError);

    if (errorMsg.includes('quota') || errorMsg.includes('billing') || errorMsg.includes('payment')) {
        throw new Error('Image generation requires a paid API plan. Please upgrade your Gemini API account.');
    }
    if (errorMsg.includes('model') || errorMsg.includes('not found') || errorMsg.includes('not available')) {
        throw new Error('Image generation model is not available. Please check your API access or try a different model.');
    }
    if (errorMsg.includes('permission') || errorMsg.includes('unauthorized')) {
        throw new Error('API key does not have permission to generate images. Please check your API key permissions.');
    }

    throw new Error(errorMsg || 'Failed to generate image. Please try again.');
};