import { Logger } from './helpers';

export function sumFractions(a: number, b: number, c: number, d: number, logger: Logger) {
  let currentTop = a * d + c * b;
  let currentBottom = b * d;
  let commonMultiplier: number;
  do {
    commonMultiplier = getCommonMultiplier(currentTop, currentBottom);
    currentTop = currentTop / commonMultiplier;
    currentBottom = currentBottom / commonMultiplier;
  } while (commonMultiplier !== 1);

  logger.write(`${currentTop} ${currentBottom}`);
}

function getCommonMultiplier(a: number, b: number) {
  const min = Math.min(a, b);
  for (let i = 2; i <= min; i++) {
    if (a % i === 0 && b % i === 0) return i;
  }
  return 1;
}
