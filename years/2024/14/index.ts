import _, { uniq } from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 14;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/14/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/14/data.txt
// problem url  : https://adventofcode.com/2024/day/14

async function p2024day14_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  const robots = rows.reduce((acc: { x: number; y: number; dx: number; dy: number }[], row) => {
    const [, x, y, dx, dy] = row.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/) ?? [];
    acc.push({ x: Number(x), y: Number(y), dx: Number(dx), dy: Number(dy) });
    return acc;
  }, []);
  const width = 101;
  const height = 103;
  for (let i = 0; i < 100; i += 1) {
    robots.forEach(({ x, y, dx, dy }, j) => {
      x += dx;
      x = x % width;
      if (x < 0) {
        x = width + x;
      }
      y += dy;
      y = y % height;
      if (y < 0) {
        y = height + y;
      }
      robots[j] = { x, y, dx, dy };
    });
  }

  const quadrants = [
    [0, 0, Math.floor(width / 2) - 1, Math.floor(height / 2) - 1],
    [Math.ceil(width / 2), 0, width - 1, Math.floor(height / 2) - 1],
    [0, Math.floor(height / 2) + 1, Math.floor(width / 2) - 1, height - 1],
    [Math.ceil(width / 2), Math.ceil(height / 2), width - 1, height - 1],
  ];

  return quadrants.reduce((acc, [x1, y1, x2, y2], i) => {
    let count = 0;
    robots.forEach(({ x, y }) => {
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        count += 1;
      }
    });
    return acc * count;
  }, 1);
}

async function p2024day14_part2(input: string, ...params: any[]) {
  const rows = getRows(input);
  const robots = rows.reduce((acc: { x: number; y: number; dx: number; dy: number }[], row) => {
    const [, x, y, dx, dy] = row.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/) ?? [];
    acc.push({ x: Number(x), y: Number(y), dx: Number(dx), dy: Number(dy) });
    return acc;
  }, []);
  const width = 101;
  const height = 103;
  for (let i = 0; i < 10000; i += 1) {
    const uniquePositions = new Set<string>();
    robots.forEach(({ x, y, dx, dy }, j) => {
      x += dx;
      x = x % width;
      if (x < 0) {
        x = width + x;
      }
      y += dy;
      y = y % height;
      if (y < 0) {
        y = height + y;
      }
      robots[j] = { x, y, dx, dy };
      uniquePositions.add(`${x},${y}`);
    });

    if (uniquePositions.size === robots.length) {
      return i + 1;
    }
  }
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `p=0,4 v=3,-3
    p=6,3 v=-1,-3
    p=10,3 v=-1,2
    p=2,0 v=2,-1
    p=0,0 v=1,3
    p=3,0 v=-2,-2
    p=7,6 v=-1,-3
    p=3,0 v=-1,-2
    p=9,3 v=2,3
    p=7,3 v=-1,2
    p=2,4 v=2,-3
    p=9,5 v=-3,-3`,
      expected: '12',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day14_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day14_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day14_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day14_part2(input));
  const part2After = performance.now();

  logSolution(14, 2024, part1Solution, part2Solution);

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
