import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2022;
const DAY = 12;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/12/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/12/data.txt
// problem url  : https://adventofcode.com/2022/day/12

type Queue = [number, number, number][];

const moves = (row: number, col: number) => [
  [row, col + 1],
  [row + 1, col],
  [row, col - 1],
  [row - 1, col],
];

const canGoTo = (a: string, b: string) => {
  if (a === 'S') {
    a = 'a';
  }
  if (b === 'S') {
    b = 'a';
  }
  if (a === 'E') {
    a = 'z';
  }
  if (b === 'E') {
    b = 'z';
  }
  return a.charCodeAt(0) - 1 <= b.charCodeAt(0);
};

const findShortestPath = (grid: string[][], queue: Queue) => {
  let result = -Infinity;
  let seen: string[] = [];
  
  while (queue.length) {
    let [row, col, steps] = queue.shift()!;
    if (seen.includes(`${row},${col}`)) {
      continue;
    }
    if (grid[row][col] === 'E') {
      result = steps;
      break;
    }
    moves(row, col).forEach(([y, x]) => {
      if (grid[y] && grid[y][x] && !seen.includes(`${y},${x}`) && canGoTo(grid[y][x], grid[row][col])) {
        queue.push([y, x, steps + 1]);
      }
    });
    seen.push(`${row},${col}`);
  }
  return result;
};

async function p2022day12_part1(input: string, ...params: any[]) {
  let queue: Queue = [];
  
  const grid = getRows(input).map((row, y) => {
    const cols = row.split('');
    cols.some((pos, x) => {
      if (pos === 'S') {
        queue.push([y, x, 0]);
      }
    });
    return cols;
  });
  
  return findShortestPath(grid, queue);
}

async function p2022day12_part2(input: string, ...params: any[]) {
  let queue: [number, number, number][] = [];
  
  const grid = getRows(input).map((row, y) => {
    const cols = row.split('');
    cols.some((pos, x) => {
      if (pos === 'S' || pos === 'a') {
        queue.push([y, x, 0]);
      }
    });
    return cols;
  });
  
  return findShortestPath(grid, queue);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
      expected: '31',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`,
      expected: '29',
    },
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day12_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day12_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day12_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day12_part2(input));
  const part2After = performance.now();
  
  logSolution(12, 2022, part1Solution, part2Solution);
  
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
