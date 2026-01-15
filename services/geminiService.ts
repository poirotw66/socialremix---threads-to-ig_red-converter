import { GoogleGenAI, Type } from "@google/genai";
import { Platform, GeneratedPost, TopicCategory } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

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