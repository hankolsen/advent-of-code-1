import { lcm } from '../../../util/util';

export const part2 = (rows: string[]) => {
  const instructions = rows[0].split('');
  rows.splice(0, 2);

  let currentPositions: string[] = [];
  const endPositions: string[] = [];
  const map = rows.reduce((acc: Record<string, [string, string]>, row) => {
    const [, start, left, right] = row.match(/(\w+) = \((\w+), (\w+)\)/) ?? '';
    acc[start] = [left, right];
    if (start.endsWith('A')) {
      currentPositions.push(start);
    }
    if (start.endsWith('Z')) {
      endPositions.push(start);
    }
    return acc;
  }, {});

  const steps: number[] = [];
  currentPositions.forEach((pos) => {
    let i = 0;
    while (!pos.endsWith('Z')) {
      const direction = instructions[i % instructions.length] === 'L' ? 0 : 1;
      pos = map[pos][direction];
      i += 1;
    }
    steps.push(i);
  });

  const result = steps.reduce((acc, step) => Number(lcm([BigInt(acc), BigInt(step)])), 1);
  return result;
};
