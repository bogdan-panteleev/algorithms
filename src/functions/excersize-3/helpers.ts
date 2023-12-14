export interface Edge {
  to: number;
  weight: number;
}

export type AdjacencyList = Edge[][];
export interface Vertex {
  number: number;
  visited: boolean;
  shortestPath: number | 'infinity';
}

export interface VertexWithPathTracking extends Vertex {
  previous: number;
}

export function createAdjacencyListFromMatrix(matrix: number[][]): AdjacencyList {
  const list: AdjacencyList = [];

  for (let from = 0; from < matrix.length; from++) {
    for (let to = 0; to < matrix.length; to++) {
      if (from === to || from === 0 || to === 0) continue;
      if (!list[from]) {
        list[from] = [];
      }
      const weight = matrix[from][to];
      if (weight >= 0) {
        list[from].push({ to, weight });
      }
    }
  }

  return list;
}

export function createAdjacencyListFromList(rows: [number, number, number][], vertexesCount: number): AdjacencyList {
  const list: AdjacencyList = new Array(vertexesCount + 1);
  list[0] = [];

  for (let row of rows) {
    const [from, to, weight] = row;
    if (!list[from]) {
      list[from] = [];
    }
    if (!list[to]) {
      list[to] = [];
    }
    list[from].push({ to, weight });
    list[to].push({ to: from, weight });
  }

  return list;
}
