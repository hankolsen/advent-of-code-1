import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 14;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/14/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/14/data.txt
// problem url  : https://adventofcode.com/2021/day/14

async function p2021day14_part1(input: string, ...params: any[]) {
  const [first, , ...rest] = getRows(input);
  let template = first.split('');
  const rules = rest.reduce((acc: { [key: string]: string }, entry) => {
    const [rule, result] = entry.split(' -> ');
    acc[rule] = result;
    return acc;
  }, {});
  for (let i = 0; i < 10; i += 1) {
    let index = 0;
    while (index < template.length - 1) {
      const char = template[index];
      const pair = `${char}${template[index + 1]}`;
      const res = rules[pair];
      template = [...template.slice(0, index + 1), res, ...template.slice(index + 1)];
      index += 2;
    }
  }

  const counts = template.reduce((acc: { [key: string]: number }, e) => {
    acc[e] = acc[e] ? acc[e] + 1 : 1;
    return acc;
  }, {});

  const max = Math.max(...Object.values(counts));
  const min = Math.min(...Object.values(counts));
  return max - min;
}

async function p2021day14_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`,
      expected: '1588',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day14_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day14_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day14_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day14_part2(input));
  const part2After = performance.now();

  logSolution(14, 2021, part1Solution, part2Solution);

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
