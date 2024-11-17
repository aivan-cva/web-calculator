const buttons = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");

let operation = {
  firtsNum: "0",
  operand: "",
  lastNum: "",
};

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
          updateScreen(operation);
          return operation;
        }
        if (operation.firtsNum != "0") {
          operation.firtsNum += input.value;
          updateScreen(operation);
          return operation;
        }
      } else if (operation.operand != "") {
        if (operation.lastNum == "0") {
          operation.lastNum = input.value;
          updateScreen(operation);
          return operation;
        }
        if (operation.lastNum != "0") {
          operation.lastNum += input.value;
          updateScreen(operation);
          return operation;
        }
      }
      break;

    case "operand":
      if (operation.operand == "") {
        operation.operand = input.value;
        updateScreen(operation);
        return operation;
      }

      if (operation.operand != "" && operation.lastNum != "0") {
        let res = resolveOperation(operation);
        clearOperation();
        operation.firtsNum = String(res);
        operation.operand = input.value;
        updateScreen(operation);
        return operation;
      }

      updateScreen(operation);
      return operation;

    case "dot":
      if (operation.operand == "" && !operation.firtsNum.includes(".")) {
        operation.firtsNum += ".";
        updateScreen(operation);
        return operation;
      } else if (operation.operand != "" && !operation.lastNum.includes(".")) {
        operation.lastNum += ".";
        updateScreen(operation);
        return operation;
      }
      updateScreen(operation);
      return operation;

    case "clear":
      if (input.value == "AC") {
        clearOperation();
        updateScreen(operation);
        return operation;
      }

    case "equal":
      if (operation.firtsNum && !operation.operand && !operation.lastNum) {
        updateScreen(operation);
        return operation;
      }
      let res = resolveOperation(operation);
      clearOperation();
      operation.firtsNum = String(res);
      updateScreen(operation);
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

const updateScreen = ({ firtsNum, operand, lastNum }) => {
  if (lastNum == "0") {
    lastNum = "";
  }
  let symbol = "";
  switch (operand) {
    case "addition":
      symbol = "+";
      break;
    case "subtraction":
      symbol = "-";
      break;
    case "multiplication":
      symbol = "*";
      break;
    case "division":
      symbol = "/";
      break;
    default:
      break;
  }
  screen.textContent = firtsNum + symbol + lastNum;
};
