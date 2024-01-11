import { AdjacencyList } from '../excersize-3/helpers';
type workItem = {
  transfers: number;
  station: number;
};
export function subwayWithoutTransfers(lines: number[][], from: number, to: number): number {
  const transferGraph = buildTransfersGraph(lines);

  const froms = getLinesForStation(lines, from);
  const tos = getLinesForStation(lines, to);

  const work: workItem[] = froms.map<workItem>((st) => ({ transfers: 0, station: st }));
  const visited: boolean[] = new Array(transferGraph.length).fill(false);

  const records: Record<number, number> = {};

  while (work.length) {
    const current = work.shift()!;
    if (visited[current.station]) continue;
    visited[current.station] = true;

    if (tos.includes(current.station)) {
      records[current.station] = current.transfers;
    }

    if (!transferGraph[current.station]) continue;

    transferGraph[current.station].forEach((to) => {
      if (visited[to.to]) return;

      work.push({ station: to.to, transfers: current.transfers + 1 });
    });
  }

  const values = Object.values(records);

  if (values.length === 0) {
    return -1;
  }

  return Math.min(...values);
}

function getLinesForStation(lines: number[][], station: number): number[] {
  const linesForStation: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(station)) {
      linesForStation.push(i);
    }
  }

  return linesForStation;
}

function buildTransfersGraph(lines: number[][]): AdjacencyList {
  const result: AdjacencyList = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      getIntersection(lines[i], lines[j]).forEach((station) => {
        if (!result[i]) {
          result[i] = [];
        }
        result[i].push({ to: j, weight: 1 });

        if (!result[j]) {
          result[j] = [];
        }
        result[j].push({ to: i, weight: 1 });
      });
    }
  }

  return result;
}

function getIntersection(line1: number[], line2: number[]): number[] {
  const smallestLine = line1.length > line2.length ? line2 : line1;
  const otherLine = line1 === smallestLine ? line2 : line1;

  return smallestLine.filter((station) => otherLine.includes(station));
}
