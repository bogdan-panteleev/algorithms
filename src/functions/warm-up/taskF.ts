import { Logger } from './helpers';

export function liftWorks(liftCapacity: number, peopleOnFloors: number[], logger: Logger) {
  let numberOfSteps = 0n;
  let totalLeftPeople = peopleOnFloors.reduce((sum, num) => sum + num, 0);
  let currentLiftPosition = -1;
  let peopleInLiftCurrently = 0;

  peopleOnFloors.forEach((people, floor) => {
    if (people >= liftCapacity) {
      const leftPeople = people % liftCapacity;
      const peopleBoarded = people - leftPeople;
      totalLeftPeople -= peopleBoarded;
      peopleOnFloors[floor] = leftPeople;
      const trips = peopleBoarded / liftCapacity;
      numberOfSteps += BigInt(trips) * (BigInt(floor) - BigInt(currentLiftPosition)) * 2n;
    }
  });

  while (totalLeftPeople) {
    const topLeftManIndex = findIndexRight(peopleOnFloors, (people) => people !== 0);
    peopleOnFloors.length = topLeftManIndex + 1;

    numberOfSteps += BigInt(topLeftManIndex) - BigInt(currentLiftPosition);
    currentLiftPosition = topLeftManIndex;

    while (peopleInLiftCurrently !== liftCapacity && peopleInLiftCurrently !== totalLeftPeople) {
      const freePlacesInLift = liftCapacity - peopleInLiftCurrently;
      const numberOfPeopleToBoard = Math.min(peopleOnFloors[currentLiftPosition], freePlacesInLift);
      peopleInLiftCurrently += numberOfPeopleToBoard;
      peopleOnFloors[currentLiftPosition] -= numberOfPeopleToBoard;

      if (peopleInLiftCurrently !== liftCapacity) {
        const lowerFloor = findIndexRight(peopleOnFloors, (people) => people !== 0);
        numberOfSteps += BigInt(currentLiftPosition) - BigInt(lowerFloor);
        currentLiftPosition = lowerFloor;
      }
    }

    numberOfSteps += BigInt(currentLiftPosition) - -1n;
    currentLiftPosition = -1;
    totalLeftPeople -= peopleInLiftCurrently;
    peopleInLiftCurrently = 0;
  }

  logger.write(numberOfSteps.toString());
}

function findIndexRight(arr: Array<any>, cb: (param: any) => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (cb(arr[i])) return i;
  }
  return -1;
}
