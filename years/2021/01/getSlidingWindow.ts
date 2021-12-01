type Prop = { previous: number[], count: number, previousSum: number };

const getSlidingWindow = (input: number[]) => {
  const { count } = input.reduce((acc: Prop, row) => {
    acc.previous.push(row);
    if (acc.previous.length === 3) {
      const first = acc.previous.shift() ?? 0;
      const [second, third] = acc.previous;
      const sum = first + second + third;
      if (sum > acc.previousSum) {
        acc.previousSum = sum;
        acc.count += 1;
      }
    }
    return acc;
  }, { previous: [], count: -1, previousSum: -Infinity });
  return count;
};
export default getSlidingWindow;
