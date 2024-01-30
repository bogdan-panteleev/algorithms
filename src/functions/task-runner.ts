import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger } from './trainings-1/warm-up/helpers';
import { logicalExpression } from './trainings-3-division-A/task13';

try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split(/\n/);

  const result = logicalExpression(rows[0]);

  fileLogger.write(result ? '1' : '0');
  fileLogger.flushBuffer();
  process.exit();
} catch (err: unknown) {
  process.exit(1);
}
