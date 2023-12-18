import { Queue } from './task16';

export class DeQueue<T> {
  constructor(private queue: T[] = []) {}
  pushFront(val: T): void {
    this.queue.unshift(val);
  }

  pushBack(val: T): void {
    this.queue.push(val);
  }

  popFront(): T | null {
    return this.queue.shift() ?? null;
  }

  popBack(): T | null {
    return this.queue.pop() ?? null;
  }

  front(): T | null {
    return this.queue[0] ?? null;
  }

  back(): T | null {
    return this.queue[this.queue.length - 1] ?? null;
  }

  size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue.length = 0;
  }
}
