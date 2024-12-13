import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2024;
const DAY = 12;

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

const inRange = (grid: string[][], x: number, y: number) => {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
};

const dfs = (
  grid: string[][],
  x: number,
  y: number,
  visited: Set<string>,
  isValidMove: (grid: string[][], x: number, y: number) => boolean,
  onMove: (grid: string[][], x: number, y: number, visited: Set<string>) => void,
) => {
  onMove(grid, x, y, visited);
  visited.add(`${x},${y}`);
  dirs.forEach(([dx, dy]) => {
    const [nextX, nextY] = [x + dx, y + dy];
    if (!visited.has(`${nextX},${nextY}`) && inRange(grid, nextX, nextY) && isValidMove(grid, nextX, nextY)) {
      dfs(grid, nextX, nextY, visited, isValidMove, onMove);
    }
  });
};

const measure = (grid: string[][], x: number, y: number, visited: Set<string>) => {
  const regionId = grid[y][x];
  let perimiter = 0;
  let region = 0;
  const dirToFences = new Map();

  dfs(
    grid,
    x,
    y,
    visited,
    (grid: string[][], x: number, y: number) => grid[y][x] === regionId,
    (grid: string[][], x: number, y: number, visited: Set<string>) => {
      if (visited.has(`${x},${y}`)) {
        return;
      }
      if (grid[y][x] === regionId) {
        region += 1;
      }
      dirs.forEach(([dx, dy]) => {
        if (grid[y + dy]?.[x + dx] !== regionId) {
          perimiter += 1;

          const dirHash = `${dx},${dy}`;
          if (!dirToFences.has(dirHash)) {
            dirToFences.set(dirHash, []);
          }
          dirToFences.get(dirHash).push([x + dx, y + dy]);
        }
      });
    },
  );

  return {
    perimiter,
    region,
  };
};

// solution path: /Users/hank/projects/advent-of-code-1/years/2024/12/index.ts
// data path    : /Users/hank/projects/advent-of-code-1/years/2024/12/data.txt
// problem url  : https://adventofcode.com/2024/day/12
async function p2024day12_part1(input: string, ...params: any[]) {
  const grid = input.split('\n').map((row) => row.split(''));
  const visited = new Set<string>();
  return grid.reduce((sum, row, y) => {
    row.forEach((cell, x) => {
      const { region, perimiter } = measure(grid, x, y, visited);
      sum += region * perimiter;
    });
    return sum;
  }, 0);
}

async function p2024day12_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `AAAA
BBCD
BBCC
EEEC`,
      expected: '140',
    },
    {
      input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
      expected: '772',
    },
    {
      input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
      expected: '1930',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2024day12_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2024day12_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2024day12_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2024day12_part2(input));
  const part2After = performance.now();

  logSolution(12, 2024, part1Solution, part2Solution);

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
