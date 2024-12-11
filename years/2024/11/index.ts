import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 11;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/11/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/11/data.txt
// problem url  : https://adventofcode.com/2024/day/11

async function p2024day11_part1(input: string, ...params: any[]) {
  const numbers = input.split(' ').map(Number);
  for (let i = 0; i < 25; i += 1) {
    for (let j = 0; j < numbers.length; j += 1) {
      const x = numbers[j];
      if (x === 0) {
        numbers[j] = 1;
      } else if (x.toString().length % 2 === 0) {
        const len = x.toString().length;
        const left = Number(x.toString().slice(0, len / 2));
        const right = Number(x.toString().slice(len / 2));
        numbers.splice(j, 1, left, right);
        j += 1;
      } else {
        numbers[j] = numbers[j] * 2024;
      }
    }
  }
  return numbers.length;
}

async function p2024day11_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `125 17`,
      expected: '55312',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day11_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day11_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day11_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day11_part2(input));
  const part2After = performance.now();

  logSolution(11, 2024, part1Solution, part2Solution);

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
