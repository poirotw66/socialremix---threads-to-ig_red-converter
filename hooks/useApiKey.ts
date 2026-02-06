import { useMemo } from 'react';

const API_KEY_STORAGE_KEY = 'gemini_api_key';

/**
 * Custom hook to manage and retrieve Gemini API key
 * Checks localStorage first, then falls back to environment variables
 */
export const useApiKey = () => {
    const apiKey = useMemo(() => {
        if (typeof window !== 'undefined') {
            const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
            if (storedKey) {
                return storedKey;
            }
        }
        // Fallback to environment variables
        return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_API_KEY || '';
    }, []);

    const hasApiKey = Boolean(apiKey?.trim());

    return {
        apiKey,
        hasApiKey,
    };
};
