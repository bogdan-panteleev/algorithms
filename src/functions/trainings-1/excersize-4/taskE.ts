import { FileLogger, Logger } from '../warm-up/helpers';

const openToClose = {
  '(': ')',
  '[': ']',
};
const closeToOpen = {
  ')': '(',
  ']': '[',
};

const allBrackets = ['(', '[', ')', ']'];
const closingBrackets = [')', ']'];
const openingBrackets = ['(', '['];

const closingBracketsWithStacks: stringWithStack[] = closingBrackets.map((str) => ({ str, stack: runStack(str) }));

const bracketsPriority = {
  '(': 1,
  '[': 2,
  ')': 3,
  ']': 4,
};

let max = 0;

type stringWithStack = {
  str: string;
  stack: string[];
};

// function getPossibleBracketPermutations(n: number, logger: FileLogger): stringWithStack[] {
//   const work = [closingBracketsWithStacks];
//   n = 2;
//   while (work.length) {
//     const permutations = work[0];
//
//     const result: stringWithStack[] = [];
//     const brackets = n === max ? openingBrackets : allBrackets;
//     const charsLeft = max - n;
//
//     for (let baseIndex = 0; baseIndex < brackets.length; baseIndex++) {
//       const base = brackets[baseIndex];
//
//       for (let i = 0; i < permutations.length; i++) {
//         const initialStack = permutations[i].stack;
//         const updatedStackLength = runStackFromLeft(base, initialStack);
//
//         if ((base === '(' || base === '[') && updatedStackLength > initialStack.length) {
//           continue;
//         }
//
//         if (updatedStackLength > charsLeft) {
//           continue;
//         }
//
//         const newString = base + permutations[i].str;
//
//         if (n === max) {
//           logger.write(newString);
//         } else {
//           result.push({ str: newString, stack: runStack(newString) });
//         }
//       }
//     }
//     n++;
//     work.shift();
//     if (result.length) {
//       work.push(result);
//     }
//   }
//   return [];
// }

// function getPossibleBracketPermutations(n: number, logger: Logger): stringWithStack[] {
//   if (n === 1) {
//     return closingBracketsWithStacks;
//   }
//
//   const permutations = getPossibleBracketPermutations(n - 1, logger);
//
//   const result: stringWithStack[] = [];
//   const brackets = n === max ? openingBrackets : allBrackets;
//   const charsLeft = max - n;
//
//   for (let baseIndex = 0; baseIndex < brackets.length; baseIndex++) {
//     const base = brackets[baseIndex];
//
//     for (let i = 0; i < permutations.length; i++) {
//       const initialStack = permutations[i].stack;
//       const updatedStackLength = runStackFromLeft(base, initialStack);
//
//       if ((base === '(' || base === '[') && updatedStackLength > initialStack.length) {
//         continue;
//       }
//
//       if (updatedStackLength > charsLeft) {
//         continue;
//       }
//
//       const newString = base + permutations[i].str;
//
//       if (n === max) {
//         logger.write(newString);
//       } else {
//         result.push({ str: newString, stack: runStack(newString) });
//       }
//     }
//   }
//   return result;
// }
function runStack(sequence: string[], brackets: string[] = []): string[] {
  for (let char of sequence) {
    if (brackets.length === 0) {
      brackets.push(char);
    } else {
      const lastChar = brackets[brackets.length - 1];
      if (openToClose[lastChar] === char) {
        brackets.pop();
      } else {
        brackets.push(char);
      }
    }
  }

  return brackets;
}

function runStackFromRight(base: string, brackets: string[]): number {
  if (base === openToClose[brackets[brackets.length - 1]]) {
    return brackets.length - 1;
  }
  return brackets.length + 1;
}

// THE FINAL WORKING SOLUTION!!!!
export function getRightBracketSequences(n: number, logger: FileLogger): void {
  max = n;
  if (n === 0 || n === 1) {
    return;
  }
  getPossibleBracketPermutations(n, logger);
}

function getPossibleBracketPermutations(n: number, logger: FileLogger): string[] {
  const result: string[] = [];
  const buffer: string[] = [];
  let stackForBuffer: string[] = [];

  function findPermutation(): void {
    if (buffer.length === n) {
      logger.write(buffer.join(''));
      return;
    }
    const charsLeft = n - buffer.length;
    let saveBufferStack: string[] | undefined;

    handleOpenChar('(');
    handleOpenChar('[');
    handleCloseChar(')');
    handleCloseChar(']');

    function handleOpenChar(char: string) {
      buffer.push(char);
      const newStackLength = runStackFromRight(char, stackForBuffer);
      if (newStackLength < charsLeft) {
        saveBufferStack = stackForBuffer;
        stackForBuffer = runStack(buffer);
        findPermutation();
      }
      buffer.pop();
      if (saveBufferStack) {
        stackForBuffer = saveBufferStack;
      }
    }
    function handleCloseChar(char: string) {
      buffer.push(char);
      const newStackLength = runStackFromRight(char, stackForBuffer);
      if (newStackLength < stackForBuffer.length) {
        saveBufferStack = stackForBuffer;
        stackForBuffer = runStack(buffer);
        findPermutation();
      }
      buffer.pop();
      if (saveBufferStack) {
        stackForBuffer = saveBufferStack;
      }
    }
  }

  findPermutation();
  return result;
}

export function solution(n, logger: FileLogger) {
  n = Number(n);
  let ans = [];
  //parentheses
  //square brackets
  const isValid = (arr) => {
    let stack = [];
    for (let i = 0; i < arr.length; i++) {
      let b = arr[i];
      if (b === '(') {
        stack.push(')');
      }
      if (b === '[') {
        stack.push(']');
      }
      if (b === ')' || b === ']') {
        if (!stack.length || stack.pop() !== b) {
          return false;
        }
      }
    }
    return stack.length === 0;
  };

  const backtracking = (curr, leftP, rightP, leftS, rightS) => {
    if (curr.length === n) {
      if (isValid(curr)) {
        ans.push(curr.join(''));
      }
      if (ans.length === 10000) {
        logger.write(ans.join('\n'));
        ans.length = 0;
      }
      return;
    }
    if (leftP + leftS < n / 2) {
      curr.push('(');
      backtracking(curr, leftP + 1, rightP, leftS, rightS);
      curr.pop();
    }
    if (leftS + leftP < n / 2) {
      curr.push('[');
      backtracking(curr, leftP, rightP, leftS + 1, rightS);
      curr.pop();
    }
    if (rightS < leftS) {
      curr.push(']');
      backtracking(curr, leftP, rightP, leftS, rightS + 1);
      curr.pop();
    }
    if (rightP < leftP) {
      curr.push(')');
      backtracking(curr, leftP, rightP + 1, leftS, rightS);
      curr.pop();
    }
  };
  backtracking([], 0, 0, 0, 0);
  if (ans.length) logger.write(ans.join('\n'));
}
