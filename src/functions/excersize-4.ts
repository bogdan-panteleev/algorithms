import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './warm-up/helpers';
import { subwayWithoutTransfers } from './trainings-3-division-B/task40';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);
  fileLogger.createFile();

  const totalLines = stringToArray(rows[1])[0];
  const lines = rows
    .slice(2, 2 + totalLines)
    .map(stringToArray)
    .map((line) => line.slice(1));
  const AB = stringToArray(rows[rows.length - 1]);

  const result = subwayWithoutTransfers(lines, AB[0], AB[1]);

  fileLogger.write(result.toString());

  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
