import process from 'process';
import { fail, isInRange, Logger } from './helpers';

let inputCounter = 0;
let sequenceLength: number;
let requestsNumber: number;

let sequence: number[];
export function handleRow(array: number[], logger: Logger) {
  inputCounter++;

  if (inputCounter === 1) {
    if (array.length !== 2) {
      fail('Incorrect number of parameters for the first call', logger);
    }

    [sequenceLength, requestsNumber] = array;
    if (!isInRange(sequenceLength, [1, 100])) {
      fail('Incorrect value for sequence length', logger);
    }
    if (!isInRange(requestsNumber, [1, 1000])) {
      fail('Incorrect value for request number', logger);
    }
  } else if (inputCounter === 2) {
    if (array.length !== sequenceLength) {
      fail('Sequence length is different from actual array length', logger);
    }
    sequence = array;
  } else {
    const range = array;
    if (range.length !== 2) {
      fail('Range is wrong', logger);
    }
    if (range[0] > range[1]) {
      fail('Range is wrong', logger);
    }

    const notMinimumInRange = findNotMin(sequence, [range[0], range[1]]);
    if (notMinimumInRange !== null) {
      logger.write(notMinimumInRange.toString());
    } else {
      logger.write('NOT FOUND');
    }

    if (inputCounter === requestsNumber + 2) {
      process.exit();
    }
  }
}

function findNotMin(array: number[], [start, end]: [number, number]): number | null {
  let currentMin = array[start];
  // console.log('find not min called', array, start, end);
  for (let i = start; i <= end; i++) {
    // console.log('for loop: ', i, array[i]);
    if (array[i] > currentMin) return array[i];
    if (currentMin > array[i]) return currentMin;
  }
  return null;
}
