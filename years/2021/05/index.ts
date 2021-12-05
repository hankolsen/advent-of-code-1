import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 5;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/05/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/05/data.txt
// problem url  : https://adventofcode.com/2021/day/5

type Grid = { [key: string]: number };
const parseRow = (row: string) => {
  const [, x1, y1, x2, y2] = (row.match(/(\d+),(\d+) -> (\d+),(\d+)/) ?? []).map(Number);
  return { x1, y1, x2, y2 };
};

const addPointToGrid = ({ grid, x, y }: { grid: Grid, x: number, y: number }) => {
  grid[`${x},${y}`] = (grid[`${x},${y}`] ?? 0) + 1;
  return grid;
};

const calculateDuplicates = (grid: Grid) => Object.values(grid).filter((cell) => cell > 1).length;

const fillGrid = (lines: { x1: number, y1: number, x2: number, y2: number }[]) => {
  let grid: Grid = {};
  lines.forEach(({ x1, y1, x2, y2 }) => {
    let dx = Math.sign(x2 - x1);
    let dy = Math.sign(y2 - y1);
    let x = x1;
    let y = y1;
    while (x !== x2 || y !== y2) {
      grid = addPointToGrid({ grid, x, y });
      x += dx;
      y += dy;
    }
    addPointToGrid({ grid, x, y });
  });
  
  return grid;
};

async function p2021day5_part1(input: string, ...params: any[]) {
  const lines = getRows(input).map(parseRow).filter(({ x1, y1, x2, y2 }) => x1 === x2 || y1 === y2);
  return calculateDuplicates(fillGrid(lines));
}

async function p2021day5_part2(input: string, ...params: any[]) {
  const lines = getRows(input).map(parseRow);
  return calculateDuplicates(fillGrid(lines));
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
      expected: '5',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
      expected: '12',
    },
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day5_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day5_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2021day5_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2021day5_part2(input));
  const part2After = performance.now();
  
  logSolution(5, 2021, part1Solution, part2Solution);
  
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
