import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './trainings-1/warm-up/helpers';
import { Diego } from './trainings-3-division-A/task3';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);

  const result = Diego(stringToArray(rows[1]), stringToArray(rows[3]));

  fileLogger.write(result.join('\n'));
  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
