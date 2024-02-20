export function goblins(requests: string[]): number[] {
  const queue: Queue = new Queue();
  const result: number[] = [];

  for (let i = 0; i < requests.length; i++) {
    const request = requests[i];

    if (request.startsWith('+')) {
      queue.addToEnd(Number(request.slice(2)));
    } else if (request.startsWith('*')) {
      const num = Number(request.slice(2));
      queue.addToMiddle(num);
    } else {
      result.push(queue.giveNext());
    }

    // console.log(queue.getAsArray());
  }

  return result;
}

class Queue {
  private length = 0;
  public head: Node | null = null;
  public tail: Node | null = null;
  public middle: Node | null = null;

  addToMiddle(val: number) {
    if (this.length === 0) {
      this.addToEnd(val);
      return;
    }

    const tmp = this.middle!.next;
    this.middle!.next = new Node(val, tmp, this.middle);
    this.length++;
    if (this.length % 2 === 1) {
      this.middle = this.middle!.next ?? this.middle;
    }
    if (this.tail && this.tail.next !== null) {
      this.tail = this.tail.next;
    }
  }

  addToEnd(val: number) {
    if (val === 4) {
      debugger;
    }

    if (this.tail === null) {
      this.head = this.tail = this.middle = new Node(val, null, null);
    } else {
      this.tail.next = new Node(val, null, this.tail);
      this.tail = this.tail.next;
    }
    this.length++;
    if (this.length % 2 === 1) {
      this.middle = this.middle!.next ?? this.middle;
    }
  }

  giveNext(): number {
    this.length--;
    if (this.length % 2 === 1) {
      this.middle = this.middle!.next ?? this.middle;
    }
    const head = this.head;
    this.head = this.head!.next;
    if (this.head) {
      this.head.prev = null;
    } else {
      this.middle = null;
      this.tail = null;
    }

    return head!.data;
  }

  getAsArray(): number[] {
    const res: number[] = [];
    if (!this.head) return res;

    let current: Node | null = this.head;
    while (current) {
      res.push(current.data);
      current = current.next;
    }

    return res;
  }
}

class Node {
  constructor(
    public data: number,
    public next: Node | null,
    public prev: Node | null
  ) {}
}
