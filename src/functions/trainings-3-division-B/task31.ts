import { AdjacencyList } from '../trainings-1/excersize-3/helpers';

export function graphConnectivity(list: AdjacencyList): number[] {
  if (!list[1]) return [1];

  const visited: boolean[] = new Array(list.length).fill(false);

  dfs(list, visited, 1);

  const connectivity = visited.map((bool, ind) => (bool ? ind : -1)).filter((ind) => ind !== -1);
  return connectivity.length > 0 ? connectivity : [1];
}

function dfs(list: AdjacencyList, visited: boolean[], now: number) {
  for (let { to } of list[now]) {
    if (!visited[to]) {
      visited[to] = true;
      dfs(list, visited, to);
    }
  }
}
