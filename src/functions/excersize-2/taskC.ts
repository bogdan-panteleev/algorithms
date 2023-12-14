import { calculateHashes, compareHashes } from './taskArewritten';
import { Logger } from '../warm-up/helpers';

export function zFunction(param: { str: string }, logger: Logger): number[] {
  const hashes = calculateHashes(param, [
    // { x: 257, p: 69996151 },
    { x: 257, p: 90001393 },
  ]);

  const result: number[] = new Array(param.str.length);
  result[0] = 0;
  const startCharCode = param.str.charCodeAt(0);
  for (let i = 1; i < param.str.length; i++) {
    result[i] = param.str.charCodeAt(i) === startCharCode ? calculateSingleZ(hashes, i) : 0;
  }

  return result;
}

function calculateSingleZ(hashes: ReturnType<typeof calculateHashes>, i: number): number {
  let start: number = i;
  let end: number = hashes[0].hashes.length - 1;

  while (start !== end) {
    const center = start + Math.ceil((end - start) / 2);
    const areSubstringsEqual = compareHashes(hashes, center - i + 1, 0, i);

    if (areSubstringsEqual) {
      start = center;
    } else {
      end = center - 1;
    }
  }

  return compareHashes(hashes, end - i + 1, 0, i) ? end - i + 1 : 0;
}
