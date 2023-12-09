const findDiffs = (numbers: number[], acc: number[][] = []): number[][] => {
  const diffs = [];

  for (let i = 0; i <= numbers.length - 2; i += 1) {
    const diff = numbers[i + 1] - numbers[i];
    diffs.push(diff);
  }

	acc = [...acc, diffs];
  if (diffs.every((num) => num === 0)) {
    return acc;
  } else {
    return findDiffs(diffs, acc);
  }
};

export const part1 = (rows: string[]) => {
  return rows.reduce((acc, row) => {
    const numbers = row.split(' ').map(Number);
    const diffs = findDiffs(numbers);
		diffs.unshift(numbers);
		let diff = 0;
		for (let i = diffs.length - 1; i > 0; i -= 1) {
			// @ts-ignore
			diff = diffs[i - 1].at(-1) + diff;
		}
		acc += diff;
    return acc;
  }, 0);
};
