import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2022;
const DAY = 25;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/25/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/25/data.txt
// problem url  : https://adventofcode.com/2022/day/25

const values: Record<string, number> = {
  '=': -2,
  '-': -1,
  '0': 0,
  '1': 1,
  '2': 2,
};

const snafuToDec = (row: string) => row.split('').reverse().reduce((acc, entry, i) => {
  acc += Math.pow(5, i) * values[entry];
  return acc;
}, 0);

async function p2022day25_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  const decimal = rows.reduce((sum, row) => {
    sum += snafuToDec(row);
    return sum;
  }, 0);
  
  return decimal;
}

async function p2022day25_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`,
      expected: '4890',
    },
  ];
  const part2tests: TestCase[] = [];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day25_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day25_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day25_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day25_part2(input));
  const part2After = performance.now();
  
  logSolution(25, 2022, part1Solution, part2Solution);
  
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
