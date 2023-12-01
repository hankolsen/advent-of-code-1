export const getTextOrNumberSum = (rows: string[]) => {
  return rows.reduce((acc, row) => {
    acc += findTextOrNumbers(row);
    return acc;
  }, 0);
};

const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const findTextOrNumbers = (input: string) => {
  let min = Infinity;
  let max = -1;
  let first = 0;
  let last = 0;

  words.forEach((word) => {
    let position = input.indexOf(word);
    if (position > -1 && position < min) {
      min = position;
      first = words.indexOf(word) + 1;
    }

    position = input.lastIndexOf(word);
    if (position > -1 && position > max) {
      max = position;
      last = words.indexOf(word) + 1;
    }
  });

  numbers.forEach((number) => {
    let position = input.indexOf(number);
    if (position > -1 && position < min) {
      min = position;
      first = Number(number);
    }

    position = input.lastIndexOf(number);
    if (position > -1 && position > max) {
      max = position;
      last = Number(number);
    }
  });

  return Number(first.toString() + last.toString());
};
