import { AdjacencyList } from '../excersize-3/helpers';

export function shortestPathBfsDetailed(graph: AdjacencyList, from: number, to: number): number[] {
  if (from === to) {
    return [from];
  }

  const visited: boolean[] = new Array(graph.length).fill(false);
  const prevs: number[] = new Array(graph.length).fill(-1);
  const work: { vert: number; prev: number }[] = [{ vert: from, prev: -1 }];

  while (work.length) {
    const current = work.shift()!;

    if (visited[current.vert]) continue;

    visited[current.vert] = true;
    prevs[current.vert] = current.prev;

    if (current.vert === to) {
      break;
    }

    graph[current.vert].forEach((edge) => {
      work.push({ vert: edge.to, prev: current.vert });
    });
  }

  let path = [];
  for (let current = to, prev = prevs[current]; current !== -1; ) {
    path.push(current);
    current = prev;
    prev = prevs[current];
  }

  path.reverse();

  return path.length === 1 ? [] : path;
}
