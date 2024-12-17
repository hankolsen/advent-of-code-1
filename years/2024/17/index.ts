import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 17;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/17/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/17/data.txt
// problem url  : https://adventofcode.com/2024/day/17

async function p2024day17_part1(input: string, ...params: any[]) {
  const [registersRaw, programRaw] = input.split('\n\n');
  let [A, B, C] = registersRaw.split('\n').map((reg) => {
    const [_, num] = reg.match(/(\d+)/) ?? [];
    return Number(num);
  });
  const program = (programRaw.match(/(\d+)/g) ?? []).map(Number);

  let pointer = 0;
  let output: number[] = [];

  const getComboOp = (pointer: number) => {
    const value = program[pointer + 1];
    if (value < 4) {
      return value;
    }
    if (value === 4) {
      return A;
    }
    if (value === 5) {
      return B;
    }
    if (value === 6) {
      return C;
    }
    throw new Error('Invalud value');
  };

  while (pointer < program.length) {
    const instruction = program[pointer];
    switch (instruction) {
      case 0:
        A = Math.trunc(A / 2 ** getComboOp(pointer));
        break;
      case 1:
        B = B ^ program[pointer + 1];
        break;
      case 2:
        B = getComboOp(pointer) % 8;
        break;
      case 3:
        if (A > 0) {
          pointer = program[pointer + 1] - 2;
        }
        break;
      case 4:
        B = B ^ C;
        break;
      case 5:
        output.push(getComboOp(pointer) % 8);
        break;
      case 6:
        B = Math.trunc(A / 2 ** getComboOp(pointer));
        break;
      case 7:
        C = Math.trunc(A / 2 ** getComboOp(pointer));
        break;
    }
    pointer += 2;
  }
  return output.join(',');
}

async function p2024day17_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `Register A: 0
Register B: 0
Register C: 9

Program: 2,6`,
      expected: '',
    },
    {
      input: `Register A: 0
Register B: 29
Register C: 0

Program: 1,7`,
      expected: '',
    },
    {
      input: `Register A: 0
Register B: 2024
Register C: 43690

Program: 4,0`,
      expected: '',
    },
    {
      input: `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`,
      expected: '0,1,2',
    },
    {
      input: `Register A: 2024
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
      expected: '4,2,5,6,7,7,7,7,3,1,0',
    },
    {
      input: `Register A: 10
Register B: 0
Register C: 0

Program: 5,0,5,1,5,4`,
      expected: '0,1,2',
    },
    {
      input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
      expected: '4,6,3,5,6,3,5,2,1,0',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day17_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day17_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day17_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day17_part2(input));
  const part2After = performance.now();

  logSolution(17, 2024, part1Solution, part2Solution);

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
