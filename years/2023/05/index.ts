import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';
import { findClosestLocation } from './findClosestLocation';

const YEAR = 2023;
const DAY = 5;

// solution path: /Users/hank/projects/advent-of-code-1/years/2023/05/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2023/05/data.txt
// problem url  : https://adventofcode.com/2023/day/5

async function p2023day5_part1(input: string, ...params: any[]) {
  return findClosestLocation(input.split('\n\n'));
}

async function p2023day5_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [{
    input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
    expected: '35'
  }];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
	    test.logTestResult(testCase, String(await p2023day5_part1(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
		  test.logTestResult(testCase, String(await p2023day5_part2(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2023day5_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2023day5_part2(input));
  const part2After = performance.now();

  logSolution(5, 2023, part1Solution, part2Solution);

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
