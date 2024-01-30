export function petyaAndVasya(totalPupils: number, variations: number, petya: number): number[] {
  const nextAppropriatePlace = petya + variations;
  const previousAppropriatePlace = petya - variations;

  let before: [number, number] | undefined;
  if (previousAppropriatePlace > 0) {
    before = placeToRowAndNumber(previousAppropriatePlace);
  }

  let after: [number, number] | undefined;
  if (nextAppropriatePlace <= totalPupils) {
    after = placeToRowAndNumber(nextAppropriatePlace);
  }

  if (before === undefined && after === undefined) return [-1];

  if (before === undefined) {
    return after!;
  }

  if (after === undefined) {
    return before;
  }

  const petyaRowAndPlace: [number, number] = placeToRowAndNumber(petya);
  const diffBefore = Math.abs(petyaRowAndPlace[0] - before[0]);
  const diffAfter = Math.abs(petyaRowAndPlace[0] - after[0]);

  return diffBefore < diffAfter ? before : after;
}

export function rowAndPlaceToNumber(row: number, place: number): number {
  return (row - 1) * 2 + place;
}

function placeToRowAndNumber(place: number): [number, number] {
  const row = Math.ceil(place / 2);
  const seat = place % 2 || 2;
  return [row, seat];
}
