import { NextRequest, NextResponse } from "next/server";
import {GoogleGenAI} from '@google/genai';
import { currentLoggedInUserInfo } from "@/utils/currentLogegdInUserInfo";
import prisma from "@/lib/prisma";
import { canCreateAIContent } from "@/app/dashboard/pricingUtils";
import { rateLimiters, getIdentifier, checkRateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { checkAndNotifyQuota } from "@/utils/quotaNotifications";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function POST(req: NextRequest){
    const session = await currentLoggedInUserInfo();
    if(!session){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const identifier = getIdentifier(req, 'user', session.id);
    const { success, limit, remaining, reset } = await checkRateLimit(rateLimiters.aiGeneration, identifier);
    
    if (!success) {
        return rateLimitResponse(limit, remaining, reset);
    }

    const user = await prisma.user.findUnique({
        where: {id: session.id}
    });

    if(!user) {
        return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    const hasQuota = await canCreateAIContent(user.id);
    if(!hasQuota) {
        return NextResponse.json({error: 'AI generation quota reached for this month'}, {status: 403});
    }

    try {
        const {content, selectedPlatforms, enhancements} = await req.json();

        const prompt = `
        You are an expert social media strategist with human-like creativity and emotional intelligence. Analyze the user's content and generate platform-specific variations that feel authentic, engaging, and tailored to each platform's unique audience and constraints.

USER INPUT:
Original Content: "${content}"
Platforms to generate for: ${selectedPlatforms.join(', ')}
Enhancement preferences: ${enhancements}

GENERATION RULES:
1. For EACH platform in selectedPlatforms, create 3 distinct versions:
   - Version 1: ${enhancements[0] || 'Professional'} style
   - Version 2: ${enhancements[1] || 'Engaging'} approach  
   - Version 3: ${enhancements[2] || 'Concise'} format

2. Platform-specific requirements:
   - LinkedIn (max 3000 chars): Professional, value-driven, industry insights
   - Twitter (STRICT max 280 chars INCLUDING hashtags, emojis, and ALL text): Punchy, concise, impactful. Count EVERY character including spaces and hashtags. NEVER exceed 280 total characters.
   - Facebook (max 5000 chars): Conversational, community-focused, shareable
   - Instagram (max 2200 chars): Visual storytelling, hashtag-rich, inspirational

3. Emotional authenticity:
   - Sound like a real human wrote it (not robotic)
   - Include natural pauses, contractions, and casual phrases
   - Match the emotional tone to the enhancement type
   - Add subtle personality quirks that make it memorable
   - If needed, infuse humor, empathy, or enthusiasm appropriately
   - Use EMOJIs sparingly to enhance tone without overdoing it
   - Avoid clichés and generic phrases
   - Ensure each version has a unique voice and style
   - Maintain clarity and coherence in messaging
   - Ensure proper grammar and spelling
   - Avoid overuse of hashtags; use only relevant ones( if add, add it at the end with 5 max)
   - Steer clear of controversial or sensitive topics 

4. Content transformation:
   - Preserve core message but adapt delivery
   - Add platform-appropriate elements (hashtags, @mentions, emojis)
   - CRITICAL FOR TWITTER: Ensure final character count is <= 280. Trim content, reduce hashtags, shorten wording as needed. Verify character count before outputting.
   - Adjust length to fit platform character limits STRICTLY
   - Vary sentence structure and opening hooks

5. Naming conventions for versions:
   Use clear, benefit-focused titles like:
   - "Professional Pitch"
   - "Storytelling Narrative" 
   - "Quick Impact"
   - "Conversational Share"
   - "Thread-Ready"

OUTPUT FORMAT:
Return ONLY valid JSON with this exact structure:
{
  "platforms": [
    {
      "provider": "platform_name",
      "versions": [
        {
          "id": 1,
          "title": "Descriptive Version Name",
          "content": "Full generated content here"
        },
        {
          "id": 2,
          "title": "Descriptive Version Name", 
          "content": "Full generated content here"
        },
        {
          "id": 3,
          "title": "Descriptive Version Name",
          "content": "Full generated content here"
        }
      ]
    }
  ]
}

IMPORTANT: 
- Make content feel HUMAN, not AI-generated
- Each version should be noticeably different in style
- Ensure content length fits platform constraints
- No markdown, no explanations, just the JSON
        `;

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
                }
            ]
        });

        const aiResponse = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const cleanedMessage = aiResponse.replace(/```json|```/g, '').trim();
        const parsedResponse = JSON.parse(cleanedMessage);

        await prisma.aI_Usage.create({
            data: {
                userId: user?.id || '',
                type: "COMPOSE_POST_PREVIEW",
                enhancement_types: enhancements,
                platforms_enhanced: selectedPlatforms,
                
            }
        });

        return NextResponse.json({suggestions: parsedResponse});
        
    } catch (error) {
        
    }
}