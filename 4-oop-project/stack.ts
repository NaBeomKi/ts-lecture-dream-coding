interface Stack {
  readonly size: number;
  push(value: string): void;
  pop(): string;
}

type StackNode = {
  readonly value: string;
  readonly next?: StackNode;
};

class StackImpl implements Stack {
  private _size: number = 0;
  private head?: StackNode;

  constructor(private capacity: number) {}

  get size(): number {
    return this._size;
  }

  push(value: string): void {
    if (this.size >= this.capacity) {
      throw new Error("Stack is full!");
    }
    const node: StackNode = {
      value,
      next: this.head,
    };
    this.head = node;
    this._size++;
  }

  pop(): string {
    if (!this.head) {
      throw new Error("Stack is empty!");
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}

const stack = new StackImpl(10);
for (let i = 0; i < 10; i++) {
  stack.push(`${i}`);
}
while (stack.size) {
  console.log(stack.pop());
}
console.log(stack.pop());
