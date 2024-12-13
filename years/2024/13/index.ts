import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 13;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/13/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/13/data.txt
// problem url  : https://adventofcode.com/2024/day/13

async function p2024day13_part1(input: string, ...params: any[]) {
  const machines = input.split('\n\n').map((machine) => {
    const [, ax, ay, bx, by, px, py] =
      machine.match(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/) ?? [];
    return { ax: Number(ax), ay: Number(ay), bx: Number(bx), by: Number(by), px: Number(px), py: Number(py) };
  });
  return machines.reduce((total, { ax, ay, bx, by, px, py }) => {
    for (let a = 1; a <= 100; a++) {
      for (let b = 1; b <= 100; b++) {
        if (a * ax + b * bx === px && a * ay + b * by === py) {
          return total + a * 3 + b;
        }
      }
    }
    return total;
  }, 0);
}

type Machine = { ax: number, ay: number, bx: number, by: number, px: number, py: number }

// ax * ta + bx * tb = px
// ay * ta + by * tb = px
// =>
// ta = (px - bx * tb) / ax, where ax !== 0
// ta = (px - by * tb) / ay, where ay !== 0
// =>
// (px - bx * tb) / ax = (py - by * tb) / ay, where ax !== 0, ay !== 0
// =>
// ay * (px - bx * tb) = ax * (px - by * tb)
// =>
// ay * px - ay * bx * tb = ax * py - ax * by * tb
// ay * px - ax * py = ay * bx * tb - ax * by * tb
// =>
// tb = (ay * px - ax * py) / (ay * bx - ax * by), where ay !== 0, bx !== 0, ax !== 0, by != 0
const minTokensToWin = ({ ax, ay, bx, by, px, py }: Machine) => {
  if ([ax, ay, bx, by].some((v) => v === 0)) {
    return null;
  }
  const tb = Math.floor((ay * px - ax * py) / (ay * bx - ax * by));
  const ta = Math.floor((px - bx * tb) / ax);
  return ax * ta + bx * tb === px && ay * ta + by * tb === py ? { ta, tb } : null;
};

const minCostToWin = (machine: Machine) => {
  const tokens = minTokensToWin(machine);
  return tokens ? tokens.ta * 3 + tokens.tb : 0;
}

async function p2024day13_part2(input: string, ...params: any[]) {
  const machines = input.split('\n\n').map((machine) => {
    const [, ax, ay, bx, by, px, py] =
      machine.match(/Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/) ?? [];
    return { ax: Number(ax), ay: Number(ay), bx: Number(bx), by: Number(by), px: Number(px) + 10000000000000, py: Number(py) + 10000000000000 };
  });
  return machines.reduce((total, machine) => total + minCostToWin(machine), 0);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
      expected: '480',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
      expected: '480',
    },

  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day13_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day13_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day13_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day13_part2(input));
  const part2After = performance.now();

  logSolution(13, 2024, part1Solution, part2Solution);

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
