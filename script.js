const buttons = document.querySelectorAll(".btn");

let operation = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handle_input(e.target.value);
  });
});

const handle_input = (input) => {
  operation += input;
  console.log(operation);
};
