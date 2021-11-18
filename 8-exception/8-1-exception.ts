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
        const invalid: never = direction;
        throw new Error(`unknown direction: ${invalid}`);
    }
  };
}
