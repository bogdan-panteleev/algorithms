import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './trainings-1/warm-up/helpers';
import { horse } from './trainings-3-division-A/task26';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  let data = fs.readFileSync(path.join(__dirname, './input.txt'));
  let rows = data.toString().trim().split(/\n/);
  const [rowsNumber, columnsNumber] = stringToArray(rows[0]);

  const result = horse(rowsNumber, columnsNumber);

  fileLogger.write(result.toString());
  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
