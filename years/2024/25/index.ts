import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 25;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/25/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/25/data.txt
// problem url  : https://adventofcode.com/2024/day/25

async function p2024day25_part1(input: string, ...params: any[]) {
  const { keys, locks } = input
    .split('\n\n')
    .map((item) => item.split('\n'))
    .reduce(
      (acc: Record<string, number[][]>, item) => {
        let type = item[0] === '#####' ? 'locks' : 'keys';
        if (type === 'locks') {
          item.splice(0, 1);
        } else {
          item.splice(item.length - 1, 1);
        }
        let columns = [0, 0, 0, 0, 0];
        item.forEach((row) => {
          row.split('').forEach((col, i) => {
            if (col === '#') {
              columns[i] += 1;
            }
          });
        });
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(columns);
        return acc;
      },
      { keys: [], locks: [] },
    );

  return keys.reduce((matches, key) => {
    locks.forEach((lock) => {
      const match = lock.every((col, i) => {
        return col + key[i] <= 5;
      });
      if (match) {
        matches += 1;
      }
    });
    return matches;
  }, 0);
}

async function p2024day25_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`,
      expected: '3',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day25_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day25_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day25_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day25_part2(input));
  const part2After = performance.now();

  logSolution(25, 2024, part1Solution, part2Solution);

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
