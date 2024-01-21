export function confuse(b: number[]): number {
  let max = b[0];
  let min = b[0];
  for (let i = 0; i < b.length; i++) {
    if (b[i] < min) min = b[i];
    if (b[i] > max) max = b[i];
  }

  return max - min;
}
