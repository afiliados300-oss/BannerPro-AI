
import { GoogleGenAI } from "@google/genai";
import { BannerConfig, GeneratedBanner } from "../types";
import { STORE_TITLES, GAMER_TITLES, LUXURY_TITLES, STORE_HASHTAGS, GAMER_HASHTAGS, LUXURY_HASHTAGS, FORMATS } from "../constants";

export class GeminiService {
  constructor() {}

  async generateBanner(config: BannerConfig): Promise<GeneratedBanner> {
    const formatInfo = FORMATS.find(f => f.value === config.format);
    const aspectRatio = formatInfo?.ratio || '1:1';
    
    let titlePool, hashtags, basePrompt, styleFocus;

    const brandText = config.brandName ? config.brandName.trim() : "";
    const mainMsg = config.mainText ? config.mainText.trim() : "";

    if (config.niche === 'store') {
      titlePool = STORE_TITLES;
      hashtags = STORE_HASHTAGS;
      styleFocus = "Clean commercial retail style, high-end studio lighting.";
      basePrompt = `Professional retail banner for ${config.type}. BRAND TO DISPLAY: "${brandText}". MAIN MESSAGE TO DISPLAY: "${mainMsg}". ${styleFocus} Colors: ${config.accentColor}, white, and black.`;
    } else if (config.niche === 'gamer') {
      titlePool = GAMER_TITLES;
      hashtags = GAMER_HASHTAGS;
      styleFocus = "Neon gaming aesthetic, RGB, HUD elements, cyberpunk vibe.";
      basePrompt = `High-impact Gamer banner for ${config.type}. GAMER BRAND: "${brandText}". PRIMARY TEXT: "${mainMsg}". ${styleFocus} Vibrant contrast, 4K resolution, esports look.`;
    } else {
      titlePool = LUXURY_TITLES;
      hashtags = LUXURY_HASHTAGS;
      styleFocus = "Ultra-luxury cinematic automotive photography, sleek reflections, 8K photorealistic.";
      basePrompt = `Elite luxury automotive banner for ${config.type}. CAR MODEL/BRAND: "${brandText}". AD MESSAGE: "${mainMsg}". ${styleFocus} Elegant composition, high-end architectural or city night background. Primary color accent: ${config.accentColor}.`;
    }

    const textInstruction = `CRITICAL: You MUST clearly and prominently write the text "${brandText}" and "${mainMsg}" on the banner. Use professional, bold, and modern typography that matches the niche. Do not hallucinate other random words.`;
    
    const randomTitle = titlePool[Math.floor(Math.random() * titlePool.length)];
    const fullPrompt = `${basePrompt} ${textInstruction} Aspect ratio: ${aspectRatio}. Ensure high conversion marketing layout.`;

    try {
      const localAi = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await localAi.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: fullPrompt }] },
        config: { imageConfig: { aspectRatio: aspectRatio as any } }
      });

      let imageUrl = '';
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!imageUrl) throw new Error("Image generation failed.");

      return {
        imageUrl,
        title: `${randomTitle}: ${config.mainText}`,
        hashtags: hashtags.split(' '),
        description: `Banner profissional otimizado para ${formatInfo?.label}.`
      };
    } catch (error) {
      console.error("Gemini Error:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
