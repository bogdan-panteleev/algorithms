import process from 'process';
import fs from 'fs';

export function stringToArray(str: string): number[] {
  const trimmed = (str || '').trim();
  if (trimmed === '') return [];
  return trimmed.split(/\s+/g).map(Number);
}

export abstract class Logger {
  abstract write(str: string): void;
  abstract writeCb(cb: () => string): void;
  abstract err(str: string): void;
}

export class StandardLogger extends Logger {
  write(str: string) {
    process.stdout.write(str + '\n');
  }
  err(str: string) {
    process.stderr.write(str + '\n');
  }
  writeCb(cb: () => string) {}
}

export class FileLogger extends Logger {
  constructor(
    private filePath: string,
    public bufferLength = 10000
  ) {
    super();
    try {
      fs.unlinkSync(this.filePath);
    } catch (e) {
      void e;
    }
  }

  createFile() {
    fs.appendFileSync(this.filePath, '');
  }

  private buffer: string[] = [];
  write(str: string) {
    this.buffer.push(str);
    if (this.buffer.length === this.bufferLength) {
      this.flushBuffer();
    }
  }
  writeCb(cb: () => string) {
    this.buffer.push(cb);
    if (this.buffer.length === this.bufferLength) {
      this.flushBufferCb();
    }
  }

  setBufferLength(val: number) {
    this.bufferLength = val;
  }

  flushBufferCb() {
    if (this.buffer.length) {
      //@ts-ignore
      const res = this.buffer.reduce((str, cb) => str + cb() + '\n', '');
      fs.appendFileSync(this.filePath, res);
      this.buffer.length = 0;
    }
  }

  flushBuffer() {
    if (this.buffer.length) {
      fs.appendFileSync(this.filePath, this.buffer.join('\n') + '\n');
      this.buffer.length = 0;
    }
  }

  writeImmediately(str: string) {
    fs.appendFileSync(this.filePath, str + '\n');
  }
  err(str: string) {
    fs.appendFileSync(this.filePath, str + '\n');
  }
}

export function isInRange(target: number, [start, end]: [number, number]) {
  return target >= start && target <= end;
}

export function fail(message: string, logger: Logger) {
  logger.err(message);
  process.exit(1);
}

export type arrayIndexes = {
  start: number;
  end: number;
};

export interface runOptions {
  x: number;
  p: number;
}
export interface hashesForOption extends runOptions {
  hashes: number[];
}

type xPows = Record<number, number[]>;

export function getCachedPowFn() {
  const xPows: xPows = {};
  return function (x: number, exponent: number, p: number) {
    if (xPows[x] === undefined) {
      xPows[x] = [1];
    }

    const alreadyCalculatedPows = xPows[x];
    if (alreadyCalculatedPows[exponent] === undefined) {
      const lastPow = alreadyCalculatedPows.length - 1;

      let currentPow = lastPow;
      let currentValue = alreadyCalculatedPows[lastPow];

      while (currentPow < exponent) {
        currentValue = (currentValue * x) % p;
        alreadyCalculatedPows.push(currentValue);
        currentPow++;
      }
    }

    return alreadyCalculatedPows[exponent];
  };
}
