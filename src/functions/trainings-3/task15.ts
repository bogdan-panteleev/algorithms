import { Stack } from './task11';
interface City {
  prices: number;
  index: number;
}
export function linelandiaMovement(prices: number[]): number[] {
  const stack = new Stack<City>();
  const result: number[] = new Array(prices.length);

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

  while (stack.size() !== 0) {
    result[stack.pop()!.index] = -1;
  }

  return result;
}
