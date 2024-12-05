import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 5;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/05/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/05/data.txt
// problem url  : https://adventofcode.com/2024/day/5

async function p2024day5_part1(input: string, ...params: any[]) {
  const [rulesString, pagesString] = input.split('\n\n').map((x) => x.split('\n'));
  const rules = rulesString.map((rule) => rule.split('|').map(Number));
  const pagesSet = pagesString.map((pages) => pages.split(',').map(Number));
  const beforeOrder: Record<number, number[]> = {};
  const afterOrder: Record<number, number[]> = {};
  rules.forEach(([a, b]) => {
    beforeOrder[a] = beforeOrder[a] ? [...beforeOrder[a], b] : [b];
    afterOrder[b] = afterOrder[b] ? [...afterOrder[b], a] : [a];
  });
  return pagesSet.reduce((acc, pages) => {
    let pass = pages.every((page, i) => {
      let pass = true;
      if (i < pages.length - 1 && afterOrder[page]) {
        pass = pages.slice(i + 1).every((p) => {
          return !afterOrder[page].includes(p);
        });
      }

      if (i > 0 && beforeOrder[page]) {
        pass = pages.slice(0, i - 1).every((p) => {
          return !beforeOrder[page].includes(p);
        });
      }

      return pass;
    });
    if (pass) {
      acc += pages[Math.floor(pages.length / 2)];
    }
    return acc;
  }, 0);
}

async function p2024day5_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
      expected: '143',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day5_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day5_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day5_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day5_part2(input));
  const part2After = performance.now();

  logSolution(5, 2024, part1Solution, part2Solution);

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
