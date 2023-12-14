import path from 'path';
type pathItem = {
  vertex: number;
  accumulatedPath: number;
};
// Задача о коммивояжёре
export function findShortestCycle(matrix: number[][]): number {
  if (matrix.length == 1) {
    return 0;
  }

  let currentPath: pathItem[] = [{ vertex: 0, accumulatedPath: 0 }];
  let visitedVertexes: boolean[] = Array.from({ length: matrix.length }, () => false);
  visitedVertexes[0] = true;
  let bestPath = findShortestPathGreedy(matrix, visitedVertexes);

  function findBestPath() {
    const currentPathItem = currentPath[currentPath.length - 1];
    const matrixLine = matrix[currentPathItem.vertex];

    if (currentPath.length === matrix.length) {
      const newFoundPath = currentPathItem.accumulatedPath + matrixLine[0];
      if (bestPath === -1 || newFoundPath < bestPath) {
        bestPath = newFoundPath;
      }
      return;
    }

    matrixLine.forEach((distance, to) => {
      if (!visitedVertexes[to] && distance !== 0) {
        const accumulatedPath = currentPathItem.accumulatedPath + distance;
        currentPath.push({ vertex: to, accumulatedPath });
        visitedVertexes[to] = true;
        if (accumulatedPath < bestPath) {
          findBestPath();
        }
        currentPath.pop();
        visitedVertexes[to] = false;
      }
    });
  }

  findBestPath();
  return bestPath;
}

function findShortestPathGreedy(matrix: number[][], visitedVertexes: boolean[]) {
  const visitedCopy: boolean[] = visitedVertexes.slice();
  let pathLength = 0;
  let current = 0;
  let closest = getClosestNotVisited(current, matrix, visitedCopy);
  while (closest !== -1) {
    pathLength += matrix[current][closest];
    current = closest;
    visitedCopy[current] = true;
    closest = getClosestNotVisited(current, matrix, visitedCopy);
  }

  return visitedCopy.some((isVisited) => !isVisited) ? -1 : pathLength + matrix[current][0];
}

function getClosestNotVisited(current: number, matrix: number[][], visited: boolean[]) {
  let closest = -1;
  const currentLine = matrix[current];
  for (let i = 0; i < currentLine.length; i++) {
    if (visited[i]) continue;
    if (currentLine[i] === 0) continue;

    if (closest === -1) {
      closest = i;
    } else if (currentLine[i] < currentLine[closest]) {
      closest = i;
    }
  }

  return closest;
}
