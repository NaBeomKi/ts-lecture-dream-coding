console.log(this);

function simpleFunc() {
  console.log(this);
}

simpleFunc();

console.clear();

class Counter {
  count = 0;
  increase = () => {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase();
const func = counter.increase;
// const func = counter.increase.bind(counter);
func();

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
bob.run();
