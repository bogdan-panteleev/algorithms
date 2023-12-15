import { Stack } from './task11';

export function isPossibleToSortCarriages(train: number[]): boolean {
  let lastSortedCarriage = 0;

  const stack = new Stack();

  for (let i = 0; i < train.length; i++) {
    stack.push(train[i]);

    while (stack.back() === lastSortedCarriage + 1) {
      stack.pop();
      lastSortedCarriage++;
    }
  }

  return stack.size() === 0;
}
