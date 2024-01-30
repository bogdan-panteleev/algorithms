export function boringLecture(src: string): Record<string, number> {
  const result: Record<string, number> = {};

  const cachedCalculator = getCachedCalculator(src.length);

  for (let i = 0; i < src.length; i++) {
    if (result[src[i]] === undefined) {
      result[src[i]] = 0;
    }

    const position = Math.min(i, src.length - 1 - i);
    result[src[i]] += cachedCalculator(position);
  }
  return result;
}

function getCachedCalculator(n: number): (position: number) => number {
  const cache: number[] = [n];
  return (position: number): number => {
    if (cache[position] === undefined) {
      const previous = cache[position - 1];
      cache[position] = previous + (n - 2 * position);
    }

    return cache[position];
  };
}
