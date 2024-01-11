/**
 * Use like this:
 * const shortestPath = speleologistPath(makeCube(rows.slice(2)));
 */

export function speleologistPath({ cube, speleologist }: { cube: cube; speleologist: coords }): number {
  const work: { steps: number; coords: coords }[] = [{ steps: 0, coords: speleologist }];
  const n = cube.length;

  const visited: Record<string, boolean> = {};

  while (work.length) {
    const current = work.shift()!;

    if (current.coords.z === 0) return current.steps;

    const hash = coordsToHash(current.coords);

    if (visited[hash]) continue;

    visited[hash] = true;

    const possibleSteps = getPossibleSteps(current.coords)
      .filter((coords) => isWithinBoundaries(coords, n))
      .filter((coords) => cube[coords.z][coords.y][coords.x] !== '#')
      .filter((coords) => !visited[coordsToHash(coords)]);

    possibleSteps.forEach((coords) => {
      work.push({ coords, steps: current.steps + 1 });
    });
  }

  return -1;
}

function coordsToHash(coords: coords): string {
  return `${coords.x}_${coords.y}_${coords.z}`;
}

function getPossibleSteps(coords: coords): coords[] {
  const diffs: coords[] = [
    { x: 1, y: 0, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
  ];

  return diffs.map((diff) => {
    return { x: coords.x + diff.x, y: coords.y + diff.y, z: coords.z + diff.z };
  });
}

function isWithinBoundaries(coords: coords, n: number): boolean {
  if (coords.x < 0 || coords.x >= n) return false;
  if (coords.y < 0 || coords.y >= n) return false;
  if (coords.z < 0 || coords.z >= n) return false;

  return true;
}

export function makeCube(rows: string[]): { cube: cube; speleologist: coords } {
  const cube: cube = rows
    .join('\n')
    .split(/\n\n/)
    .map((square) => square.split('\n').map((row) => row.split('')));

  let speleologist: coords;
  for (let i = 0; i < cube.length; i++) {
    for (let j = 0; j < cube[i].length; j++) {
      for (let k = 0; k < cube[i][j].length; k++) {
        if (cube[i][j][k] === 'S') {
          speleologist = { x: k, y: j, z: i };
          break;
        }
      }
    }
  }

  // @ts-ignore
  return { cube, speleologist };
}

type cube = string[][][];
type coords = { x: number; y: number; z: number };
