{
  // Bad
  function checkNotNullNumberBad(arg: number | null): number {
    if (arg === null) {
      throw new Error("Not valid number!");
    }
    return arg;
  }

  function checkNotNullAnyBad(arg: any | null): any {
    if (arg === null) {
      throw new Error("Arg is null or undefined!");
    }
    return arg;
  }

  // Good
  function checkNotNull<T>(arg: T | null): T {
    if (arg === null) {
      throw new Error("Arg is null or undefined");
    }
    return arg;
  }

  const number = checkNotNull(1);
  const bool: boolean = checkNotNull(true);
  console.log(number, bool);
  checkNotNull(null);
}
