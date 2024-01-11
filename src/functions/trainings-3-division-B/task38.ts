import { AdjacencyList } from '../excersize-3/helpers';

export function fleas(
  width: number,
  height: number,
  feaderY: number,
  feaderX: number,
  fleasNumber: number,
  fleasCoords: [number, number][]
): number {
  const coordsToPosition = getCoordsToPositionFn(width);
  const numberToCoords = getPositionToCoordsFn(width);

  const totalCells = width * height;
  const fleasPositions: Record<number, number> = {};
  fleasCoords.forEach(([y, x]) => {
    const fleaPosition = coordsToPosition(x, y);

    if (fleasPositions[fleaPosition] === undefined) {
      fleasPositions[fleaPosition] = 1;
    } else {
      fleasPositions[fleaPosition]++;
    }
  });

  // to free memory
  // @ts-ignore
  fleasCoords = undefined;

  // const stateGraph: AdjacencyList = [];

  const steps: number[] = new Array(totalCells + 1).fill(-1);
  const work: { position: number; steps: number }[] = [{ position: coordsToPosition(feaderX, feaderY), steps: 0 }];
  while (work.length) {
    const current = work.shift()!;
    if (steps[current.position] !== -1) continue;
    // if (stateGraph[current.position] !== undefined) continue;

    steps[current.position] = current.steps;
    // stateGraph[current.position] = [];

    const possibleSteps1 = getPossibleSteps(numberToCoords(current.position));
    const possibleSteps2 = possibleSteps1.filter((coords) => isWithinBoundaries(coords, width, height));
    const possibleSteps = possibleSteps2.map(({ x, y }) => coordsToPosition(x, y));

    for (let position of possibleSteps) {
      if (steps[position] !== -1) continue;

      // stateGraph[current.position].push({ to: position, weight: 1 });
      work.push({ position, steps: current.steps + 1 });
    }
  }

  const stepsPerFlea = Object.keys(fleasPositions).map((key) => steps[Number(key)] * fleasPositions[Number(key)]);

  return stepsPerFlea.reduce((sum, next) => {
    if (sum === -1 || next === -1) return -1;
    return sum + next;
  });
}
type coords = { x: number; y: number };

function isWithinBoundaries(coords: coords, n: number, m: number): boolean {
  if (coords.y < 1 || coords.x < 1) return false;
  if (coords.x > n || coords.y > m) return false;

  return true;
}
function getPossibleSteps(coords: coords): coords[] {
  return [
    { x: coords.x - 1, y: coords.y - 2 },
    { x: coords.x + 1, y: coords.y - 2 },
    { x: coords.x - 1, y: coords.y + 2 },
    { x: coords.x + 1, y: coords.y + 2 },
    { x: coords.x - 2, y: coords.y - 1 },
    { x: coords.x - 2, y: coords.y + 1 },
    { x: coords.x + 2, y: coords.y - 1 },
    { x: coords.x + 2, y: coords.y + 1 },
  ];
}

function getCoordsToPositionFn(n: number) {
  return (x: number, y: number) => {
    return (y - 1) * n + x;
  };
}

function getPositionToCoordsFn(n: number): (num: number) => coords {
  return (num: number) => {
    const byModulo = num % n;
    return {
      y: Math.ceil(num / n),
      x: byModulo === 0 ? n : byModulo,
    };
  };
}
