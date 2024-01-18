import { FileLogger } from '../warm-up/helpers';

export function getNumberOfBricks(length: number, bricksLength: number[], logger: FileLogger): number | undefined {
  const totalLength = bricksLength.reduce((sum, next) => sum + next * 2, 0);

  let bestOption: number[] | undefined;
  let currentUsedBricks: number[] = [];
  const usedBricksMap = Array.from({ length: bricksLength.length }, () => 0);
  let currentLength = 0;

  if (totalLength < length) {
    logger.write(String(-1));
    return -1;
  }

  function findPossibleOptions(lastIndex: number = 0) {
    if (currentLength === length) {
      if (bestOption === undefined || currentUsedBricks.length < bestOption.length) {
        bestOption = currentUsedBricks.slice();
      }
      return;
    }
    if (currentLength > length) {
      return;
    }

    for (let i = lastIndex; i < bricksLength.length; i++) {
      const brickLength = bricksLength[i];
      if (usedBricksMap[i] < 2) {
        currentUsedBricks.push(brickLength);
        usedBricksMap[i]++;
        currentLength += brickLength;

        findPossibleOptions(i);

        currentUsedBricks.pop();
        usedBricksMap[i]--;
        currentLength -= brickLength;
      }
    }
    // bricksLength.forEach((brickLength, index) => {
    //   if (usedBricksMap[index] < 2) {
    //     currentUsedBricks.push(brickLength);
    //     usedBricksMap[index]++;
    //     currentLength += brickLength;
    //
    //     findPossibleOptions();
    //
    //     currentUsedBricks.pop();
    //     usedBricksMap[index]--;
    //     currentLength -= brickLength;
    //   }
    // });
  }

  findPossibleOptions();
  if (bestOption === undefined) {
    logger.write(String(0));
    return 0;
  }

  logger.write(bestOption.length.toString());
  logger.write(bestOption.join(' '));
  // return bestOption;
}
