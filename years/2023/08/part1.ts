export const part1 = (rows: string[]) => {
  const instructions = rows[0].split('');
  rows.splice(0, 2);
  const map = rows.reduce((acc: Record<string, [string, string]>, row) => {
    const [, start, left, right] = row.match(/(\w+) = \((\w+), (\w+)\)/) ?? '';
    acc[start] = [left, right];
    return acc;
  }, {});

  let i = 0;
  let currentLocation: string = 'AAA';

  while (currentLocation !== 'ZZZ') {
    const direction = instructions[i % instructions.length] === 'L' ? 0 : 1;
    currentLocation = map[currentLocation][direction];
    i += 1;
  }
  return i;
};
