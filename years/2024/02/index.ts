import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 2;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/02/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/02/data.txt
// problem url  : https://adventofcode.com/2024/day/2

async function p2024day2_part1(input: string, ...params: any[]) {
  const rows = getRows(input).map((row) => row.split(' ').map(Number));

  return rows.reduce((acc, row) => {
    let dir = row[0] < row[1] ? 1 : -1;
    const safe = row.every((num, i) => {
      if (i === 0) {
        return true;
      }
      const diff = Math.abs(num - row[i - 1]);
      if (diff === 0 || (dir < 0 && num > row[i - 1]) || (dir > 0 && num < row[i - 1]) || diff < 1 || diff > 3) {
        return false;
      }
      return true;
    });

    acc += safe ? 1 : 0;
    return acc;
  }, 0);
}

async function p2024day2_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
      expected: '2',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day2_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day2_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day2_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day2_part2(input));
  const part2After = performance.now();

  logSolution(2, 2024, part1Solution, part2Solution);

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
