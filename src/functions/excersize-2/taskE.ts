import { getCachedPowFn, hashesForOption, runOptions } from '../warm-up/helpers';

const cachedPow = getCachedPowFn();

function calculateHashes(
  source: { str: number[] },
  options: runOptions[],
  reverseDirection = false
): hashesForOption[] {
  const hashes: hashesForOption[] = options.map((option) => ({ ...option, hashes: new Array(source.str.length) }));
  let accumulators: number[] = options.map(() => 0);

  if (!reverseDirection) {
    for (let i = 0; i < source.str.length; i++) {
      for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const option = options[optionIndex];
        const hashArr = hashes[optionIndex].hashes;
        const x = option.x;
        const p = option.p;

        accumulators[optionIndex] = (accumulators[optionIndex] * x + source.str[i]) % p;
        cachedPow(x, i, p);
        hashArr[i] = accumulators[optionIndex];
      }
    }
  } else {
    for (let targetPointer = 0, sourceIndex = source.str.length - 1; sourceIndex >= 0; targetPointer++, sourceIndex--) {
      for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
        const option = options[optionIndex];
        const hashArr = hashes[optionIndex].hashes;
        const x = option.x;
        const p = option.p;

        accumulators[optionIndex] = (accumulators[optionIndex] * x + source.str[sourceIndex]) % p;
        cachedPow(x, sourceIndex, p);
        hashArr[targetPointer] = accumulators[optionIndex];
      }
    }
  }

  return hashes;
}
function compareHashesPatched(
  hashesFirst: hashesForOption[],
  hashesSecond: hashesForOption[],
  len: number,
  firstStart: number,
  secondStart: number
): boolean {
  const numberOfChecks = hashesFirst.length;

  for (let i = 0; i < numberOfChecks; i++) {
    const x = hashesFirst[0].x;
    const p = hashesFirst[0].p;

    const hashes1 = hashesFirst[0].hashes;
    const hashes2 = hashesSecond[0].hashes;
    const xPowLen = cachedPow(x, len, p);

    const firstRowHash = (hashes1[firstStart + len - 1] + (hashes2[secondStart - 1] ?? 0) * xPowLen) % p;
    const secondRowHash = (hashes2[secondStart + len - 1] + (hashes1[firstStart - 1] ?? 0) * xPowLen) % p;

    if (firstRowHash !== secondRowHash) {
      return false;
    }
  }

  return true;
}

export function getNumberOfSubPalindromesNaive(param: { str: number[] }): number {
  const hashes = calculateHashes(param, [{ x: 257, p: 90001393 }]);
  const reversedHashes = calculateHashes(param, [{ x: 257, p: 90001393 }], true);

  const strLength = param.str.length;

  let palindromesCounter = strLength;

  for (let length = 2; length <= strLength; length++) {
    for (let i = 0; i <= strLength - length; i++) {
      const isPalindrome = checkIfPalindrome(hashes, reversedHashes, length, i);
      if (isPalindrome) palindromesCounter++;
    }
  }

  return palindromesCounter;
}

function getPalindromesForLength(int: number) {
  if (int === 0) {
    return 0;
  }
  const isEven = int % 2 === 0;
  if (isEven) {
    return int / 2;
  } else {
    return (int - 1) / 2;
  }
}

function getMaxPalindromeLength(
  hashesFirst: hashesForOption[],
  hashesSecond: hashesForOption[],
  i: number,
  oneSideLen: number
): number {
  const result: number[] = [];
  if (i !== 0) {
    result.push(getMaxPalindromeLengthOdd(hashesFirst, hashesSecond, i, oneSideLen));
  }
  result.push(getMaxPalindromeLengthEven(hashesFirst, hashesSecond, i, oneSideLen));

  return result.reduce((sum, next) => sum + getPalindromesForLength(next), 0);
}

function getMaxPalindromeLengthEven(
  hashesFirst: hashesForOption[],
  hashesSecond: hashesForOption[],
  i: number,
  oneSideLen: number
) {
  let sideLenMin: number = 1;
  let sideLenMax: number = oneSideLen + 1;

  while (sideLenMin !== sideLenMax) {
    const middleLength = sideLenMin + Math.ceil((sideLenMax - sideLenMin) / 2);
    const isPalindrome = checkIfPalindrome(hashesFirst, hashesSecond, middleLength * 2, i - middleLength + 1);

    if (isPalindrome) {
      sideLenMin = middleLength === sideLenMin ? middleLength + 1 : middleLength;
    } else {
      sideLenMax = middleLength === sideLenMax ? middleLength - 1 : middleLength;
    }
  }

  const totalLength = sideLenMax * 2;
  return checkIfPalindrome(hashesFirst, hashesSecond, totalLength, i - sideLenMax + 1) ? totalLength : 0;
}
function getMaxPalindromeLengthOdd(
  hashesFirst: hashesForOption[],
  hashesSecond: hashesForOption[],
  i: number,
  oneSideLen: number
) {
  let sideLenMin: number = 0;
  let sideLenMax: number = oneSideLen;

  while (sideLenMin !== sideLenMax) {
    const middleLength = sideLenMin + Math.ceil((sideLenMax - sideLenMin) / 2);
    const isPalindrome = checkIfPalindrome(hashesFirst, hashesSecond, middleLength * 2 + 1, i - middleLength);

    if (isPalindrome) {
      sideLenMin = middleLength === sideLenMin ? middleLength + 1 : middleLength;
    } else {
      sideLenMax = middleLength === sideLenMax ? middleLength - 1 : middleLength;
    }
  }

  const totalLength = sideLenMax * 2 + 1;
  return checkIfPalindrome(hashesFirst, hashesSecond, totalLength, i - sideLenMax) ? totalLength : 0;
}

function checkIfPalindrome(
  hashes: hashesForOption[],
  reversedHashes: hashesForOption[],
  len: number,
  start: number
): boolean {
  const totalLength = hashes[0].hashes.length;
  return compareHashesPatched(hashes, reversedHashes, len, start, totalLength - start - len);
}

export function getNumberOfSubPalindromes(param: { str: number[] }): number {
  const hashes = calculateHashes(param, [
    { x: 257, p: 69996151 },
    { x: 199, p: 69996151 },
  ]);
  const reversedHashes = calculateHashes(
    param,
    [
      { x: 257, p: 69996151 },
      { x: 199, p: 69996151 },
    ],
    true
  );

  const strLength = param.str.length;

  let palindromesCounter = strLength;

  for (let i = 0; i < strLength; i++) {
    const elemsToTheLeft = i;
    const elemsToTheRight = strLength - 1 - i;
    const oneSideLength = Math.min(elemsToTheLeft, elemsToTheRight);

    palindromesCounter += getMaxPalindromeLength(hashes, reversedHashes, i, oneSideLength);
  }
  return palindromesCounter;
}
