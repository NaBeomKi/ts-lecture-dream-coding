interface Stack<T> {
  readonly size: number;
  push(value: T): void;
  pop(): T;
}

type StackNode<T> = {
  readonly value: T;
  readonly next?: StackNode<T>;
};

class StackImpl<T> implements Stack<T> {
  private _size: number = 0;
  private head?: StackNode<T>;

  constructor(private capacity: number) {}

  get size(): number {
    return this._size;
  }

  push(value: T): void {
    if (this.size >= this.capacity) {
      throw new Error("Stack is full!");
    }
    const node = {
      value,
      next: this.head,
    };
    this.head = node;
    this._size++;
  }

  pop(): T {
    if (!this.head) {
      throw new Error("Stack is empty!");
    }
    const node = this.head;
    this.head = node.next;
    this._size--;
    return node.value;
  }
}

const stringStack = new StackImpl<string>(10);
for (let i = 0; i < 10; i++) {
  stringStack.push(`String ${i}`);
}
while (stringStack.size) {
  console.log(stringStack.pop());
}

const numberStack = new StackImpl<number>(10);
for (let i = 0; i < 10; i++) {
  numberStack.push(i);
}
while (numberStack.size) {
  console.log(numberStack.pop());
}

const boolStack = new StackImpl<boolean>(10);
for (let i = 0; i < 10; i++) {
  boolStack.push(!!i);
}
while (boolStack.size) {
  console.log(boolStack.pop());
}
console.log(boolStack.pop());
