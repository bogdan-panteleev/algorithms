import { FileLogger } from '../trainings-1/warm-up/helpers';

export function histogram(src: string, logger: FileLogger) {
  const symbols: Record<string, number> = {};

  const skippedSymbols = ['\n', ' '];
  for (let i = 0; i < src.length; i++) {
    if (skippedSymbols.includes(src[i])) continue;

    if (symbols[src[i]] === undefined) {
      symbols[src[i]] = 0;
    }

    symbols[src[i]]++;
  }

  const sortedSymbols = Object.keys(symbols).sort();
  const mostUsedSymbol = Math.max(...Object.values(symbols));

  for (let i = mostUsedSymbol; i >= 1; i--) {
    for (let sym of sortedSymbols) {
      if (symbols[sym] < i) {
        logger.write(' ');
      } else {
        logger.write('#');
      }
    }
    logger.write('\n');
  }
  logger.write(sortedSymbols.join(''));
}
