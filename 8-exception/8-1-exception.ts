// Java: Exception
// Javascript: Error
{
  // const array = new Array(1000000000000000000000); // Error

  const move = (
    direction: "left" | "right" | "top" | "bottom" | "he"
  ): void => {
    switch (direction) {
      case "left":
        // something
        break;
      case "right":
        // something
        break;
      case "top":
        // something
        break;
      case "bottom":
        // something
        break;
      case "he":
        // something new!
        break;
      default:
        const invalid: never = direction; // 만약 분기처리가 되지 않는 경우가 있다면 default로 들어오고 invaild는 never 타입이기 때문에 에러가 발생
        throw new Error(`unknown direction: ${invalid}`);
    }
  };

  // Error(Exception) Handling: try -> catch -> finally

  function readFile(fileName: string): string {
    if (fileName === "not exist!") {
      throw new Error(`file not exist!! ${fileName}`);
    }

    return "file contents";
  }

  function closeFile(fileName: string) {
    //
  }

  function run() {
    const fileName = "not exist!";
    try {
      console.log(readFile(fileName));
    } catch (error) {
      console.log(`${error}`);
      console.log("catched!!");
      return; // return을 했지만 finally는 실행된다!
    } finally {
      closeFile(fileName);
      console.log("finally!!");
    }
    console.log("!!");
  }

  run();
}
