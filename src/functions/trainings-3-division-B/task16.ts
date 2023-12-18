export class Queue<T> {
  constructor(protected queue: T[] = []) {}
  push(val: T): void {
    this.queue.push(val);
  }

  pop(): T | null {
    return this.queue.shift() ?? null;
  }

  front(): T | null {
    return this.queue[0] ?? null;
  }

  size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue.length = 0;
  }
}
