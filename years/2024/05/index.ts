import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 5;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/05/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/05/data.txt
// problem url  : https://adventofcode.com/2024/day/5

const getRulesAndUpdates = (input: string) => {
  const rows = getRows(input);
  const rules: Record<number, number[]> = {};
  const updates: number[][] = [];
  rows.forEach((row) => {
    if (row.includes('|')) {
      const [prevPage, page] = row.split('|').map(Number);
      rules[page] = rules[page] ? [...rules[page], prevPage] : [prevPage];
    } else if (row) {
      updates.push(row.split(',').map(Number));
    }
  });

  return { rules, updates };
};

const isValidUpdate = (update: number[], rules: Record<number, number[]>) =>
  update.every((page) => (rules[page] ?? []).every((prevPage) => update.indexOf(prevPage) <= update.indexOf(page)));

const findRightPlace = (pages: number[], page: number, rules: Record<number, number[]>) => {
  const prevIndices = (rules[page] ?? []).map((p) => pages.indexOf(p));
  const targetIndex = Math.max(...prevIndices);
  return targetIndex > pages.indexOf(page) ? pages[targetIndex] : 0;
};

const movePage = (pages: number[], page: number, targetPage: number) => {
  pages.splice(pages.indexOf(page), 1);
  pages.splice(pages.indexOf(targetPage) + 1, 0, page);
};

async function p2024day5_part1(input: string, ...params: any[]) {
  const { rules, updates } = getRulesAndUpdates(input);
  return updates.reduce((acc, update) => {
    if (isValidUpdate(update, rules)) {
      acc += update[Math.floor(update.length / 2)];
    }
    return acc;
  }, 0);
}

async function p2024day5_part2(input: string, ...params: any[]) {
  const { rules, updates } = getRulesAndUpdates(input);

  return updates.reduce((acc, update) => {
    if (!isValidUpdate(update, rules)) {
      [...update].forEach((page) => {
        const targetPage = findRightPlace(update, page, rules);
        if (targetPage) {
          movePage(update, page, targetPage);
        }
      });
      acc += update[Math.floor(update.length / 2)];
    }
    return acc;
  }, 0);
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
  const part2tests: TestCase[] = [
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
      expected: '123',
    },
  ];

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
