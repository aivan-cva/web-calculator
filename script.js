const buttons = document.querySelectorAll(".btn");

let operation = { firtsNum: "0", operand: "", lastNum: "0" };

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const input = {
      type: e.target.dataset.type,
      value: e.target.value,
    };

    res = handle_input(input);
    console.log(res);
  });
});

const handle_input = (input) => {
  switch (input.type) {
    case "num":
      if (!operation.operand) {
        if (operation.firtsNum == "0") {
          operation.firtsNum = input.value;
          return operation;
        }
        if (operation.firtsNum != "0") {
          operation.firtsNum += input.value;
          return operation;
        }
      } else if (operation.operand != "") {
        if (operation.lastNum == "0") {
          operation.lastNum = input.value;
          return operation;
        }
        if (operation.lastNum != "0") {
          operation.lastNum += input.value;
          return operation;
        }
      }
      break;

    case "operand":
      if (operation.operand == "") {
        operation.operand = input.value;
        return operation;
      }

      if (operation.operand != "" && operation.lastNum != "0") {
        let res = resolveOperation(operation);
        clearOperation();
        operation.firtsNum = String(res);
        operation.operand = input.value;
        return operation;
      }

      return operation;

    case "dot":
      if (operation.operand == "" && !operation.firtsNum.includes(".")) {
        operation.firtsNum += ".";
        return operation;
      } else if (operation.operand != "" && !operation.lastNum.includes(".")) {
        operation.lastNum += ".";
        return operation;
      }
      return operation;

    case "equal":
      let res = resolveOperation(operation);
      clearOperation();
      operation.firtsNum = String(res);
      return operation;

    default:
      break;
  }
};

const resolveOperation = (operation) => {
  if (operation.lastNum == "0" && operation.operand == "division") {
    return "Divide by Zero Error";
  }

  const firts = Number(operation.firtsNum);
  const last = Number(operation.lastNum);
  switch (operation.operand) {
    case "addition":
      return firts + last;
      break;
    case "subtraction":
      return firts - last;
    case "division":
      return firts / last;
    case "multiplication":
      return firts * last;
    default:
      break;
  }
};

const clearOperation = () => {
  operation.firtsNum = "0";
  operation.operand = "";
  operation.lastNum = "0";
};
