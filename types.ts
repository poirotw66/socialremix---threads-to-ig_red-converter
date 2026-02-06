export enum Platform {
    INSTAGRAM = 'Instagram',
    XIAOHONGSHU = 'Xiaohongshu', // Red Note
}

export enum TopicCategory {
    LIFESTYLE = 'Lifestyle',
    TECH = 'Tech & AI',
    RELATIONSHIPS = 'Relationships',
    CAREER = 'Career & Growth',
    HUMOR = 'Humor & Memes',
}

export interface GeneratedPost {
    title?: string;
    content: string;
    hashtags: string[];
    imagePrompt?: string;
    imageUrl?: string; // Base64 data URL or image URL
}

export interface ConversionRequest {
    sourceText: string;
    targetPlatform: Platform;
    tone?: string;
}

export interface ErrorState {
    message: string;
    type?: 'error' | 'warning' | 'info';
}
