{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public - default
  // private
  // protected
  class CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number): void {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;

      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = CoffeeMaker.makeMachine(32);
  console.log(maker);

  class User {
    private internalAge = 4;

    constructor(private firstName: string, private lastName: string) {}

    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    get age(): number {
      return this.internalAge;
    }

    set age(num: number) {
      if (num < 0) {
        throw new Error("Value for age should be greater than 0");
      }
      this.internalAge = num;
    }
  }

  const user = new User("Na", "beomki");
  console.log(user.fullName);
  console.log(user.age);
  user.age = 62;
  console.log(user.age);
}
