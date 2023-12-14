import { Logger } from '../warm-up/helpers';

export function partitionTask(arr: number[], pivot: number, logger: Logger) {
  if (arr.length === 0) {
    logger.write((0).toString());
    logger.write((0).toString());
    return;
  }

  const predicateEndIndex = partition((num) => num < pivot, arr, 0, arr.length - 1, logger);
  const trueItems = predicateEndIndex + 1;
  const falseItems = arr.length - trueItems;

  logger.write(trueItems.toString());
  logger.write(falseItems.toString());
}

export function partition(
  cb: (elem: bigint) => 1 | -1 | 0,
  arr: bigint[],
  start: number,
  end: number,
  logger: Logger
): { firstEqual: number | undefined; firstGreater: number | undefined } {
  let firstEqual = undefined;
  let firstGreater = undefined;
  for (let now = start; now <= end; now++) {
    const check = cb(arr[now]);

    if (check === 0) {
      if (firstEqual === undefined) {
        firstEqual = now;
      }
      if (firstGreater !== undefined && firstGreater < firstEqual) {
        swapElements(arr, firstEqual, firstGreater);
        firstEqual = firstGreater;
        firstGreater++;
      } else if (firstGreater !== undefined && firstEqual !== undefined) {
        swapElements(arr, now, firstGreater);
        firstGreater++;
      }
    }

    if (check === 1) {
      if (firstGreater === undefined) {
        firstGreater = now;
      }
    }

    if (check === -1) {
      if (firstGreater !== undefined && firstEqual === undefined) {
        swapElements(arr, now, firstGreater);
        firstGreater++;
      }
      if (firstGreater !== undefined && firstEqual !== undefined) {
        swapElements(arr, firstEqual, now);
        firstEqual++;

        swapElements(arr, now, firstGreater);
        firstGreater++;
      }
      if (firstGreater === undefined && firstEqual !== undefined) {
        swapElements(arr, now, firstEqual);
        firstEqual++;
      }
    }
  }
  return { firstEqual, firstGreater };
}

// export function partition(
//     cb: (elem: number) => 1 | -1 | 0,
//     arr: number[],
//     start: number,
//     end: number,
//     logger: Logger
// ): number {
//   // logger.write('partition range: ' + (end - start).toString() + ': ' + start + ' ' + end);
//   // const startTime = new Date();
//   let predicateTrueIndex = -1;
//   let predicateFalseIndex = arr.length;
//   let lastEqualPointer = undefined;
//
//   while (predicateTrueIndex < predicateFalseIndex && predicateTrueIndex < end) {
//     const nextTrueIndex = predicateTrueIndex === -1 ? start : predicateTrueIndex + 1;
//     const isNextTrueElementCorrect = cb(arr[nextTrueIndex]) === -1;
//
//     if (isNextTrueElementCorrect) {
//       predicateTrueIndex = nextTrueIndex;
//     } else {
//       let nextFalseIndex = predicateFalseIndex === arr.length ? end : predicateFalseIndex - 1;
//       const checkNextFalseIndex = cb(arr[nextFalseIndex]);
//       let isNextFalseElementCorrect = checkNextFalseIndex > -1;
//
//       const minIndex = Math.max(predicateTrueIndex, start);
//       while (predicateFalseIndex > minIndex && isNextFalseElementCorrect) {
//         predicateFalseIndex = nextFalseIndex;
//         nextFalseIndex = predicateFalseIndex - 1;
//         isNextFalseElementCorrect = !cb(arr[nextFalseIndex]);
//       }
//       if (nextTrueIndex >= nextFalseIndex) break;
//
//       swapElements(arr, nextTrueIndex, nextFalseIndex);
//       predicateFalseIndex = nextFalseIndex;
//       predicateTrueIndex = nextTrueIndex;
//     }
//   }
//
//   // const endTime = new Date();
//
//   // logger.write('^^^ took time: ' + (endTime - startTime).toString());
//   return predicateTrueIndex;
// }

export function swapElements(arr: bigint[], firstIndex: number, secondIndex: number): void {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
}
