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

    constructor(
      coffeeBeans: number,
      private milkFrother: MilkFrother,
      private sugar: SugarProvider
    ) {
      // private는 상속할 수 없으므로 public 또는 자식에서 접근가능한 protected 으로
      this.coffeeBeans = coffeeBeans;
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
      const coffee = this.extract(shots);
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milkFrother.makeMilk(sugarAdded);
    }
  }

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Steaming some milk...🥛");
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 고급 우유 거품기
  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Fancy steaming some milk...🥛");
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 차가운 우유 거품기
  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("Cold steaming some milk...🥛");
    }

    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return { ...cup };
    }
  }

  // 설탕 제조기 from Candy
  class CandySugarMixer implements SugarProvider {
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

  // 설탕 제조기 from Jar
  class SugarMixer implements SugarProvider {
    private getSugar(): boolean {
      console.log("Getting some sugar from jar 🍯");
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

  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return { ...cup };
    }
  }

  // Milk
  const cheapMilkSteamer = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();
  const coldMilkSteamer = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  //
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);
  const latteMacine = new CoffeeMachine(15, cheapMilkSteamer, noSugar);
  const coldLatteMacine = new CoffeeMachine(15, coldMilkSteamer, noSugar);
  const sweetLatteMachine = new CoffeeMachine(30, cheapMilkSteamer, candySugar);

  console.log(
    sweetCandyMachine.makeCoffee(1),
    sweetMachine.makeCoffee(1),
    latteMacine.makeCoffee(1),
    coldLatteMacine.makeCoffee(1),
    sweetLatteMachine.makeCoffee(1)
  );
}
