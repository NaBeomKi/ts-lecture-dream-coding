{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    constructor(coffeeBeans: number) {
      // private는 상속할 수 없으므로 public 또는 자식에서 접근가능한 protected 으로
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number): void {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    clean(): void {
      console.log("Cleaning the machine...🧼");
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preheat(): void {
      console.log("heating up...🔥");
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...☕️`);

      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer {
    private steamMlik(): void {
      console.log("Steaming some mlik...🥛");
    }

    makeMlik(cup: CoffeeCup): CoffeeCup {
      this.steamMlik();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  class CandySugarMixer {
    private getSugar(): boolean {
      console.log("Getting some sugar from candy 🍭");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const hasSugar = this.getSugar();
      return {
        ...cup,
        hasSugar,
      };
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkFrother.makeMlik(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: CandySugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private mlik: CheapMilkSteamer,
      private sugar: CandySugarMixer
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.mlik.makeMlik(this.sugar.addSugar(coffee));
    }
  }

  const milkSteamer = new CheapMilkSteamer();
  const sugarMixer = new CandySugarMixer();

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(32),
    new CaffeLatteMachine(20, "1", milkSteamer),
    new SweetCoffeeMaker(16, sugarMixer),
    new CoffeeMachine(18),
    new CaffeLatteMachine(20, "3", milkSteamer),
    new SweetCoffeeMaker(16, sugarMixer),
    new SweetCaffeLatteMachine(54, milkSteamer, sugarMixer),
  ];

  machines.forEach((machine) => {
    console.log("-----------------------------");
    machine.makeCoffee(1);
  });
}
