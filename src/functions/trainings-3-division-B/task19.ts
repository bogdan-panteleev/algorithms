// Heap returns max value
export class Heap<T> {
  constructor(protected data: T[] = []) {
    this.heapify(data);
  }

  protected heapify(arr: T[]): void {
    let firstChildlessElementIndex: number;

    for (let i = arr.length - 1; i >= 0; i--) {
      const leftChildIndex = i * 2 + 1;
      const rightChildIndex = i * 2 + 2;
      if (arr[leftChildIndex] === undefined && arr[rightChildIndex] === undefined) {
        firstChildlessElementIndex = i;
      } else {
        break;
      }
    }

    for (let i = firstChildlessElementIndex!; i >= 0; i--) {
      this.siftBottom(i);
    }
  }

  public insert(val: T): void {
    this.data.push(val);
    this.siftUp(this.data.length - 1);
  }

  protected siftUp(index: number) {
    const val = this.data[index];

    let currentIndex = index;
    let parentIndex = Math.floor((index - 1) / 2);
    // while (parentIndex >= 0 && val > this.data[parentIndex]) {
    while (parentIndex >= 0 && val < this.data[parentIndex]) {
      this.data[currentIndex] = this.data[parentIndex];
      this.data[parentIndex] = val;

      currentIndex = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
  }
  protected siftBottom(index: number) {
    const val = this.data[index];

    let currentIndex = index;
    let children = this.getChildren(currentIndex);

    // while (children.length > 0 && children.some((ind) => this.data[ind] > val)) {
    while (children.length > 0 && children.some((ind) => this.data[ind] < val)) {
      const maxChildIndex = children.reduce((max, current) => (this.data[current] < this.data[max] ? current : max));
      this.data[currentIndex] = this.data[maxChildIndex];
      this.data[maxChildIndex] = val;

      currentIndex = maxChildIndex;
      children = this.getChildren(currentIndex);
    }
  }

  protected getChildren(index: number) {
    return [index * 2 + 1, index * 2 + 2].filter((ind) => this.data[ind] !== undefined);
  }

  extract(): T | null {
    if (this.data.length === 0) {
      return null;
    }
    if (this.data.length === 1) {
      return this.data.shift() as T;
    }

    const val = this.data[0];
    this.data[0] = this.data.pop() as T;
    this.siftBottom(0);
    return val;
  }

  getHead(): T | null {
    return this.data.length === 0 ? null : this.data[0];
  }
}
