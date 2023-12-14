import { VertexWithPathTracking } from './helpers';
import { compare, getNewShortestPath, VertexIterator } from './taskC';

interface Edge {
  to: number;
  distance: number;
}

interface City {
  characteristics: {
    waitingTime: number;
    speed: number;
  };
  edges: Edge[];
}

export type AdjacencyList = City[];
function getLongestPath(dijkstraTable: VertexWithPathTracking[]): { longestTime: number; path: number[] } {
  let maxIndex: number | undefined;
  for (let i = 0; i < dijkstraTable.length; i++) {
    if (typeof dijkstraTable[i].shortestPath !== 'number') continue;

    if (maxIndex === undefined || dijkstraTable[i].shortestPath > dijkstraTable[maxIndex].shortestPath) {
      maxIndex = i;
    }
  }

  const longestPath = [dijkstraTable[maxIndex!].number];
  let currentCity = dijkstraTable[maxIndex!];
  while (currentCity.previous !== 0) {
    longestPath.push(currentCity.previous);
    currentCity = dijkstraTable[currentCity.previous];
  }
  return { path: longestPath, longestTime: dijkstraTable[maxIndex as number].shortestPath as number };
}

function connectVertexToAllOthers(sourceAdjacencyList: AdjacencyList, targetAdjacencyMatrix: number[][], vert: number) {
  const waitingTime = sourceAdjacencyList[vert].characteristics.waitingTime;
  const speed = sourceAdjacencyList[vert].characteristics.speed;

  const work: { hours: number; vert: number }[] = [{ hours: waitingTime, vert }];
  const visitedCities = new Array(targetAdjacencyMatrix.length);

  while (work.length) {
    const currentWork = work.shift()!;
    visitedCities[currentWork.vert] = true;

    sourceAdjacencyList[currentWork.vert].edges.forEach((edge) => {
      if (visitedCities[edge.to]) {
        return;
      }
      const additionalTime = edge.distance / speed;
      const newTime = currentWork.hours + additionalTime;
      targetAdjacencyMatrix[vert][edge.to] = newTime;

      work.push({ hours: newTime, vert: edge.to });
    });
  }
}

export function createSaniAdjacencyList(
  totalCities: number,
  characteristics: [number, number][],
  roads: [number, number, number][]
) {
  const list: AdjacencyList = new Array(totalCities + 1);
  list[0] = { characteristics: { waitingTime: 0, speed: 1 }, edges: [] };

  for (let i = 0; i < totalCities; i++) {
    list[i + 1] = {
      characteristics: { waitingTime: characteristics[i][0], speed: characteristics[i][1] },
      edges: [],
    };
  }
  for (let i = 0; i < roads.length; i++) {
    const [from, to, distance] = roads[i];
    list[from].edges.push({ to, distance });
    list[to].edges.push({ to: from, distance });
  }

  return list;
}

function calculateDijkstraTable(adjacencyMatrix: number[][], from: number): VertexWithPathTracking[] {
  const distances: VertexWithPathTracking[] = Array.from({ length: adjacencyMatrix.length }, (_, index) => ({
    shortestPath: 'infinity',
    visited: false,
    number: index,
    previous: 0,
  }));
  distances[from].shortestPath = 0;

  const vertexIterator = new VertexIterator([distances[from]]);

  let vertexCounter = 0;
  let currentVertex = vertexIterator.next();
  while (currentVertex !== null) {
    vertexCounter++;
    if (adjacencyMatrix[currentVertex.number]) {
      adjacencyMatrix[currentVertex.number].forEach((edge, to) => {
        if (distances[to].visited) {
          return;
        }

        const counterEdge = adjacencyMatrix[to][currentVertex!.number];

        const newShortestPath: number = getNewShortestPath(currentVertex!.shortestPath, counterEdge);
        const check = compare({ shortestPath: newShortestPath }, distances[to]);

        if (check === -1) {
          distances[to].shortestPath = newShortestPath;
          distances[to].previous = currentVertex!.number;
          vertexIterator.add({ ...distances[to] });
        }
      });
    }
    distances[currentVertex.number].visited = true;
    currentVertex = vertexIterator.next();
  }

  return distances;
}

// function calculateDijkstraTable(adjacencyMatrix: number[][], from: number): VertexWithPathTracking[] {
//   const distances: VertexWithPathTracking[] = Array.from({ length: adjacencyMatrix.length }, (_, index) => ({
//     shortestPath: 'infinity',
//     visited: false,
//     number: index,
//     previous: 0,
//   }));
//   distances[from].shortestPath = 0;
//
//   let currentVertex = distances[from];
//   const availableIndexes: (number | undefined)[] = Array.from({ length: adjacencyMatrix.length }, (_, i) => i);
//   availableIndexes[0] = undefined;
//
//   let counter = 0;
//   while (currentVertex !== null) {
//     counter++;
//     availableIndexes[currentVertex.number] = undefined;
//     const indexes = availableIndexes.filter((i) => i !== undefined);
//     distances[currentVertex.number].visited = true;
//     let minimumIndex: number | undefined;
//
//     indexes.forEach((to) => {
//       const counterEdge = adjacencyMatrix[to][currentVertex!.number];
//       const newShortestPath: number = getNewShortestPath(currentVertex!.shortestPath, counterEdge);
//       const check = compare({ shortestPath: newShortestPath }, distances[to]);
//
//       if (check === -1) {
//         distances[to].shortestPath = newShortestPath;
//         distances[to].previous = currentVertex!.number;
//       }
//
//       if (minimumIndex === undefined) {
//         minimumIndex = to;
//       } else if (compare({ shortestPath: distances[minimumIndex].shortestPath }, distances[to]) === 1) {
//         minimumIndex = to;
//       }
//     });
//     currentVertex = distances[minimumIndex as number] || null;
//   }
//
//   return distances;
// }

export function sani(adjacencyList: AdjacencyList): { longestTime: number; path: number[] } {
  // const matrixGenerationStart = new Date();
  const adjacencyMatrix: number[][] = adjacencyList.map((city) => {
    return new Array(adjacencyList.length);
  });

  for (let i = 1; i < adjacencyList.length; i++) {
    connectVertexToAllOthers(adjacencyList, adjacencyMatrix, i);
  }
  // const matrixGenerationEnd = new Date();
  // console.log('!!! matrix generation took: ', matrixGenerationEnd - matrixGenerationStart);

  // const dijkstraStart = new Date();
  const dijkstraTable = calculateDijkstraTable(adjacencyMatrix, 1);
  // const dijkstraEnd = new Date();
  // console.log('!!! dijkstra took: ', dijkstraEnd - dijkstraStart);

  return getLongestPath(dijkstraTable);
}
