import { Stack } from './task11';
interface City {
  prices: number;
  index: number;
}

/**
 * Calculates the movement in Linelandia.
 * 
 * @param prices - An array of prices for each city.
 * @returns An array representing the movement for each city.
 */
export function linelandiaMovement(prices: number[]): number[] {
  if (prices.length === 0) {
    return [];
  }

  const stack = new Stack<City>();
  const result: number[] = Array.from({length: prices.length});

  for (let i = 0; i < prices.length; i++) {
    if (stack.size() === 0) {
      stack.push({ prices: prices[i], index: i });
    } else {
      while (stack.back() && prices[i] < stack.back()!.prices) {
        const city = stack.pop()!;
        result[city.index] = i;
      }
      stack.push({ prices: prices[i], index: i });
    }
  }

  while (stack.size()) {
    result[stack.pop()!.index] = -1;
  }

  return result;
}
