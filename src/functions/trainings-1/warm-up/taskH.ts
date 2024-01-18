import { Logger } from './helpers';

export function couldSolve(firstGroup: number, secondGroup: number, tasks: number, logger: Logger) {
  const maximumPeopleInFirstGroup = firstGroup / 1;
  const minimumPeopleInSecondGroup = secondGroup / tasks;

  const couldHappen = maximumPeopleInFirstGroup > minimumPeopleInSecondGroup;

  if (couldHappen) {
    logger.write('Yes');
  } else {
    logger.write('No');
  }
}
