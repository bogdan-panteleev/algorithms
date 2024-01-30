export function goodString(totalLetters: number, lettersCount: number[]): number {
  let sum = 0;
  for (let letter = 2; letter <= totalLetters; letter++) {
    sum += Math.min(lettersCount[letter - 1], lettersCount[letter - 2]);
  }
  return sum;
}
