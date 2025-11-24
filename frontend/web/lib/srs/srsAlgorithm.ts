/**
 * Simple implementation of the SM-2 algorithm (SuperMemo-2).
 * 
 * Inputs:
 * - quality: 0-5 rating from the user (0=blackout, 5=perfect)
 * - lastInterval: days since last review
 * - lastEase: ease factor (default 2.5)
 * - repetitions: number of times successfully recalled in a row
 * 
 * Outputs:
 * - interval: days until next review
 * - ease: new ease factor
 * - repetitions: new repetition count
 */

export interface SRSResult {
    interval: number; // Days until next review
    ease: number;     // New ease factor
    repetitions: number; // Consecutive successful recalls
    dueDate: number;  // Timestamp for next review
}

export const calculateSRS = (
    quality: number, // 0-5
    lastInterval: number,
    lastEase: number,
    repetitions: number
): SRSResult => {
    let interval: number;
    let ease: number;
    let newRepetitions: number;

    if (quality >= 3) {
        // Correct response
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 6;
        } else {
            interval = Math.round(lastInterval * lastEase);
        }
        newRepetitions = repetitions + 1;
    } else {
        // Incorrect response
        newRepetitions = 0;
        interval = 1;
    }

    // Update Ease Factor
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    ease = lastEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    // Ease factor should not drop below 1.3
    if (ease < 1.3) {
        ease = 1.3;
    }

    // Calculate due date
    const now = new Date();
    const dueDate = new Date(now.setDate(now.getDate() + interval)).getTime();

    return {
        interval,
        ease,
        repetitions: newRepetitions,
        dueDate
    };
};

export const getInitialCardState = (): SRSResult => {
    return {
        interval: 0,
        ease: 2.5,
        repetitions: 0,
        dueDate: Date.now() // Due immediately
    };
};
