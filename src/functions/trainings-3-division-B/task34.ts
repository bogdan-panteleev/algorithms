import { AdjacencyList } from '../excersize-3/helpers';

function invertGraph(list: AdjacencyList): AdjacencyList {
  const invertedList: AdjacencyList = Array.from({ length: list.length }, () => []);

  list.forEach((tos, vertex) => {
    tos.forEach((to) => {
      invertedList[to.to].push({ to: vertex, weight: 1 });
    });
  });

  return invertedList;
}

export function topologicalSort(list: AdjacencyList): number[] {
  const colors = new Array(list.length).fill(0);

  let sorted: number[] = new Array(list.length);
  let k = 1;

  for (let i = 1; i < list.length; i++) {
    if (colors[i] === 2) {
      continue;
    }
    try {
      const portion = dfs(list, colors, i);
      for (let i = 0; i < portion.length; i++) {
        sorted[k] = portion[i];
        k++;
      }
    } catch (e) {
      if ((e as Error)?.message === 'Cycle detected') {
        return [];
      }
      throw e;
    }
  }
  return sorted.reverse();
}

function dfs(list: AdjacencyList, colors: number[], now: number): number[] {
  const res = [];
  const stack = [now];
  while (stack.length) {
    const current = stack[stack.length - 1];

    if (colors[current] === 0) {
      colors[current] = 1;
    }

    const edgeToNotVisitedNeighbour = list[current].find((edge) => colors[edge.to] !== 2);
    if (edgeToNotVisitedNeighbour === undefined) {
      stack.pop();
      colors[current] = 2;
      res.push(current);
    } else {
      if (colors[edgeToNotVisitedNeighbour.to] === 1) {
        throw new Error('Cycle detected');
      }
      stack.push(edgeToNotVisitedNeighbour.to);
    }
  }

  return res;
}
