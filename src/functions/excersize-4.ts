import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './warm-up/helpers';
import { getMaximumSplit } from './excersize-4/taskC';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);
  const matrix: number[][] = rows.slice(1).map(stringToArray);

  fileLogger.createFile();
  const result = getMaximumSplit(matrix);
  fileLogger.write(result.weight.toString());
  fileLogger.write(result.vertexPerGroup.join(' '));
  fileLogger.flushBuffer();

  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
