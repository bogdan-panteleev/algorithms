import { AdjacencyList } from '../excersize-3/helpers';

export function connectivityComponents(list: AdjacencyList): number[][] {
  const visited: number[] = new Array(list.length).fill(-1);

  const result: number[][] = [];
  let mark = 1;
  for (let now = 1; now < visited.length; now++) {
    if (visited[now] === -1) {
      const component = dfs(list, visited, now, mark);

      result.push(component);

      mark++;
    }
  }

  return result;
}

/**
 * Non-recursive solution needed to be able to traverse big graphs.
 * Recursive solution fails with Range Error when recursion is too deep.
 */
function dfs(list: AdjacencyList, visited: number[], now: number, mark: number): number[] {
  const component = [];
  const stack = [now];
  while (stack.length) {
    const current = stack[stack.length - 1];

    if (visited[current] === -1) {
      visited[current] = mark;
      component.push(current);
    }

    const edgeToNotVisitedNeighbour = list[current].find((edge) => visited[edge.to] === -1);
    if (edgeToNotVisitedNeighbour === undefined) {
      stack.pop();
    } else {
      stack.push(edgeToNotVisitedNeighbour.to);
    }
  }

  return component;
}
