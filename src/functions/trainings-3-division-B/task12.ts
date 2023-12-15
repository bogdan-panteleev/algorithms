import { Stack } from './task11';

export function areBracketsCorrect(string: string): boolean {
  const stack = new Stack<string>();

  for (let i = 0; i < string.length; i++) {
    if (openBrackets.includes(string[i])) {
      stack.push(string[i]);
    } else if (closeToOpen[string[i]] === stack.back()) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.size() === 0;
}

const openBrackets = ['(', '[', '{'];
const closeToOpen: Record<string, string> = {
  ')': '(',
  ']': '[',
  '}': '{',
};
