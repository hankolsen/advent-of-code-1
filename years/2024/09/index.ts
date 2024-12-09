import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { Unzip } from 'zlib';

const YEAR = 2024;
const DAY = 9;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/09/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/09/data.txt
// problem url  : https://adventofcode.com/2024/day/9

async function p2024day9_part1(input: string, ...params: any[]) {
  let j = 0;
  const blocks = input
    .split('')
    .map(Number)
    .reduce((acc: number[], x, i) => {
      if (i % 2 === 0) {
        acc.push(...Array(x).fill(j));
        j += 1;
      } else {
        acc.push(...Array(x));
      }
      return acc;
    }, []);
  blocks.forEach((block, i) => {
    if (block === undefined) {
      let x: number | undefined;
      while (x === undefined) {
        x = blocks.pop();
      }
      blocks[i] = x;
    }
  });
  return blocks.reduce((acc, block, i) => { 
    acc += block * i;
    return acc;
  }, 0)
  
}

async function p2024day9_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: '2333133121414131402',
      expected: '1928',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day9_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day9_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day9_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day9_part2(input));
  const part2After = performance.now();

  logSolution(9, 2024, part1Solution, part2Solution);

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
