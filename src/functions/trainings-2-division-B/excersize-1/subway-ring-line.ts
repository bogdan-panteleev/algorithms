export function subwayRingLine(totalStations: number, from: number, to: number): number {
  if (to < from) {
    const tmp = to;
    to = from;
    from = tmp;
  }

  const directWayStations = to - from - 1;
  const backwardWayStations = totalStations - to + from - 1;

  return Math.min(directWayStations, backwardWayStations);
}
