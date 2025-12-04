import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2025;
const DAY = 3;

// solution path: /Users/hank/projects/advent-of-code-1/years/2025/03/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2025/03/data.txt
// problem url  : https://adventofcode.com/2025/day/3

async function p2025day3_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  return rows.reduce((acc, row) => {
    let max = -1;
    let index = -1;
    for (let i = 0; i < row.length - 1; i +=1) {
      const num = +row[i];
      if (num > max) {
        max = num;
        index = i;
      }
    }
    
    let max2 = -1;
    for (let i = row.length - 1; i > index; i-=1) {
      const num = +row[i];
      if (num > max2) {
        max2 = num;
      }
    }
    
    const num = Number(`${max}${max2}`)
    acc += num;
    return acc;
  }, 0);
}

async function p2025day3_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `987654321111111
811111111111119
234234234234278
818181911112111
`,
      expected: '357',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2025day3_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2025day3_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2025day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2025day3_part2(input));
  const part2After = performance.now();

  logSolution(3, 2025, part1Solution, part2Solution);

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
