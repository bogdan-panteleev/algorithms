export function equation(a: number, b: number, c: number, d: number): number[] {
  if (a === 0) return [Infinity];

  const root = -b / a;

  if (c * root + d === 0) return [];

  return Math.floor(root) === root ? [root] : [];
}
