import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './trainings-1/warm-up/helpers';
import { sawing } from './trainings-3-division-A/task30';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/).map(stringToArray);
  const [length] = rows[0];

  const result = sawing(length, rows[1]);

  fileLogger.write(result.toString());
  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
