import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2022;
const DAY = 11;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/11/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/11/data.txt
// problem url  : https://adventofcode.com/2022/day/11

const parseInput = (input: string) => {
  const monkeys: Record<number, { items: number[], operation: string, test: number, trueTo: number, falseTo: number }> = {};
  input.split('\n\n').forEach((rows) => {
    const [, monkey] = rows.match(/Monkey (\d+)/) ?? [];
    const [, numbers] = rows.match(/Starting items: (.*)\n/) ?? [];
    const items = numbers.split(',').map(Number);
    const [, operation] = rows.match(/Operation: new = (.+)/) ?? [];
    const [, test] = rows.match(/Test: divisible by (\d+)/) ?? [];
    const [, trueTo] = rows.match(/If true: throw to monkey (\d+)/) ?? [];
    const [, falseTo] = rows.match(/If false: throw to monkey (\d+)/) ?? [];
    monkeys[Number(monkey)] = {
      items,
      operation,
      test: Number(test),
      trueTo: Number(trueTo),
      falseTo: Number(falseTo),
    };
  });
  return monkeys;
};

async function p2022day11_part1(input: string, ...params: any[]) {
  const monkeys = parseInput(input);
  const inspections: Record<number, number> = {};
  
  for (let round = 1; round <= 20; round += 1) {
    let monkey = 0;
    while (monkey < Object.entries(monkeys).length) {
      const { items, operation, test, trueTo, falseTo } = monkeys[monkey];
      while (items.length) {
        inspections[monkey] = inspections[monkey] ? inspections[monkey] += 1 : 1;
        const item = items.shift();
        let worryLevel = Math.floor(eval(operation.replace(/old/g, item!.toString())) / 3);
        if (worryLevel % test === 0) {
          monkeys[trueTo].items.push(worryLevel);
        } else {
          monkeys[falseTo].items.push(worryLevel);
        }
      }
      monkey += 1;
    }
  }
  const sorted = Object.entries(inspections).sort(([monkeyA, countA], [monkeyB, countB]) => countB - countA);
  return (sorted.slice(0, 2).reduce((prod, [, count]) => {
    prod *= count;
    return prod;
  }, 1));
}

async function p2022day11_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`,
      expected: '10605',
    },
  ];
  const part2tests: TestCase[] = [];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day11_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day11_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day11_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day11_part2(input));
  const part2After = performance.now();
  
  logSolution(11, 2022, part1Solution, part2Solution);
  
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
