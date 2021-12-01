const getLargerCount = (input: number[]) => {
  const { count } = input.reduce((acc, row) => {
    if (row > acc.previous) {
      acc.count += 1;
    }
    acc.previous = row;
    return acc;
  }, { previous: -Infinity, count: -1 });
  return count
};

export default getLargerCount;
