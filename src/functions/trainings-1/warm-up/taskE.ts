import { Logger } from './helpers';

type zippedItem = {
  value: number;
  times: number;
};

export function calculateDiscontent(studentsNumber: number, ratings: number[], logger: Logger) {
  const zippedArr = zipArr(ratings);
  const totalSum = getSumOfZippedArr(zippedArr);

  const result = zippedArr.map<zippedItem>((zippedRating, index) => {
    const newVal =
      subtractAndGetSum(zippedArr, 0, index - 1, zippedRating.value, logger) +
      totalSum +
      subtractIncludingTimes(zippedArr, index, zippedRating.value);
    return { value: newVal, times: zippedRating.times };
  });

  logger.write(unzipArr(result).join(' '));
}

function subtractIncludingTimes(arr: zippedItem[], start: number, subtractor: number): number {
  let sum = 0;
  const length = arr.length;
  for (let i = start; i < length; i++) {
    sum -= subtractor * arr[i].times;
  }
  return sum;
}

function subtractAndGetSum(arr: zippedItem[], start: number, end: number, subtractor: number, logger: Logger) {
  let sum = 0;
  for (let i = start; i <= end; i++) {
    const newRatingAbs = Math.abs(arr[i].value - subtractor);
    const discontentChange = newRatingAbs - arr[i].value;

    sum += discontentChange * arr[i].times;
  }
  return sum;
}

function unzipArr(arr: zippedItem[]): number[] {
  const total = arr.reduce((sum, item) => item.times + sum, 0);
  const result: number[] = Array.from({ length: total });
  let lastItemCounter = 0;
  arr.forEach((zippedItem) => {
    for (let i = 0; i < zippedItem.times; i++) {
      result[lastItemCounter] = zippedItem.value;
      lastItemCounter++;
    }
  });

  return result;
}

function getSumOfZippedArr(arr: zippedItem[]) {
  return arr.reduce((sum, item) => sum + Math.abs(item.value) * item.times, 0);
}

function zipArr(arr: number[]) {
  const zippedArr: zippedItem[] = [];
  for (let item of arr) {
    const lastItem = zippedArr[zippedArr.length - 1];
    if (lastItem === undefined || lastItem.value !== item) {
      zippedArr.push({ value: item, times: 1 });
    } else {
      lastItem.times = lastItem.times + 1;
    }
  }
  return zippedArr;
}
