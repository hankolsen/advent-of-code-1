import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';
import { getSum } from './getSum';
import { getTextOrNumberSum } from './getTextOrNumberSum';

const YEAR = 2023;
const DAY = 1;

// solution path: /Users/hank/projects/advent-of-code-1/years/2023/01/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2023/01/data.txt
// problem url  : https://adventofcode.com/2023/day/1

async function p2023day1_part1(input: string, ...params: any[]) {
  return getSum(getRows(input));
}

async function p2023day1_part2(input: string, ...params: any[]) {
  return getTextOrNumberSum(getRows(input));
}

async function run() {
  const part1tests: TestCase[] = [{
    input: `
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet
    `,
    expected: '142',
  }];
  const part2tests: TestCase[] = [{
    input: `
    two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen
    `,
    expected: '281',
  }
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
	    test.logTestResult(testCase, String(await p2023day1_part1(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
		  test.logTestResult(testCase, String(await p2023day1_part2(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2023day1_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2023day1_part2(input));
  const part2After = performance.now();

  logSolution(1, 2023, part1Solution, part2Solution);

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
