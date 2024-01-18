import { calculateHashes, compareHashes } from './taskA';

export function findStringBase(str: string): string | null {
  const hashes = calculateHashes(str, [
    { x: 257, p: 69996151 },
    { x: 199, p: 69996151 },
  ]);

  let maxPrefixLength = 0;
  let areAlwaysEqual = true;
  for (let length = 1; length < str.length; length++) {
    const areEqual = compareHashes(hashes, length, 0, str.length - length);
    if (areEqual) {
      if (length > maxPrefixLength) maxPrefixLength = length;
    } else {
      areAlwaysEqual = false;
    }
  }

  if (areAlwaysEqual) {
    return str.slice(0, 1);
  }

  return maxPrefixLength === 0 ? str : str.slice(0, str.length - maxPrefixLength);
}
