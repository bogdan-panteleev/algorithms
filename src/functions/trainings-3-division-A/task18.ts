import { Heap } from '../trainings-3-division-B/task19';

export function railwayStation(trains: [number, number][], k: number): number[] {
  const events: Event[] = new Array(trains.length * 2);

  trains.forEach(([come, go], index) => {
    // @ts-ignore
    trains[index] = undefined;
    events[index * 2] = { id: index + 1, type: true, time: come };
    events[index * 2 + 1] = { id: index + 1, type: false, time: go };
  });
  // @ts-ignore
  trains = null;

  events.sort((a, b) => {
    const res = a.time - b.time;
    if (res !== 0) return res;

    const aVal = a.type ? 1 : 2;
    const bVal = b.type ? 1 : 2;

    return aVal - bVal;
  });

  const takenPlaces: Record<number, number> = {};
  // const heap = new Heap<number>(Array.from({ length: k }, (_, ind) => ind + 1));
  const heap = new Heap<number>([]);
  let heapSize = 0;

  const result: number[] = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    if (event.type === true) {
      let place = heap.extract();
      if (place === null && heapSize < k) {
        place = ++heapSize;
      }

      if (place === null) {
        return [0, event.id];
      } else {
        // result.push(place);
        result[event.id - 1] = place;
        takenPlaces[event.id] = place;
      }
    } else {
      const freedPlace = takenPlaces[event.id];
      delete takenPlaces[event.id];

      if (freedPlace === heapSize) {
        heapSize--;
      } else {
        heap.insert(freedPlace);
      }
    }
    // @ts-ignore
    events[i] = undefined;
  }

  return result;
}

interface Event {
  id: number;
  type: boolean;
  time: number;
}
