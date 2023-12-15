import { Stack } from './task11';

export function calculatePostfixNotation(notation: string[]): number {
  const stack = new Stack<number>();

  for (let i = 0; i < notation.length; i++) {
    if (operations.includes(notation[i])) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(calculateOperation(notation[i], a, b));
    } else {
      stack.push(Number(notation[i]));
    }
  }

  return stack.back()!;
}

const operations = ['+', '-', '*', '/'];

function calculateOperation(operation: string, a: number, b: number) {
  return eval(`a ${operation} b`);
}
