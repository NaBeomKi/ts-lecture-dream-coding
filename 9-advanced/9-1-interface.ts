{
  type PositionType = {
    x: number;
    y: number;
  };

  interface PositionInterface {
    x: number;
    y: number;
  }

  // Object ★
  const obj1: PositionType = {
    x: 1,
    y: 1,
  };
  const obj2: PositionInterface = {
    x: 1,
    y: 1,
    z: 1, // 이 후 병합 때문에 발생하는 에러를 위해 작성됨.
  };

  // Class ★
  class Pos1 implements PositionType {
    x: number;
    y: number;
  }
  class Pos2 implements PositionInterface {
    x: number;
    y: number;
    z: number; // 이 후 병합 때문에 발생하는 에러를 위해 작성됨.
  }

  // Extends ★
  type ZPositionType = PositionType & { z: number };
  interface ZPositionInterface extends PositionInterface {
    z: number;
  }

  // Only interface can be merged.
  // 동일 이름의 interface를 다시 선언하면 이전의 내용과 합쳐져 사용할 때 둘 모두의 속성을 가져야 함
  interface PositionInterface {
    z: number;
  }

  // type PositionType{} // type은 이런 병합이 불가능하기 때문에 에러 발생

  // Type aliases can use computed properties
  type Person = {
    name: string;
    age: number;
  };

  type Name = Person["name"]; // string
  type NumberType = number;
  type Direction = "left" | "right";
}
