import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import { getRows } from '../../../util/input';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 1;

const getColumns = (input: string) => {
  const rows = getRows(input);
  return rows.reduce(
    (acc: { a: number[]; b: number[] }, row) => {
      const [a, b] = row.split(/\s+/);
      acc['a'].push(Number(a));
      acc['b'].push(Number(b));
      acc['a'].sort();
      acc['b'].sort();
      return acc;
    },
    { a: [], b: [] },
  );
};
// solution path: /Users/hank/projects/advent-of-code-1/years/2024/01/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/01/data.txt
// problem url  : https://adventofcode.com/2024/day/1

async function p2024day1_part1(input: string, ...params: any[]) {
  const columns = getColumns(input);
  return columns['a'].reduce((acc, num, i) => {
    acc += Math.abs(num - columns['b'][i]);
    return acc;
  }, 0);
}

async function p2024day1_part2(input: string, ...params: any[]) {
  const columns = getColumns(input);
  return columns['a'].reduce((prod, a) => {
    let count = 0;
    columns['b'].some((b) => {
      if (b < a) {
        return false;
      }
      if (a === b) {
        count += 1;
        return false;
      }
      if (b > a) {
        return true;
      }
    });
    prod += a * count;
    return prod;
  }, 0);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `3   4
4   3
2   5
1   3
3   9
3   3`,
      expected: '11',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `3   4
4   3
2   5
1   3
3   9
3   3`,
      expected: '31',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day1_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day1_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day1_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day1_part2(input));
  const part2After = performance.now();

  logSolution(1, 2024, part1Solution, part2Solution);

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
