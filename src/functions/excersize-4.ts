import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './warm-up/helpers';
import { nails } from './trainings-3-division-B/task25';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/).slice(1);
  fileLogger.createFile();

  const result = nails(stringToArray(rows[0]));
  fileLogger.write(result.toString());

  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
