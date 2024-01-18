import { AdjacencyList } from '../trainings-1/excersize-3/helpers';

export function findCycle(list: AdjacencyList): number[] {
  const colors = new Array(list.length).fill(0);

  for (let i = 1; i < list.length; i++) {
    if (colors[i] === 2) {
      continue;
    }
    const cycle = dfsFindCycle(list, colors, i);
    if (cycle.length) return cycle;
  }
  return [];
}

function dfsFindCycle(list: AdjacencyList, colors: number[], now: number): number[] {
  const stack = [now];
  while (stack.length) {
    const current = stack[stack.length - 1];
    const previous: number | undefined = stack[stack.length - 2];

    if (colors[current] === 0) {
      colors[current] = 1;
    }

    const edgeToNotVisitedNeighbour = list[current].find((edge) => edge.to !== previous && colors[edge.to] !== 2);
    if (edgeToNotVisitedNeighbour === undefined) {
      stack.pop();
      colors[current] = 2;
    } else {
      if (colors[edgeToNotVisitedNeighbour.to] === 1) {
        let cycle = [edgeToNotVisitedNeighbour.to];
        let ind = stack.length - 1;
        while (stack[ind] !== edgeToNotVisitedNeighbour.to) {
          cycle.push(stack[ind]);
          ind--;
        }

        return cycle.reverse();
      }
      stack.push(edgeToNotVisitedNeighbour.to);
    }
  }

  return [];
}
