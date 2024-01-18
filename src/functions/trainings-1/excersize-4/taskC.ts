export function getMaximumSplit(matrix: number[][]): { weight: number; vertexPerGroup: number[] } {
  let bestFirstGroup: number[] = [];

  const firstGroup: number[] = [];
  const secondGroup: number[] = Array.from({ length: matrix.length }, (_, i) => i);

  const totalEdgesSum = calculateSplit(matrix, secondGroup, secondGroup) / 2;
  let maxWeight = 0;

  function findMaxSplit() {
    if (firstGroup.length >= secondGroup.length) {
      return;
    }

    const secondGroupLength = secondGroup.length;

    for (let i = 0; i < secondGroupLength; i++) {
      if (secondGroup[i] < firstGroup[firstGroup.length - 1]) {
        continue;
      }
      firstGroup.push(secondGroup.splice(i, 1)[0]);

      const split = calculateSplit(matrix, firstGroup, secondGroup);
      if (split > maxWeight) {
        maxWeight = split;
        bestFirstGroup = firstGroup.slice();
      }
      findMaxSplit();

      secondGroup.splice(i, 0, firstGroup.pop()!);
    }
  }

  findMaxSplit();

  return { weight: maxWeight, vertexPerGroup: getVertexPerGroup(matrix.length, bestFirstGroup) };
}

function getVertexPerGroup(totalLength: number, group: number[]): number[] {
  const set = new Set(group);
  return Array.from({ length: totalLength }, (_, i) => (set.has(i) ? 1 : 2));
}

function calculateSplit(matrix: number[][], group1: number[], group2: number[]) {
  let totalSplit = 0;
  for (let from of group1) {
    for (let to of group2) {
      totalSplit += matrix[from][to];
    }
  }

  return totalSplit;
}
