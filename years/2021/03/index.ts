import _, { parseInt } from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';
import getMostAndLeastCommonBits from './getMostAndLeastCommonBits';
import getGammaAndEpsilon from './getGammaAndEpsilon';

const YEAR = 2021;
const DAY = 3;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/03/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/03/data.txt
// problem url  : https://adventofcode.com/2021/day/3

async function p2021day3_part1(input: string, ...params: any[]) {
  const acc = getMostAndLeastCommonBits(getRows((input)));
  const { gamma, epsilon } = getGammaAndEpsilon(acc);
  return gamma * epsilon;
}

const checkColumn = (rows: string[], col: number) => {
  return rows.reduce((acc, row) => {
    const cellValue = Number(row.trim().split('')[col]);
    acc[cellValue] += 1;
    return acc;
  }, [0, 0]);
};

async function p2021day3_part2(input: string, ...params: any[]) {
  const rows = getRows(input).map((row) => row.trim());
  let oxygen = [...rows];
  let co2 = [...rows];
  
  for (let col = 0; col < oxygen[0].length; col += 1) {
    const [low, high] = checkColumn(oxygen, col);
    if (low > high) {
      oxygen = oxygen.filter((row) => Number(row.split('')[col]) === 0);
    } else {
      oxygen = oxygen.filter((row) => Number(row.split('')[col]) === 1);
    }
    if (oxygen.length === 1) {
      break;
    }
  }
  
  for (let col = 0; col < co2[0].length; col += 1) {
    const [low, high] = checkColumn(co2, col);
    if (low <= high) {
      co2 = co2.filter((row) => Number(row.split('')[col]) === 0);
    } else {
      co2 = co2.filter((row) => Number(row.split('')[col]) === 1);
    }
    if (co2.length === 1) {
      break;
    }
  }
  
  const o = parseInt(oxygen.join(''), 2);
  const c = parseInt(co2.join(''), 2);
  return c * o;
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
      expected: '198',
    },
  ];
  const part2tests: TestCase[] = [
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
      expected: '230',
    },
  ];
  
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
