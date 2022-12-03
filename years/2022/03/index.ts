import chalk from 'chalk';
import { performance } from 'perf_hooks';
import { log, logSolution } from '../../../util/log';
import * as test from '../../../util/test';
import * as util from '../../../util/util';
import { findDuplicateValues } from './findDuplicateValues';
import { findGroupDuplicateValues } from './findGroupDuplicateValues';

const YEAR = 2022;
const DAY = 3;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/03/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/03/data.txt
// problem url  : https://adventofcode.com/2022/day/3

async function p2022day3_part1(input: string, ...params: any[]) {
  return findDuplicateValues(input);
}

async function p2022day3_part2(input: string, ...params: any[]) {
  return findGroupDuplicateValues(input);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
      expected: '157',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
      expected: '70',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day3_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day3_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2022day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2022day3_part2(input));
  const part2After = performance.now();

  logSolution(3, 2022, part1Solution, part2Solution);

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
