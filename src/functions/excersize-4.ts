import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, stringToArray } from './warm-up/helpers';
import { biggestCommonSubsequence } from './trainings-3-division-B/task30';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);
  fileLogger.createFile();

  const result = biggestCommonSubsequence(stringToArray(rows[1]), stringToArray(rows[3]));
  fileLogger.write(result.join(' '));

  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
