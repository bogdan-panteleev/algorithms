import { Heap } from './task19';

export function heapSort(arr: number[]) {
  const heap = new SortingHeap<number>(arr);
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = heap.extract()!;
  }
  return arr;
}

class SortingHeap<T> extends Heap<T> {
  private end: number;
  constructor(data: T[] = []) {
    super(data);
    this.end = data.length - 1;
    this.heapify(data);
  }
  override extract(): T | null {
    if (this.data.length === 0) {
      return null;
    }
    if (this.data.length === 1) {
      this.end--;
      return this.data[0];
    }

    const val: T = this.data[0];
    this.data[0] = this.data[this.end];
    this.end--;
    this.siftBottom(0);
    return val;
  }

  protected override siftBottom(index: number) {
    const val = this.data[index];

    let currentIndex = index;
    let children = this.getChildren(currentIndex);

    while (children.length > 0 && children.some((ind) => this.data[ind] > val)) {
      const maxChildIndex = children.reduce((max, current) => (this.data[current] > this.data[max] ? current : max));
      this.data[currentIndex] = this.data[maxChildIndex];
      this.data[maxChildIndex] = val;

      currentIndex = maxChildIndex;
      children = this.getChildren(currentIndex);
    }
  }

  protected getChildren(index: number): number[] {
    return super.getChildren(index).filter((ind) => ind <= this.end);
  }
}
