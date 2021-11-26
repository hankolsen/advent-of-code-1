import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getProduct, getTrippleProducts } from './product';
import { getNumberRows } from '../../../util/input';

const YEAR = 2020;
const DAY = 1;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2020/01/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2020/01/data.txt
// problem url  : https://adventofcode.com/2020/day/1

async function p2020day1_part1(input: string, ...params: any[]) {
  return getProduct(getNumberRows(input));
}

async function p2020day1_part2(input: string, ...params: any[]) {
  return getTrippleProducts(getNumberRows(input));
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
			1721
			979
			366
			299
			675
			1456
			`,
      expected: '514579',
    },
  ];
  const part2tests: TestCase[] = [{ input: '1721\n979\n366\n299\n675\n1456', expected: '241861950' }];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2020day1_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2020day1_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day1_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day1_part2(input));
  const part2After = performance.now();

  logSolution(1, 2020, part1Solution, part2Solution);

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
