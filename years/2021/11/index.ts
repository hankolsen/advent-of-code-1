import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 11;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/11/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/11/data.txt
// problem url  : https://adventofcode.com/2021/day/11

const parseInput = (input: string) => {
  return getRows(input).map((row) => {
    return row.split('').map(Number);
  });
};

const neighbours = (x: number, y: number) => [-1, 0, 1].flatMap((dx) => [-1, 0, 1].map((dy) => [x + dx, y + dy])).filter(([x1, y1]) => x1 >= 0 && y1 >= 0 && x1 <= 9 && y1 <= 9 && `${x},${y}` !== `${x1},${y1}`);

const step = (grid: number[][]) => {
  for (let y = 0; y < grid.length; y += 1) {
    for (let x = 0; x < grid[y].length; x += 1) {
      grid[y][x] += 1;
    }
  }
  const flashed = new Set();
  let moreFlashes;
  do {
    moreFlashes = false;
    for (let y = 0; y < grid.length; y += 1) {
      for (let x = 0; x < grid[y].length; x += 1) {
        if (grid[y][x] > 9) {
          flashed.add(`${x},${y}`);
          grid[y][x] = 0;
          neighbours(x,y).forEach(([x1, y1]) => {
            if (!flashed.has(`${x1},${y1}`)) {
              grid[y1][x1] += 1;
            }
          });
          moreFlashes = true;
        }
      }
    }
  } while (moreFlashes)
  return flashed.size;
};

async function p2021day11_part1(input: string, ...params: any[]) {
  const grid = parseInput(input);
  let flashes = 0;
  for (let i = 0; i < 100; i += 1) {
    flashes += step(grid);
  }
  return flashes;
}

async function p2021day11_part2(input: string, ...params: any[]) {
  const grid = parseInput(input);
  let allFlashes = false;
  let i = 0;
  while (!allFlashes) {
    i += 1;
    const flashes = step(grid);
    if (flashes === 100) {
      allFlashes = true;
    }
  }
  return i;
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`,
      expected: '1656',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`,
      expected: '195',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day11_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day11_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day11_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day11_part2(input));
  const part2After = performance.now();

  logSolution(11, 2021, part1Solution, part2Solution);

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
