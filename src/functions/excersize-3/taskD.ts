import Heap from 'heap';

export interface BusEdge {
  from: number;
  departure: number;
  to: number;
  arrival: number;
}

export type AdjacencyList = BusEdge[][];

export interface Village {
  number: number;
  visited: boolean;
  shortestTime: number | 'infinity';
}

export function getMinimumTime(contiguityList: AdjacencyList, from: number, to: number): number {
  const distances: Village[] = Array.from({ length: contiguityList.length }, (_, index) => ({
    shortestTime: 'infinity',
    visited: false,
    number: index,
  }));
  distances[from].shortestTime = 0;

  const villageIterator = new VertexIterator(distances);

  let currentVillage = villageIterator.next();
  while (currentVillage !== null) {
    if (contiguityList[currentVillage.number]) {
      contiguityList[currentVillage.number].forEach((edge) => {
        if (compare({ shortestTime: edge.departure }, currentVillage!) === -1) return;

        const newShortestTime: number = edge.arrival;
        const check = compare({ shortestTime: newShortestTime }, distances[edge.to]);

        if (check === -1) {
          distances[edge.to].shortestTime = newShortestTime;
          villageIterator.add({ ...distances[edge.to] });
        }
      });
    }

    currentVillage.visited = true;
    currentVillage = villageIterator.next();
  }

  const shortestPath = distances[to].shortestTime;
  return shortestPath === 'infinity' ? -1 : shortestPath;
}

class VertexIterator {
  private heap = new Heap<Village>(compare);
  constructor(private source: Village[]) {
    this.source.forEach((vertex) => this.heap.push({ ...vertex }));
  }

  next(): Village | null {
    const vert = this.heap.pop();
    if (vert === undefined) return null;
    if (vert.shortestTime === 'infinity') return null;
    return vert;
    //
    // let closestVillage: Village | null = null;
    // for (let i = 0; i < this.source.length; i++) {
    //   if (this.source[i].visited) continue;
    //   if (closestVillage === null) {
    //     closestVillage = this.source[i];
    //     continue;
    //   }
    //   if (compare(this.source[i], closestVillage!) === -1) {
    //     closestVillage = this.source[i];
    //   }
    // }
    //
    // if (closestVillage === null) return null;
    // return closestVillage.shortestTime === 'infinity' ? null : closestVillage;
  }

  add(vertex: Village) {
    this.heap.push(vertex);
  }
}

type pathContaining = { shortestTime: Village['shortestTime'] };
function compare(a: pathContaining, b: pathContaining): -1 | 0 | 1 {
  if (a.shortestTime === 'infinity' && b.shortestTime === 'infinity') return 0;
  if (a.shortestTime === 'infinity') return 1;
  if (b.shortestTime === 'infinity') return -1;
  if (a.shortestTime === b.shortestTime) return 0;
  return a.shortestTime > b.shortestTime ? 1 : -1;
}

export function createBusAdjacencyListFromList(
  rows: [number, number, number, number][],
  vertexesCount: number
): AdjacencyList {
  const list: AdjacencyList = new Array(vertexesCount + 1);
  list[0] = [];

  for (let row of rows) {
    const [from, departure, to, arrival] = row;
    if (!list[from]) {
      list[from] = [];
    }
    list[from].push({ to, departure, from, arrival });
  }

  return list;
}
