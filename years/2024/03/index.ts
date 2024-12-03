import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 3;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/03/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/03/data.txt
// problem url  : https://adventofcode.com/2024/day/3

async function p2024day3_part1(input: string, ...params: any[]) {
  const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return [...matches].reduce((acc, [, a, b]) => acc + Number(a) * Number(b), 0);
}

async function p2024day3_part2(input: string, ...params: any[]) {
  const matches = input.matchAll(/do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g);
  let enabled = true;
  return [...matches].reduce((acc, match) => {
    if (match[0] === "don't()") {
      enabled = false;
      return acc;
    }
    if (match[0] === 'do()') {
      enabled = true;
      return acc;
    }
    if (enabled) {
      acc += Number(match[1]) * Number(match[2]);
    }
    return acc;
  }, 0);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
      expected: '161',
    },
  ];
  const part2tests: TestCase[] = [
    { input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`, expected: '48' },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day3_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day3_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day3_part2(input));
  const part2After = performance.now();

  logSolution(3, 2024, part1Solution, part2Solution);

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
