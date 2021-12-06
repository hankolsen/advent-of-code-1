import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 6;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/06/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/06/data.txt
// problem url  : https://adventofcode.com/2021/day/6

const simulate = (input: string, steps: number) => {
  const fishes = new Array(9).fill(0);
  input.split(',').map(Number).forEach((fish) => {
    fishes[fish] += 1;
  })
  for (let step = 1; step <= steps; step += 1) {
    const babies = fishes.shift();
    fishes[6] += babies;
    fishes.push(babies);
  }
  return fishes.reduce((acc, fish) => acc + fish, 0);
}

async function p2021day6_part1(input: string, ...params: any[]) {
  return simulate(input, 80);
}

async function p2021day6_part2(input: string, ...params: any[]) {
  return simulate(input, 256);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `3,4,3,1,2`,
      expected: '5934'
    }
  ];
  const part2tests: TestCase[] = [{
    input: `3,4,3,1,2`,
    expected: '26984457539'
  }];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
	    test.logTestResult(testCase, String(await p2021day6_part1(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
		  test.logTestResult(testCase, String(await p2021day6_part2(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day6_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day6_part2(input));
  const part2After = performance.now();

  logSolution(6, 2021, part1Solution, part2Solution);

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
