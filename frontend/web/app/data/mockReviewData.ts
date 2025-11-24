export interface DailyWord {
    word: string;
    translation: string;
    pos: string;
    example: string;
    level: string;
}

export interface Exercise {
    id: string;
    type: 'fill-blank' | 'create-sentence';
    prompt: string;
    targetWord: string;
    correctAnswer: string;
    translation: string;
}

export interface GrammarTopic {
    title: string;
    explanation: string;
    examples: string[];
    level: string;
}

export const mockDailyWords: Record<string, DailyWord[]> = {
    'A1': [
        { word: 'house', translation: 'casa', pos: 'noun', example: 'I live in a big house.', level: 'A1' },
        { word: 'happy', translation: 'feliz', pos: 'adjective', example: 'She is very happy today.', level: 'A1' },
        { word: 'eat', translation: 'comer', pos: 'verb', example: 'I eat breakfast every morning.', level: 'A1' },
        { word: 'friend', translation: 'amigo', pos: 'noun', example: 'My friend is coming over.', level: 'A1' },
        { word: 'walk', translation: 'caminar', pos: 'verb', example: 'We walk to school.', level: 'A1' },
        { word: 'book', translation: 'libro', pos: 'noun', example: 'I read a book yesterday.', level: 'A1' },
        { word: 'small', translation: 'pequeño', pos: 'adjective', example: 'The cat is small.', level: 'A1' },
        { word: 'water', translation: 'agua', pos: 'noun', example: 'I drink water every day.', level: 'A1' },
        { word: 'run', translation: 'correr', pos: 'verb', example: 'They run in the park.', level: 'A1' },
        { word: 'beautiful', translation: 'hermoso', pos: 'adjective', example: 'The sunset is beautiful.', level: 'A1' },
    ],
    'A2': [
        { word: 'journey', translation: 'viaje', pos: 'noun', example: 'The journey was long but enjoyable.', level: 'A2' },
        { word: 'discover', translation: 'descubrir', pos: 'verb', example: 'We discovered a new restaurant.', level: 'A2' },
        { word: 'comfortable', translation: 'cómodo', pos: 'adjective', example: 'This chair is very comfortable.', level: 'A2' },
        { word: 'decide', translation: 'decidir', pos: 'verb', example: 'I need to decide soon.', level: 'A2' },
        { word: 'opinion', translation: 'opinión', pos: 'noun', example: 'What is your opinion on this?', level: 'A2' },
        { word: 'improve', translation: 'mejorar', pos: 'verb', example: 'I want to improve my skills.', level: 'A2' },
        { word: 'expensive', translation: 'caro', pos: 'adjective', example: 'That car is too expensive.', level: 'A2' },
        { word: 'remember', translation: 'recordar', pos: 'verb', example: 'I remember our first meeting.', level: 'A2' },
        { word: 'advice', translation: 'consejo', pos: 'noun', example: 'Can you give me some advice?', level: 'A2' },
        { word: 'prepare', translation: 'preparar', pos: 'verb', example: 'We need to prepare for the exam.', level: 'A2' },
    ],
    'B1': [
        { word: 'achievement', translation: 'logro', pos: 'noun', example: 'Graduating was a great achievement.', level: 'B1' },
        { word: 'persuade', translation: 'persuadir', pos: 'verb', example: 'She tried to persuade me to join.', level: 'B1' },
        { word: 'significant', translation: 'significativo', pos: 'adjective', example: 'This is a significant change.', level: 'B1' },
        { word: 'investigate', translation: 'investigar', pos: 'verb', example: 'The police will investigate the case.', level: 'B1' },
        { word: 'consequence', translation: 'consecuencia', pos: 'noun', example: 'Every action has a consequence.', level: 'B1' },
        { word: 'demonstrate', translation: 'demostrar', pos: 'verb', example: 'Let me demonstrate how it works.', level: 'B1' },
        { word: 'reliable', translation: 'confiable', pos: 'adjective', example: 'He is a reliable person.', level: 'B1' },
        { word: 'contribute', translation: 'contribuir', pos: 'verb', example: 'Everyone should contribute to the project.', level: 'B1' },
        { word: 'perspective', translation: 'perspectiva', pos: 'noun', example: 'From my perspective, this is correct.', level: 'B1' },
        { word: 'establish', translation: 'establecer', pos: 'verb', example: 'We need to establish clear rules.', level: 'B1' },
    ],
    'B2': [
        { word: 'endeavor', translation: 'esfuerzo', pos: 'noun', example: 'This is a worthwhile endeavor.', level: 'B2' },
        { word: 'articulate', translation: 'articular', pos: 'verb', example: 'She can articulate her thoughts clearly.', level: 'B2' },
        { word: 'profound', translation: 'profundo', pos: 'adjective', example: 'He had a profound impact on my life.', level: 'B2' },
        { word: 'contemplate', translation: 'contemplar', pos: 'verb', example: 'I need time to contemplate this decision.', level: 'B2' },
        { word: 'ambiguity', translation: 'ambigüedad', pos: 'noun', example: 'There is too much ambiguity in the contract.', level: 'B2' },
        { word: 'facilitate', translation: 'facilitar', pos: 'verb', example: 'Technology can facilitate communication.', level: 'B2' },
        { word: 'comprehensive', translation: 'completo', pos: 'adjective', example: 'We need a comprehensive plan.', level: 'B2' },
        { word: 'advocate', translation: 'abogar', pos: 'verb', example: 'She advocates for environmental protection.', level: 'B2' },
        { word: 'integrity', translation: 'integridad', pos: 'noun', example: 'He is known for his integrity.', level: 'B2' },
        { word: 'scrutinize', translation: 'escrutar', pos: 'verb', example: 'We must scrutinize every detail.', level: 'B2' },
    ],
};

export const mockExercises: Record<string, Exercise[]> = {
    'A1': [
        {
            id: 'ex1',
            type: 'fill-blank',
            prompt: 'I live in a big _____.',
            targetWord: 'house',
            correctAnswer: 'house',
            translation: 'Vivo en una casa grande.'
        },
        {
            id: 'ex2',
            type: 'fill-blank',
            prompt: 'She is very _____ today.',
            targetWord: 'happy',
            correctAnswer: 'happy',
            translation: 'Ella está muy feliz hoy.'
        },
    ],
    'B1': [
        {
            id: 'ex1',
            type: 'fill-blank',
            prompt: 'Graduating was a great _____.',
            targetWord: 'achievement',
            correctAnswer: 'achievement',
            translation: 'Graduarse fue un gran logro.'
        },
        {
            id: 'ex2',
            type: 'fill-blank',
            prompt: 'This is a _____ change.',
            targetWord: 'significant',
            correctAnswer: 'significant',
            translation: 'Este es un cambio significativo.'
        },
    ],
};

export const mockGrammarTopics: Record<string, GrammarTopic[]> = {
    'A1': [
        {
            title: 'Present Simple Tense',
            explanation: 'Use the present simple to talk about habits, routines, and general facts.',
            examples: [
                'I eat breakfast every morning.',
                'She walks to school.',
                'They live in a big house.'
            ],
            level: 'A1'
        }
    ],
    'B1': [
        {
            title: 'Past Perfect Tense',
            explanation: 'Use the past perfect to show that one action happened before another in the past.',
            examples: [
                'I had finished my homework before dinner.',
                'She had already left when I arrived.',
                'They had never seen such a beautiful sunset.'
            ],
            level: 'B1'
        }
    ],
};

export const getUserLevel = (): string => {
    // Mock: In production, this would fetch from user profile
    return 'B1';
};

export const getDailyWords = (level: string, count: number = 10): DailyWord[] => {
    const words = mockDailyWords[level] || mockDailyWords['A1'];
    return words.slice(0, count);
};

export const getDailyExercises = (level: string): Exercise[] => {
    return mockExercises[level] || mockExercises['A1'];
};

export const getGrammarTopics = (level: string): GrammarTopic[] => {
    return mockGrammarTopics[level] || mockGrammarTopics['A1'];
};
