export const proficiencyMap: Record<string, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
  C2: 6,
};

const complexityMap: Record<string, number> = {
  Beginner: 1,
  Conversational: 1,
  Intermediate: 2,
  Advanced: 3,
  Academic: 4,
  Business: 4,
  "Fluency Training": 5,
};

export function complexitySimilarity(a: string, b: string): number {
  if (!complexityMap[a] || !complexityMap[b]) {
    console.warn(`Unknown complexity level: ${a} or ${b}`);
    return 0.1;
  }

  const diff = Math.abs(complexityMap[a] - complexityMap[b]);
  if (diff === 0) return 1.0;
  if (diff === 1) return 0.7;
  if (diff === 2) return 0.4;
  return 0.1;
}

export function proficiencyScore(
  promptLevel: string,
  requestLevel: string
): number {
  if (!proficiencyMap[promptLevel] || !proficiencyMap[requestLevel]) {
    console.warn(
      `Unknown proficiency level: ${promptLevel} or ${requestLevel}`
    );
    return 0.1;
  }

  const profDiff = proficiencyMap[promptLevel] - proficiencyMap[requestLevel];

  if (profDiff === 0) return 1.0;
  if (profDiff === 1) return 0.8;
  if (profDiff === -1) return 0.6;
  if (profDiff === 2) return 0.3;
  if (profDiff === -2) return 0.4;
  return 0.1;
}

export function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function sharedCategory(a: string, b: string): boolean {
  return a.split("_")[0] === b.split("_")[0];
}

export function intersectSize(a: string[] = [], b: string[] = []): number {
  return a.filter((i) => b.includes(i)).length;
}

export function weightedRandomSelect<T>(
  items: T[],
  scores: number[],
  temperature: number = 0.7
): T {
  if (items.length === 0) {
    throw new Error("Cannot select from empty array");
  }

  if (items.length === 1) {
    return items[0];
  }

  const weights = scores.map((s) => Math.exp(s / temperature));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }

  return items[items.length - 1];
}
