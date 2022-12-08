import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getNumberRows, getRows } from '../../../util/input';

const YEAR = 2022;
const DAY = 8;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/08/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/08/data.txt
// problem url  : https://adventofcode.com/2022/day/8

async function p2022day8_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  const height = rows.length;
  const width = rows[0].length;
  const visible: Record<string, boolean> = {};
  
  const forest: Record<string, number> = {};
  rows.map((row, y) => {
    row.split('').map((tree, x) => {
      forest[`${y}-${x}`] = Number(tree);
    });
  });
  
  for (let x = 1; x < width - 1; x += 1) {
    // From top
    let topMin = forest[`0-${x}`];
    for (let y = 1; y < height - 1; y += 1) {
      if (forest[`${y}-${x}`] > topMin) {
        visible[`${y}-${x}`] = true;
        topMin = forest[`${y}-${x}`];
      }
    }
    
    // From bottom
    let bottomMin = forest[`${height - 1}-${x}`];
    for (let y = height - 2; y > 0; y -= 1) {
      if (forest[`${y}-${x}`] > bottomMin) {
        visible[`${y}-${x}`] = true;
        bottomMin = forest[`${y}-${x}`];
      }
    }
  }
  
  for (let y = 1; y < height - 1; y += 1) {
    // From left
    let leftMin = forest[`${y}-0`];
    for (let x = 1; x < width - 1; x += 1) {
      if (forest[`${y}-${x}`] > leftMin) {
        visible[`${y}-${x}`] = true;
        leftMin = forest[`${y}-${x}`];
      }
    }
    
    // From right
    let rightMin = forest[`${y}-${width - 1}`];
    for (let x = width - 2; x > 0; x -= 1) {
      if (forest[`${y}-${x}`] > rightMin) {
        visible[`${y}-${x}`] = true;
        rightMin = forest[`${y}-${x}`];
      }
    }
  }
  
  return Object.entries(visible).length + 2 * height + 2 * width - 4;
}

async function p2022day8_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `30373
25512
65332
33549
35390`,
      expected: '21',
    },
  ];
  const part2tests: TestCase[] = [];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day8_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day8_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day8_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day8_part2(input));
  const part2After = performance.now();
  
  logSolution(8, 2022, part1Solution, part2Solution);
  
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
