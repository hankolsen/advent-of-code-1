const getNumbers = (numbers: number[], wantedSum = 2020) => {
  let firstNumber = 0;
  let secondNumber = 0;
  numbers.some((number, i, list) => {
    const list2 = list.slice(i + 1);
    firstNumber = number;
    return list2.some((number2) => {
      if (firstNumber + number2 === wantedSum) {
        secondNumber = number2;
        return true;
      }
      return false;
    });
  });
  return [firstNumber, secondNumber];
};

export const getProduct = (numbers: number[], wantedSum = 2020) => {
  const [x, y] = getNumbers(numbers, wantedSum);

  return x * y;
};

export const getTrippleProducts = (numbers: number[]) => {
  let number1 = 0;
  let number2 = 0;
  let number3 = 0;

  numbers.some((number, i, list) => {
    const list1 = list.slice(i + 1);
    number1 = number;
    const [x, y] = getNumbers(list1, 2020 - number1);
    if (x && y) {
      number2 = x;
      number3 = y;
      return true;
    }
    return false;
  });

  return number1 * number2 * number3;
};
