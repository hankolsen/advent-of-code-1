import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 10;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/10/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/10/data.txt
// problem url  : https://adventofcode.com/2024/day/10
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const validNextCell = (grid: number[][], x: number, y: number) => {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
};

const findPaths = (grid: number[][], row: number, col: number) => {
  const dfs = (grid: number[][], row: number, col: number, visited: Set<string>): number => {
    if (grid[row][col] === 9) {
      return 1;
    }

    return dirs
      .map(([dx, dy]) => [row + dx, col + dy])
      .filter(
        ([nextRow, nextCol]) =>
          !visited.has(`${nextRow},${nextCol}`) &&
          validNextCell(grid, nextRow, nextCol) &&
          grid[nextRow][nextCol] === grid[row][col] + 1,
      )
      .reduce((acc, [nextRow, nextCol]) => {
        visited.add(`${nextRow},${nextCol}`);
        return acc + dfs(grid, nextRow, nextCol, visited);
      }, 0);
  };
  return dfs(grid, row, col, new Set(`${row},${col}`));
};

const getStartPoints = (grid: number[][]) =>
  grid.reduce((acc: number[][], row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) {
        acc.push([y, x]);
      }
    });
    return acc;
  }, []);

async function p2024day10_part1(input: string, ...params: any[]) {
  const grid = input
    .trim()
    .split('\n')
    .map((line) => line.split('').map(Number));

  const startPoints = getStartPoints(grid);
  return startPoints.reduce((count, [row, col]) => count + findPaths(grid, row, col), 0);
}

async function p2024day10_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
      expected: '36',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day10_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day10_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day10_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day10_part2(input));
  const part2After = performance.now();

  logSolution(10, 2024, part1Solution, part2Solution);

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
