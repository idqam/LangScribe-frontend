import { NextResponse } from 'next/server';
import { analyzeText } from '@/lib/nlp/analyze';

export async function POST(request: Request) {
    try {
        const { text } = await request.json();

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required and must be a string' },
                { status: 400 }
            );
        }

        const result = analyzeText(text);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
