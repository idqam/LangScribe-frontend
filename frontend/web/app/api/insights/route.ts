import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required and must be a string' },
                { status: 400 }
            );
        }

        const prompt = `You are a language tutor helping an A2-level language learner improve their writing. 

Analyze the following text and provide:
1. Overall feedback on their writing
2. Grammar and syntax corrections (if any)
3. Vocabulary insights - comment on word choices and suggest alternatives
4. Learning recommendations specific to their A2 level

Text to analyze:
"""
${text}
"""

Please structure your response as a JSON object with these fields:
- feedback: string (overall assessment)
- grammarSuggestions: string[] (list of grammar/syntax corrections)
- vocabularyInsights: string[] (list of vocabulary observations and suggestions)
- learningRecommendations: string[] (list of specific learning targets)

Keep your feedback encouraging and constructive. Focus on practical improvements.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful language tutor. Always respond with valid JSON matching the requested structure.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        });

        const responseContent = completion.choices[0]?.message?.content;

        if (!responseContent) {
            throw new Error('No response from OpenAI');
        }

        const insights = JSON.parse(responseContent);

        return NextResponse.json({
            ...insights,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error('Insights generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate insights' },
            { status: 500 }
        );
    }
}
