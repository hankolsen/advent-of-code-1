import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 4;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/04/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/04/data.txt
// problem url  : https://adventofcode.com/2024/day/4

const countMatches = (input: string[]) => {
  return input.reduce((acc, x) => {
    let matches = x.match(/XMAS/g);
    acc += matches?.length ?? 0;
    matches = x.match(/SAMX/g);
    acc += matches?.length ?? 0;
    return acc;
  }, 0);
};

async function p2024day4_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  const columns = Object.keys(rows[0])
    .map(Number)
    .map((index) => rows.map((row) => row[index]).join(''));

  const diagonals = [];
  for (let k = 0; k < rows.length * 2 - 1; k++) {
    let diagonal = '';
    for (let j = 0; j <= k; j++) {
      const i = k - j;
      if (i < rows.length && j < rows.length) {
        diagonal += rows[j][i];
      }
    }
    if (diagonal.length > 3) {
      diagonals.push(diagonal);
    }
  }

  for (let k = 0; k < rows.length * 2 - 1; k++) {
    let diagonal = '';
    for (let j = 0; j <= k; j++) {
      const i = k - j;
      if (i < rows.length && j < rows.length) {
        diagonal += rows[i][rows.length - j - 1];
      }
    }
    if (diagonal.length > 3) {
      diagonals.push(diagonal);
    }
  }

  return countMatches(rows) + countMatches(columns) + countMatches(diagonals);
}

async function p2024day4_part2(input: string, ...params: any[]) {
  const rows = getRows(input);

  return rows.reduce((acc, row, y) => {
    if (y > 0 && y < rows.length - 1) {
      row.split('').forEach((cell, x) => {
        if (x > 0 && x < row.length - 1) {
          if (cell === 'A') {
            const corners = `${rows[y - 1][x - 1]}${rows[y + 1][x + 1]}${rows[y - 1][x + 1]}${rows[y + 1][x - 1]}`;
            if (['MSMS', 'SMSM', 'MSSM', 'SMMS'].includes(corners)) {
              acc += 1;
            }
          }
        }
      });
    }
    return acc;
  }, 0);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
      expected: '18',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
      expected: '9',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day4_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day4_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day4_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day4_part2(input));
  const part2After = performance.now();

  logSolution(4, 2024, part1Solution, part2Solution);

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
