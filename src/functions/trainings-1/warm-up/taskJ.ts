import { Logger } from './helpers';

export function groupProject(studentsTotal: number, groupMin: number, groupMax: number, logger: Logger) {
  const delta = groupMax - groupMin;
  const numberOfMinimalGroups = Math.floor(studentsTotal / groupMin);
  const leftStudents = studentsTotal % groupMin;
  const isPossibleToBreakIntoGroups = leftStudents <= delta * numberOfMinimalGroups;

  const logMessage = isPossibleToBreakIntoGroups ? 'YES' : 'NO';

  logger.write(logMessage);
}
