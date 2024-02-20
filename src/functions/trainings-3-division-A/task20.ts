import Heap from 'heap';

export function cars(totalCars: number, carsOnFloor: number, sequence: number[]): number {
  const toNext = new Array(sequence.length);
  const map: Record<number, number> = {};

  for (let i = 0; i < sequence.length; i++) {
    toNext[i] = Infinity;
    if (map[sequence[i]] === undefined) {
      map[sequence[i]] = i;
    } else {
      const prevOccurrence = map[sequence[i]];
      toNext[prevOccurrence] = i - prevOccurrence;
      map[sequence[i]] = i;
    }
  }

  const heap = new Heap<Item>((a, b) => b.toNext - a.toNext);
  const nowInHeap: Record<number, Item> = {};
  let sum = 0;

  for (let i = 0; i < sequence.length; i++) {
    if (nowInHeap[sequence[i]]) {
      nowInHeap[sequence[i]].toNext = toNext[i];
      heap.updateItem(nowInHeap[sequence[i]]);
      continue;
    }

    if (heap.size() === carsOnFloor) {
      const toRemove = heap.pop()!;
      delete nowInHeap[toRemove.value];
    }

    const item = { toNext: toNext[i], value: sequence[i] };
    heap.push(item);
    nowInHeap[sequence[i]] = item;
    sum++;
  }

  return sum;
}

interface Item {
  toNext: number;
  value: number;
}
