import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2021;
const DAY = 7;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/07/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/07/data.txt
// problem url  : https://adventofcode.com/2021/day/7

async function p2021day7_part1(input: string, ...params: any[]) {
  const crabs = input.split(',').map(Number);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  const positions = Array(max - min + 1).fill(0);
  const fuelCosts = positions
    .map((_, i) => crabs
      .map((crab) => Math.abs(crab - i))
      .reduce((a, b) => a + b, 0));
  return Math.min(...fuelCosts);
}

async function p2021day7_part2(input: string, ...params: any[]) {
  const crabs = input.split(',').map(Number);
  const min = Math.min(...crabs);
  const max = Math.max(...crabs);
  const sum = (n: number) => (n * (n + 1)) / 2;
  const positions = Array(max - min + 1).fill(0);
  const fuelCosts = positions
    .map((_, i) => crabs
      .map((crab) => sum(Math.abs(crab - i)))
      .reduce((a, b) => a + b, 0));
  return Math.min(...fuelCosts);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `16,1,2,0,4,2,7,1,2,14`,
      expected: '37',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `16,1,2,0,4,2,7,1,2,14`,
      expected: '168',
    },
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day7_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day7_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2021day7_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2021day7_part2(input));
  const part2After = performance.now();
  
  logSolution(7, 2021, part1Solution, part2Solution);
  
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
