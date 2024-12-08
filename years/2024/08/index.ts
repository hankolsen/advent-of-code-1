import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 8;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/08/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/08/data.txt
// problem url  : https://adventofcode.com/2024/day/8

const findMatchingCells = (grid: string[][], cell: string, y: number, x: number) => {
  let coords = [];
  for (let yy = y; yy < grid.length; yy += 1) {
    for (let xx = 0; xx < grid[0].length; xx += 1) {
      if (yy === y && xx <= x) {
        continue;
      }
      if (grid[yy][xx] === cell) {
        coords.push({ y: yy, x: xx });
      }
    }
  }

  return coords;
};

async function p2024day8_part1(input: string, ...params: any[]) {
  const grid = getRows(input).map((row) => row.split(''));
  const antinodes: Record<string, boolean> = {};
  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== '.') {
        const matchingCells = findMatchingCells(grid, cell, y, x);
        matchingCells.forEach((matchingCell) => {
          const dx = matchingCell.x - x;
          const dy = matchingCell.y - y;
          let newY = y - dy;
          let newX = x - dx;
          if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
            antinodes[`${newX},${newY}`] = true;
          }
          newY = matchingCell.y + dy;
          newX = matchingCell.x + dx;
          if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
            antinodes[`${newX},${newY}`] = true;
          }
        });
      }
    });
  });

  //console.log({ antinodes });
  return Object.keys(antinodes).length;
}

async function p2024day8_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
      expected: '14',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day8_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day8_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day8_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day8_part2(input));
  const part2After = performance.now();

  logSolution(8, 2024, part1Solution, part2Solution);

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
