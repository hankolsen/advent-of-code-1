import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 9;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/09/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/09/data.txt
// problem url  : https://adventofcode.com/2021/day/9

type Props = { cell: number, col: number, row: number, rows: number, cols: number, grid: { [key: string]: number } };
const isLowPoint = ({ cell, col, row, rows, cols, grid, }: Props) => {
  return [{ dx: 0, dy: -1 }, { dx: 1, dy: 0 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }].every(({ dx, dy }) => {
    const x = col + dx;
    const y = row + dy;
    if (x < 0 || y < 0 || x >= cols || y >= rows) {
      return true;
    }
    return grid[`${x},${y}`] > cell;
  });
};

const createGrid = (data: string[]) => data.reduce((acc: { [key: string]: number }, row, y) => {
  row.split('').map((cell, x) => {
    acc[`${x},${y}`] = Number(cell);
    return acc;
  });
  return acc;
}, {});

const getLowPoints = ((input: string) => {
  const data = getRows(input);
  const rows = data.length;
  const cols = data[0].length;
  const grid = createGrid(data);
  const lowPoints = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cell = grid[`${col},${row}`];
      if (isLowPoint({ cell, col, row, cols, grid, rows })) {
        lowPoints.push({ x: col, y: row, cell });
      }
    }
  }
  return lowPoints;
});

async function p2021day9_part1(input: string, ...params: any[]) {
  return getLowPoints(input).reduce((acc, { cell }) => acc + cell + 1, 0)
}

async function p2021day9_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
2199943210
3987894921
9856789892
8767896789
9899965678
`,
      expected: '15',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `
2199943210
3987894921
9856789892
8767896789
9899965678
`,
      expected: '1134',
    },
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day9_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day9_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2021day9_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2021day9_part2(input));
  const part2After = performance.now();
  
  logSolution(9, 2021, part1Solution, part2Solution);
  
  log(chalk.gray('--- Performance ---'));
  log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
  log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
  log();
}

run()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    throw error;
  });
