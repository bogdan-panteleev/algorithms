export function paidCalculator(numbers: number[]): string {
  let currentQueue: number[] = numbers.sort((a, b) => a - b);
  let nextQueue: number[] = [];

  let sumToPay = 0;

  while (currentQueue.length > 1) {
    console.log(currentQueue);
    for (let i = 0; i < currentQueue.length; i++) {
      let sum = 0;
      if (currentQueue[i + 1] === undefined) {
        sum = currentQueue[i];
        insertViaBinSearch(nextQueue, sum);
      } else {
        sum = currentQueue[i] + currentQueue[i + 1];
        let add = sum * 0.1;
        sumToPay += add;
        // console.log(currentQueue[i], currentQueue[i + 1], add);
        i++;
        nextQueue.push(sum);
      }
    }
    currentQueue = nextQueue;
    nextQueue = [];
  }

  return sumToPay.toFixed(2);
}

function insertViaBinSearch(arr: number[], val: number): void {
  let start = 0;
  let end = arr.length - 1;
  let center = start + Math.floor((end - start) / 2);

  while (start < end) {
    if (center < val) {
      start = center + 1;
    } else {
      end = center;
    }
    center = start + Math.floor((end - start) / 2);
  }

  const position = start;

  if (arr[position] > val) {
    arr.splice(position, 0, val);
  } else {
    arr.splice(position + 1, 0, val);
  }
}
