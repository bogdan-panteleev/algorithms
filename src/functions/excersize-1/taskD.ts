import { arrayIndexes } from '../warm-up/helpers';
import { merge } from './taskC';

export function mergeSort(arr: bigint[]): bigint[] {
  if (arr.length === 0) {
    return arr;
  }

  const resultBuffer: bigint[] = Array.from({ length: arr.length });
  doMergeSort(arr, { start: 0, end: arr.length - 1 }, resultBuffer);
  return resultBuffer;
}

function doMergeSort(source: bigint[], borders: arrayIndexes, result: bigint[]) {
  const arrLength = borders.end - borders.start + 1;
  if (arrLength === 1) {
    result[borders.start] = source[borders.start];
    return;
  }
  if (arrLength === 2) {
    if (source[borders.start] > source[borders.end]) {
      result[borders.start] = source[borders.end];
      result[borders.end] = source[borders.start];
    } else {
      result[borders.start] = source[borders.start];
      result[borders.end] = source[borders.end];
    }
    return;
  }

  const center = borders.start + Math.floor((borders.end - borders.start) / 2);

  const first: arrayIndexes = { start: borders.start, end: center };
  const second: arrayIndexes = { start: center + 1, end: borders.end };
  doMergeSort(source, first, result);
  copyValues(source, result, first);

  doMergeSort(source, second, result);
  copyValues(source, result, second);

  merge(source, first, second, result);
}

function copyValues(target: bigint[], source: bigint[], borders: arrayIndexes) {
  for (let i = borders.start; i <= borders.end; i++) {
    target[i] = source[i];
  }
}
