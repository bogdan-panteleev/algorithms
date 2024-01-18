import { arrayIndexes } from '../trainings-1/warm-up/helpers';

export class Stack<T> {
  constructor(private stack: T[] = []) {}

  push(val: T): void {
    this.stack.push(val);
  }

  back(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  size(): number {
    return this.stack.length;
  }

  pop(): T | null {
    return this.stack.pop() ?? null;
  }

  clear(): void {
    this.stack.length = 0;
  }
}
