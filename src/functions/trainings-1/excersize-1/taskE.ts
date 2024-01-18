import { Logger } from '../warm-up/helpers';

export function bitwiseSort(arr: string[], logger: Logger) {
  logger.write('Initial array:');
  logger.write(arr.join(', '));
  const length = arr[0].length;
  let currentDigit = length - 1;

  while (currentDigit >= 0) {
    logger.write('**********');
    logger.write(`Phase ${length - currentDigit}`);

    const buckets = createBuckets(arr, currentDigit);
    let arrIndex = 0;
    Object.keys(buckets)
      .map(Number)
      .sort((a, b) => a - b)
      .forEach((key, index) => {
        const bucketMessage = buckets[key].length ? buckets[key].join(', ') : 'empty';
        logger.write(`Bucket ${key}: ${bucketMessage}`);

        for (let i = 0; i < buckets[key].length; i++) {
          arr[arrIndex] = buckets[key][i];
          arrIndex++;
        }
      });

    currentDigit--;
  }

  logger.write('**********');
  logger.write('Sorted array:');
  logger.write(arr.join(', '));
}

function createBuckets(arr: string[], currentDigit: number): Record<string, string[]> {
  const buckets: Record<string, string[]> = {
    '0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [],
  };

  for (let i = 0; i < arr.length; i++) {
    buckets[arr[i][currentDigit]].push(arr[i]);
  }

  return buckets;
}
