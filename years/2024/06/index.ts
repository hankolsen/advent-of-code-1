import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2024;
const DAY = 6;

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/06/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/06/data.txt
// problem url  : https://adventofcode.com/2024/day/6

async function p2024day6_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  let pos: Record<string, number> = {};
  let dir: { x: number; y: number } = { x: 0, y: -1 };
  const grid = rows.reduce((grid: string[][], row, y) => {
    grid[y] = [];
    row.split('').forEach((cell, x) => {
      grid[y][x] = cell;
      if (cell === '^') {
        pos = { x, y };
      }
    });
    return grid;
  }, []);

  const dirs: Record<string, { x: number; y: number }> = {
    '-1,0': { x: 1, y: 0 },
    '0,1': { x: 0, y: 1 },
    '1,0': { x: -1, y: 0 },
    '0,-1': { x: 0, y: -1 },
  };

  const visited: Record<string, boolean> = { [`${pos.y},${pos.x}`]: true };

  const rotate = (dir: { x: number; y: number }) => dirs[`${dir.y},${dir.x}`];

  const walk = () => {
    let { x, y } = { x: pos.x + dir.x, y: pos.y + dir.y };

    if (x < 0 || x > grid[0].length - 1 || y < 0 || y > grid.length - 1) {
      return true;
    }

    const cell = grid[y][x];
    if (cell === '.' || cell === '^') {
      visited[`${y},${x}`] = true;
      pos = { x, y };
      return false;
    }

    if (cell === '#') {
      x = pos.x;
      y = pos.y;
      dir = rotate(dir);
      return false;
    }

    return true;
  };

  let done = false;
  while (!done) {
    done = walk();
  }
  return Object.keys(visited).length;
}

async function p2024day6_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`,
      expected: '41',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day6_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day6_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day6_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day6_part2(input));
  const part2After = performance.now();

  logSolution(6, 2024, part1Solution, part2Solution);

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
