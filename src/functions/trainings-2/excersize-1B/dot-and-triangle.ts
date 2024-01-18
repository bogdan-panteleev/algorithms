export function dotAndTriangle(d: number, x: number, y: number): number {
  const linearFn = getLinearFn(-1, d);

  const yAtHypotenuse = linearFn(x);

  if (y <= yAtHypotenuse && y >= 0 && x >= 0 && x <= d) {
    return 0;
  }

  const vertexes: Path[] = [
    { vert: 1, distance: findDistance(0, 0, x, y) },
    { vert: 2, distance: findDistance(d, 0, x, y) },
    { vert: 3, distance: findDistance(0, d, x, y) },
  ];

  const vert = vertexes.reduce((closest, curr) => (curr.distance < closest.distance ? curr : closest));

  return vert.vert;
}

interface Path {
  vert: number;
  distance: number;
}

function getLinearFn(k: number, z: number): (x: number) => number {
  return (x: number) => k * x + z;
}

function findDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
