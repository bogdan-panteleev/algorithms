export function school(pupils: number[]): number {
  for (let i = 0; i < pupils.length; i++) {
    const countLeft = i + 1;
    const countRight = pupils.length - countLeft;
    const diff = countLeft - countRight;

    if (diff > 0) {
      return pupils[i];
    }
  }

  return -1;
}
