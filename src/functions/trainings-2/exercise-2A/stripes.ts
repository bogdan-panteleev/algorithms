export function stripes(leftStripes: number[]): number {
  let max = 0;
  let sum = 0;
  for (let i = 0; i < leftStripes.length; i++) {
    sum += leftStripes[i];
    if (leftStripes[i] > max) {
      max = leftStripes[i];
    }
  }

  const diff = sum - max;
  return max > diff ? max - diff : sum;
}
