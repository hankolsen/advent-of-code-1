import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRow } from '../../../util/input';

const YEAR = 2025;
const DAY = 2;

// solution path: /Users/hank/projects/advent-of-code-1/years/2025/02/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2025/02/data.txt
// problem url  : https://adventofcode.com/2025/day/2

async function p2025day2_part1(input: string, ...params: any[]) {
  const row = getRow(input);
  const ranges = row.split(',');
  return ranges.reduce((acc, range) => {
    const [start, end] = range.split('-').map(Number);
    for (let i = start; i <= end; i += 1) {
      const str = i.toString();
      if (str.length % 2) {
        continue;
      }

      const half = str.length / 2;
      const [a, b] = [str.slice(0, half), str.slice(half)];

      if (a === b) {
        acc += i;
      }
    }
    return acc;
  }, 0);
}

async function p2025day2_part2(input: string, ...params: any[]) {
  const row = getRow(input);
  const ranges = row.split(',');
  return ranges.reduce((acc, range) => {
    const [start, end] = range.split('-').map(Number);
    for (let i = start; i <= end; i += 1) {
      if (/\b(\d+)\1+\b/.test(i.toString())) {
        acc += i;
      }
    }
    return acc;
  }, 0);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
      expected: '1227775554',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
      expected: '4174379265',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2025day2_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2025day2_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2025day2_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2025day2_part2(input));
  const part2After = performance.now();

  logSolution(2, 2025, part1Solution, part2Solution);

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
