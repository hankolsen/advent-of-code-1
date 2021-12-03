import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 3;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/03/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/03/data.txt
// problem url  : https://adventofcode.com/2021/day/3

async function p2021day3_part1(input: string, ...params: any[]) {
  const arr = getRows(input).map((row) => row.trim().split(''));
  const acc: number[][] = [];
  for (let col = 0;  col < arr[0].length; col += 1) {
    acc.push([0, 0]);
    arr.forEach((row) => {
      acc[col][Number(row[col])] += 1;
    })
  }
  const { g, e } = acc.reduce(({ g, e}, entry) => {
    if (entry[0] >  entry[1]) {
      g.push('0');
      e.push('1');
    } else {
      g.push('1');
      e.push('0');
    }
    return { g, e }
  }, {g: [''], e: ['']});
  const gamma = parseInt(g.join(''), 2);
  const epsilson = parseInt(e.join(''), 2);
  return gamma * epsilson;
}

async function p2021day3_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
        00100
        11110
        10110
        10111
        10101
        01111
        00111
        11100
        10000
        11001
        00010
        01010
      `,
      expected: '198'
    }
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
	    test.logTestResult(testCase, String(await p2021day3_part1(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
		  test.logTestResult(testCase, String(await p2021day3_part2(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day3_part2(input));
  const part2After = performance.now();

  logSolution(3, 2021, part1Solution, part2Solution);

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
