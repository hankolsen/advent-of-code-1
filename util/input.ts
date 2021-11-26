export const getRows = (input: string) => input.trim().split('\n');
export const getRow = (input: string) => getRows(input)[0];
export const getNumberRows = (input: string) => getRows(input).map(Number);
