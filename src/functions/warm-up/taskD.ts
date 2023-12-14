import { Logger } from './helpers';

export function isAnagram(first: string, second: string, logger: Logger) {
  const isAnagram = checkMapsEqual(stringToMap(first), stringToMap(second));
  const message = isAnagram ? 'YES' : 'NO';
  logger.write(message);
}

function stringToMap(str: string): Record<string, number> {
  const result: Record<string, number> = {};
  for (let char of str) {
    if (!result[char]) {
      result[char] = 1;
    } else {
      result[char]++;
    }
  }
  return result;
}

function checkMapsEqual(first: Record<string, number>, second: Record<string, number>): boolean {
  let firstKeys = Object.keys(first);
  for (let key of firstKeys) {
    if (first[key] !== second[key]) return false;
  }

  let secondKeys = Object.keys(second);
  for (let key of secondKeys) {
    if (second[key] !== first[key]) return false;
  }

  return true;
}
