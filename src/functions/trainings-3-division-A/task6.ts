export function OSLite(total: number, oses: [number, number][]): number {
  let activeOses: [number, number][] = [];

  for (let os of oses) {
    activeOses = activeOses.filter((activeOs) => !areIntersected(activeOs, os));
    activeOses.push(os);
  }
  console.log(activeOses);
  return activeOses.length;
}

function areIntersected(a: [number, number], b: [number, number]): boolean {
  return Math.min(a[1], b[1]) - Math.max(a[0], b[0]) >= 0;
}
