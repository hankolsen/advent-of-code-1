export const getCaloriesList = (input: number[]) => {
  const caloriesList: number[] = [];

  input.reduce((acc: number, cal: number, index: number) => {
    if (index === input.length - 1) {
      acc += cal;
      caloriesList.push(acc);
    } else if (cal === 0) {
      caloriesList.push(acc);
      acc = 0;
    } else {
      acc += cal;
    }
    return acc;
  }, 0);

  caloriesList.sort((a, b) => b - a);

  return caloriesList;
};
