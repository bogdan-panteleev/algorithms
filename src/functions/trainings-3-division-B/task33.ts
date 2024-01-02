import { AdjacencyList } from '../excersize-3/helpers';

export function canDivideStudentsIntoTwoGroups(list: AdjacencyList): boolean {
  const colors: number[] = new Array(list.length).fill(-1);

  for (let i = 1; i < colors.length; i++) {
    if (colors[i] === -1) {
      try {
        dfs(list, colors, i);
      } catch (e) {
        return false;
      }
    }
  }
  return true;
}

function dfs(list: AdjacencyList, colors: number[], now: number): void {
  const stack = [now];
  while (stack.length) {
    const current = stack[stack.length - 1];
    const suggestedColor = checkNeighbours(list, colors, current);
    if (colors[current] === -1) {
      colors[current] = suggestedColor === -1 ? 1 : suggestedColor;
    }

    const edgeToNotVisitedNeighbour = list[current].find((edge) => colors[edge.to] === -1);
    if (edgeToNotVisitedNeighbour === undefined) {
      stack.pop();
    } else {
      stack.push(edgeToNotVisitedNeighbour.to);
    }
  }
}

/**
 * Returns the color the vertex should use to be ok. Returns -1 if all neighbours are not colored
 * Throws error if neighbours have mixed colors.
 */
function checkNeighbours(list: AdjacencyList, colors: number[], now: number): number {
  if (list[now].length === 0) {
    return -1;
  }

  let color: number | undefined;
  for (let i = 0; i < list[now].length; i++) {
    const vert = list[now][i].to;
    if (colors[vert] === -1) {
      continue;
    }
    if (color === undefined) {
      color = colors[vert];
    } else if (color !== colors[vert]) {
      throw new Error('Mixed Colors Detected');
    }
  }

  return color === undefined ? -1 : 3 - color;
}
