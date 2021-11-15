{
  interface Employee {
    pay(): void;
  }

  class FullTimeEmployee implements Employee {
    pay() {
      console.log("Full time!");
    }

    workFullTime() {}
  }

  class PartTimeEmployee implements Employee {
    pay() {
      console.log("Part time!");
    }

    workPartTime() {}
  }

  // 세부적인 인자를 받아서 정말 추상적인 타입으로 다시 리턴하는 함수는 Bad!
  function payBad(employee: Employee): Employee {
    employee.pay();
    return employee;
  }

  // Good!
  function payGood<T extends Employee>(employee: T): T {
    employee.pay();
    return employee;
  }

  const ki = new FullTimeEmployee();
  const beom = new PartTimeEmployee();
  ki.workFullTime();
  beom.workPartTime();

  const kiAfterPayBad = payBad(ki);
  const beomAfterPayBad = payBad(beom);
  // kiAfterPayBad.workFullTime(); // error
  // beomAfterPayBad.workPartTime(); // error

  const kiAfterPayGood = payGood(ki);
  kiAfterPayGood.workFullTime();

  const obj = { name: "ki", age: 20 };
  const obj2 = { animal: "🐅" };

  console.log(getValue(obj, "name"));
  console.log(getValue(obj, "age"));
  console.log(getValue(obj2, "animal"));

  function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
  }
}
