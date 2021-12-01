const getSlidingWindow = (input: number[]) => {
  return input.reduce(({ previous, count }, row, index, arr) => {
    if (index >= arr.length - 2) {
      return { previous, count };
    }
    
    const sum = row + arr[index + 1] + arr[index + 2];
    
    if (sum > previous) {
      return { previous: sum, count: count + 1 };
    }
    
    return { previous: sum, count };
  }, { previous: 0, count: -1 })?.count;
};
export default getSlidingWindow;
