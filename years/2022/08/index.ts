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

const getForest = (input: string) => {
  const data = getRows(input);
  const height = data.length;
  const width = data[0].length;
  const rows = data.map((row) => row.split('').map(Number));
  const columns = rows[0].map((col, i) => rows.map((x) => x[i]));
  return { rows, columns, height, width, forest: data };
};

async function p2022day8_part1(input: string, ...params: any[]) {
  const { rows, columns, height, width, forest } = getForest(input);
  
  const isLower = (val: number) => {
    return (tree: number) => tree < val;
  };
  
  return rows.reduce((acc, row, y) => {
    columns.forEach((col, x) => {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        return acc += 1;
      }
      
      const tree = Number(forest[y][x]);
      const isVisible = [
        rows[y].slice(0, x).every(isLower(tree)),
        rows[y].slice(x + 1).every(isLower(tree)),
        columns[x].slice(0, y).every(isLower(tree)),
        columns[x].slice(y + 1).every(isLower(tree)),
      ].some(x => x);
      acc += isVisible ? 1 : 0;
    });
    
    return acc;
  }, 0)
}

async function p2022day8_part2(input: string, ...params: any[]) {
  const { rows, columns, height, width, forest } = getForest(input);
  
  const findNumberOfLower = (val: number) => {
    return (acc: number, tree: number, i: number, arr: number[]) => {
      acc += 1;
      if (tree >= val) {
        arr.splice(1);
      }
      return acc;
    };
  };
  
  return rows.reduce((max, row, y) => {
    columns.forEach((col, x) => {
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        return max;
      }
      
      const tree = Number(forest[y][x]);
      
      const visibleProduct = [
        rows[y].slice(0, x).reverse().reduce(findNumberOfLower(tree), 0),
        rows[y].slice(x + 1).reduce(findNumberOfLower(tree), 0),
        columns[x].slice(0, y).reverse().reduce(findNumberOfLower(tree), 0),
        columns[x].slice(y + 1).reduce(findNumberOfLower(tree), 0),
      ].reduce((acc, count) => {
        acc *= count;
        return acc;
      }, 1);
      
      max = Math.max(max, visibleProduct);
    });
    return max;
  }, -1);
  
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
  const part2tests: TestCase[] = [
    {
      input: `30373
25512
65332
33549
35390`,
      expected: '8',
    },
  ];
  
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
