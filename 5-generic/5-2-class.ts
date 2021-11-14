{
  // either: a or b
  interface Either<L, R> {
    left: () => L;
    right: () => R;
  }

  class SimpleEither<L, R> implements Either<L, R> {
    constructor(private leftValue: L, private rightValue: R) {}

    left(): L {
      return this.leftValue;
    }

    right(): R {
      return this.rightValue;
    }
  }

  const either: Either<number, number> = new SimpleEither(45, 32);
  console.log(either.left());
  console.log(either.right());
  const either1 = new SimpleEither({ name: "aslkdj" }, true);
  console.log(either1.left());
  console.log(either1.right());
}
