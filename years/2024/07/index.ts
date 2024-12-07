import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 7;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/07/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/07/data.txt
// problem url  : https://adventofcode.com/2024/day/7

const calculate = (target: number, numbers: number[]) => {
  if (!numbers.length) {
    return 0;
  }

  const isPossible = (target: number, i = numbers.length - 1) => {
    if (i < 0) {
      return target === 0;
    }
    const n = numbers[i];
    if (target % n === 0 && isPossible(target / n, i - 1)) {
      return true;
    }
    if (isPossible(target - n, i - 1)) {
      return true;
    }
    return false;
  };
  return isPossible(target) ? target : 0;
};

async function p2024day7_part1(input: string, ...params: any[]) {
  const data = input.split('\n').map((row) => {
    const [t, n] = row.split(': ');
    return { target: Number(t), numbers: n.split(' ').map(Number) };
  });

  return data.reduce((acc, { target, numbers }) => {
    acc += calculate(target, numbers);
    return acc;
  }, 0);
}

async function p2024day7_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
      expected: '3749',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day7_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day7_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day7_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day7_part2(input));
  const part2After = performance.now();

  logSolution(7, 2024, part1Solution, part2Solution);

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
