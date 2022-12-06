export const findUniqueWord = (input: string, count: number) => {
  let index;
  
  input.split('').some((_, i) => {
    const word = new Set(input.slice(i, i + count));
    if (word.size === count) {
      index = i + count;
      return true;
    }
  });
  
  return index;
};
