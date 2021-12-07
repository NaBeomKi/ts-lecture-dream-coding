const x = {};
const y = {};
console.log("x", x);
console.log("y", y);
console.log(x.__proto__ === y.__proto__);

console.clear();

function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member level
  // this.makeCoffee = (shots) => {
  //   console.log("making...");
  // };
}

CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log("making...");
};

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}

LatteMachine.prototype = Object.create(CoffeeMachine.prototype);
LatteMachine.prototype.constructor = LatteMachine;

const latteMachine = new LatteMachine(10);
console.log(latteMachine);
latteMachine.makeCoffee();
