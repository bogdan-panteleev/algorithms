import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './trainings-1/warm-up/helpers';
import { dotAndTriangle } from './trainings-2/excersize-1B/dot-and-triangle';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);
  fileLogger.createFile();

  const [d] = stringToArray(rows[0]);
  const [x, y] = stringToArray(rows[1]);

  const result = dotAndTriangle(d, x, y);
  fileLogger.write(result.toString());

  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
