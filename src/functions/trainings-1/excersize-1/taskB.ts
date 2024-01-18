import { partition, swapElements } from './taskA';
import { Logger } from '../warm-up/helpers';

let counter = 0;

export function quickSort(arr: bigint[], start = 0, end = arr.length - 1, logger: Logger) {
  const itemsToHandle = end - start + 1;
  if (itemsToHandle === 2) {
    if (arr[start] > arr[end]) {
      swapElements(arr, start, end);
    }
    return;
  }
  const pivotIndex = getRandomInt(start, end);
  const pivot = arr[pivotIndex];
  const partitionResult = partition(
    (elem) => {
      const diff = elem - BigInt(pivot);
      if (diff > 0) return 1;
      if (diff < 0) return -1;
      return 0;
    },
    arr,
    start,
    end,
    logger
  );

  if (partitionResult.firstEqual !== undefined && partitionResult.firstGreater !== undefined) {
    if (partitionResult.firstEqual !== 0) {
      const beforeEqual = partitionResult.firstEqual - 1;
      if (beforeEqual > start) {
        quickSort(arr, start, beforeEqual, logger);
      }
      if (end > partitionResult.firstGreater) {
        quickSort(arr, partitionResult.firstGreater, end, logger);
      }
    } else {
      if (end > partitionResult.firstGreater) {
        quickSort(arr, partitionResult.firstGreater, end, logger);
      }
    }
  }
  if (partitionResult.firstEqual !== undefined && partitionResult.firstGreater === undefined) {
    if (partitionResult.firstEqual !== 0) {
      const beforeEqual = partitionResult.firstEqual - 1;
      if (beforeEqual > start) {
        quickSort(arr, start, partitionResult.firstEqual - 1, logger);
      }
    }
  }
}

// export function quickSort(arr: number[], start = 0, end = arr.length - 1, logger: Logger) {
//   console.log(start, end);
//   if (end - start === 1) {
//     if (arr[start] > arr[end]) {
//       swapElements(arr, start, end);
//     }
//     return;
//   }
//   const randomShift = counter % 3;
//   const randomMultiplier = counter % 2 === 1 ? -1 : 1;
//
//   const pivotIndex = getPivotIndex(Math.floor(start + (end - start) / 2), randomShift * randomMultiplier, start, end);
//   const pivot = arr[pivotIndex];
//   const partitionIndex = partition(
//     (elem) => {
//       const diff = elem - pivot;
//       if (diff > 0) return 1;
//       if (diff < 0) return -1;
//       return 0;
//     },
//     arr,
//     start,
//     end,
//     logger
//   );
//   let nextToPartition: number;
//
//   if (partitionIndex === -1) {
//     swapElements(arr, start, pivotIndex);
//     nextToPartition = start + 1;
//   } else if (partitionIndex === end) {
//     swapElements(arr, end, pivotIndex);
//     nextToPartition = partitionIndex;
//   } else {
//     nextToPartition = partitionIndex + 1;
//   }
//
//   if (partitionIndex > start) {
//     quickSort(arr, start, partitionIndex, logger);
//   }
//
//   if (nextToPartition < end && nextToPartition < arr.length) {
//     quickSort(arr, nextToPartition, end, logger);
//   }
// }

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function getPivotIndex(base: number, shift: number, start: number, end: number) {
  const result = base + shift;
  if (result < start || result > end) {
    return base;
  }
  return result;
}
