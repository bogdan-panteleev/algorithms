import { Logger } from './helpers';

export function isRight(sequence: string, logger: Logger) {
  const closingBrackets = {
    '{': '}',
    '(': ')',
    '[': ']',
  };

  const brackets: string[] = [];
  for (let char of sequence) {
    if (brackets.length === 0) {
      brackets.push(char);
    } else {
      const lastChar = brackets[brackets.length - 1];
      if (closingBrackets[lastChar] === char) {
        brackets.pop();
      } else {
        brackets.push(char);
      }
    }
  }

  const isOk = brackets.length === 0;

  if (isOk) {
    logger.write('yes');
  } else {
    logger.write('no');
  }
}
