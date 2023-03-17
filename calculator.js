const calculation = document.getElementById("calculation");
const result = document.getElementById("result");

function addToCalculation(char) {
  if (endsWithFunctionName(calculation.value)) {
    calculation.value += char + ")";
  } else {
    calculation.value += char;
  }
}

function clearInput() {
  calculation.value = "";
  result.textContent = "";
}

function deleteChar() {
  calculation.value = calculation.value.slice(0, -1);
}

function calculateSingleOperation(operation) {
  // Split the input by the operation
  let parts = calculation.value.split(operation);

  // If there is no operation in the input, return the original input
  if (parts.length < 2) {
    return calculation.value;
  }

  // Parse the two numbers
  let num1 = parseFloat(parts[0]);
  let num2 = parseFloat(parts[1]);

  // If either number is not a valid number, check if it's a single argument function
  if (isNaN(num1) || isNaN(num2)) {
    let func, arg, result;
    if (num1.toString().endsWith("(") && parts[1].toString().endsWith(")")) {
      // Get the function name and argument
      func = num1.toString().slice(0, -1);
      arg = parseFloat(parts[1].toString().slice(0, -1));
    } else if (
      parts[0].toString().startsWith("sqrt(") &&
      parts[1].toString().endsWith(")")
    ) {
      // Handle square roots separately
      func = "sqrt";
      arg = parseFloat(parts[1].toString().slice(0, -1));
    } else {
      return "Error";
    }

    // Calculate the result based on the function
    switch (func) {
      case "sqrt":
        result = Math.sqrt(arg);
        break;
      case "sin":
        result = Math.sin(arg);
        break;
      case "cos":
        result = Math.cos(arg);
        break;
      case "tan":
        result = Math.tan(arg);
        break;
      case "log":
        result = Math.log10(arg);
        break;
      default:
        return "Error";
    }

    // Return the result with the function name and argument
    return calculation.value.replace(
      `${func}(${arg})`,
      `${func}(${arg}) = ${result}`
    );
  }

  // Calculate the result based on the operation
  let result;
  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "**":
      result = num1 ** num2;
      break;
    default:
      return "Error";
  }

  // Return the result with the operation and numbers
  return calculation.value.replace(
    `${num1}${operation}${num2}`,
    `${num1} ${operation} ${num2} = ${result}`
  );
}

function calculate() {
  let input = calculation.value;
  let output = "";

  if (input.startsWith("sqrt(") && input.endsWith(")")) {
    let expression = input.slice(5, -1);
    let value = Math.sqrt(parseFloat(expression));
    output = value.toString();
  } else {
    input = input.replace("^", "**");

    try {
      let value = eval(input);

      if (typeof value === "number" && !isNaN(value)) {
        output = value.toString();
      } else {
        throw new Error("Invalid result");
      }
    } catch (err) {
      output = "Error";
    }
  }

  result.textContent = output;
}

function endsWithFunctionName(input) {
  return ["cos", "tan", "log", "sqrt", "sin"].some((func) =>
    input.endsWith(func)
  );
}

function getFunctionAndArgument(numbers, num1, num2) {
  if (num1.toString().endsWith("(") && num2.toString().endsWith(")")) {
    let func = num1.toString().slice(0, -1);
    let arg = parseFloat(num2.toString().slice(0, -1));
    return [func, arg];
  } else {
    return null;
  }
}
