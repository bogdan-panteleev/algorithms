export function calculator(src: string): number {
  try {
    return calculateReversedPolishNotation(buildReversedPolishNotation(src));
  } catch (e) {
    return NaN;
  }
}

const isOperand = (src: string) => !isNaN(Number(src));

const operators: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
};
const isOperator = (src: string) => Boolean(operators[src]);

function buildReversedPolishNotation(src: string): string[] {
  const result: string[] = [];
  const stack: string[] = [];

  if (/\d+\s\d+/g.exec(src)) {
    throw new Error('Invalid');
  }

  const parsedString = src.match(/(\+|-|\*|\d+|\(|\))/g)!;

  for (let item of parsedString) {
    if (isOperand(item)) {
      result.push(item);
    } else if (isOperator(item)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        operators[stack[stack.length - 1]] >= operators[item]
      ) {
        result.push(stack.pop()!);
      }
      stack.push(item);
    } else if (item === '(') {
      stack.push(item);
    } else if (item === ')') {
      while (stack[stack.length - 1] !== '(') {
        result.push(stack.pop()!);
        if (stack.length === 0) {
          throw new Error('Invalid');
        }
      }
      stack.pop();
    }
  }
  result.push(...stack.reverse());

  return result;
}

function calculateReversedPolishNotation(src: string[]): number {
  const stack: number[] = [];

  for (let item of src) {
    if (!isNaN(Number(item))) {
      stack.push(Number(item));
    } else {
      const second = stack.pop();
      const first = stack.pop();
      stack.push(eval(`${first} ${item} ${second}`));
    }
  }

  return stack[0];
}
