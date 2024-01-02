import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './warm-up/helpers';
import { createAdjacencyListFromMatrix } from './excersize-3/helpers';
import { findCycle } from './trainings-3-division-B/task35';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);
  fileLogger.createFile();

  const vertexes = rows.map((str) => [0].concat(stringToArray(str)));
  const result = findCycle(createAdjacencyListFromMatrix(vertexes));
  fileLogger.write(result.length === 0 ? 'NO' : 'YES');
  if (result.length) {
    fileLogger.write(result.length.toString());
    fileLogger.write(result.join(' '));
  }

  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
