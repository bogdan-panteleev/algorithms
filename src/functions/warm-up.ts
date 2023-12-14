import * as process from 'process';
import fs from 'fs';
import path from 'path';
import { FileLogger, StandardLogger, stringToArray } from './warm-up/helpers';
import { groupProject } from './warm-up/taskJ';

let numberOfRequests: number;
let counter = 0;
try {
  const fileLogger = new FileLogger(path.join(__dirname, './output.txt'));
  const data = fs.readFileSync(path.join(__dirname, './input.txt'));
  const rows = data.toString().trim().split('\n');
  rows.slice(1).forEach((row) => {
    groupProject(...(stringToArray(row) as [number, number, number]), fileLogger);
  });
  process.exit();
} catch (err: any) {
  if (err.code === 'ENOENT') {
    process.stdin.on('data', (data: Buffer) => {
      if (numberOfRequests === undefined) {
        numberOfRequests = Number(data.toString());
      } else {
        counter++;
        groupProject(...(stringToArray(data.toString()) as [number, number, number]), new StandardLogger());
        if (counter === numberOfRequests) {
          process.exit();
        }
      }
    });
  }
}
