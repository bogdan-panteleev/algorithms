export function getCX(n: number): number {
  let currentStep = 0;

  let currentSquareBase = 2;

  for (let cubeBase = 1; cubeBase <= n; cubeBase++) {
    const cube = cubeBase ** 3;

    for (
      let squareBase = currentSquareBase, square = squareBase ** 2;
      square <= cube;
      squareBase++, square = squareBase ** 2
    ) {
      currentSquareBase++;

      if (square !== cube) {
        currentStep++;
        if (currentStep === n) {
          return square;
        }
      }
    }

    currentStep++;

    if (currentStep === n) {
      return cube;
    }
  }
  return currentStep;
}
