import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2022;
const DAY = 2;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/02/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/02/data.txt
// problem url  : https://adventofcode.com/2022/day/2

async function p2022day2_part1(input: string, ...params: any[]) {
  const schema: Record<string, number> = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,
    'B X': 0,
    'B Y': 3,
    'B Z': 6,
    'C X': 6,
    'C Y': 0,
    'C Z': 3,
  };
  const points: Record<string, number> = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  const rows = getRows(input);
  const result = rows.reduce((acc, row) => {
    const [, played] = row.split(' ');
    acc += schema[row] + points[played];
    return acc;
  }, 0);
  return result;
}

async function p2022day2_part2(input: string, ...params: any[]) {
  const schema: Record<string, string> = {
    'A X': 'C',
    'A Y': 'A',
    'A Z': 'B',
    'B X': 'A',
    'B Y': 'B',
    'B Z': 'C',
    'C X': 'B',
    'C Y': 'C',
    'C Z': 'A',
  };
  const results: Record<string, number> = {
    X: 0,
    Y: 3,
    Z: 6,
  };
  const points: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
  };
  const rows = getRows(input);
  const result = rows.reduce((acc, row) => {
    const played = schema[row];
    const [, result] = row.split(' ');
    acc += results[result] + points[played];
    return acc;
  }, 0);
  return result;
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
        A Y
B X
C Z
      `,
      expected: '15',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `
        A Y
B X
C Z
      `,
      expected: '12',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day2_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day2_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2022day2_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2022day2_part2(input));
  const part2After = performance.now();

  logSolution(2, 2022, part1Solution, part2Solution);

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
