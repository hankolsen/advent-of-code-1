export const getSum = (rows: string[]) => {
	const numbers = rows.reduce((acc, row) => {
		acc += findNumbers(row);
		return acc;
	}, 0);
	return numbers;
}

const findNumbers = (input: string) => {
	const [, first] = input.match(/^[^\d]*(\d)/) ?? '';
	const [last] = input.match(/\d(?=[^\d]*$)/) ?? first;
	return Number(first + last);
} 