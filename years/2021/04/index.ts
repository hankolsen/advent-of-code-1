import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 4;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/04/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/04/data.txt
// problem url  : https://adventofcode.com/2021/day/4

const parseBoards = (rows: string[]) => {
  const boards = [];
  while (rows.length > 4) {
    const board = rows.splice(0, 5).map((row) => row.split(/\s+/).filter((c) => c !== '').map(Number));
    boards.push(board);
  }
  return boards;
};

const horizontalWin = (board: number[][], numbers: number[]) => board.some((row) => row.every((number) => numbers.includes(number)));
const verticalWin = (board: number[][], numbers: number[]) => board.map((_, col) => board.map((row) => row[col])).some((c) => c.every((number) => numbers.includes(number)));
const checkBoard = (board: number[][], numbers: number[]) => horizontalWin(board, numbers) || verticalWin(board, numbers);

const play = (input: string, isPart2: boolean = false) => {
  const rows = getRows(input).filter((row) => row !== '');
  const winningNumbers = rows.shift()!.split(',').map(Number);
  const boards = parseBoards(rows);
  let winningNumber = -1;
  let winningBoard: number[][] = [];
  let drawnNumbers: number[];
  winningNumbers.some((number, index) => {
    drawnNumbers = winningNumbers.slice(0, index + 1);
    return boards.some((board, boardNumber) => {
      if (checkBoard(board, drawnNumbers)) {
        if (isPart2) {
          if (boards.length === 1) {
            winningNumber = number;
            winningBoard = board;
            return true;
          }
          boards.splice(boardNumber, 1);
        } else {
          winningNumber = number;
          winningBoard = board;
          return true;
        }
      }
    });
  });
  const unMarkedNumbers = winningBoard.reduce((acc, row) => {
    return acc + row.reduce((sum, cell) => {
      if (!drawnNumbers.includes(cell)) {
        sum += cell;
      }
      return sum;
    }, 0);
  }, 0);
  return unMarkedNumbers * winningNumber;
};

async function p2021day4_part1(input: string, ...params: any[]) {
  return play(input);
}

async function p2021day4_part2(input: string, ...params: any[]) {
  return play(input, true);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
      expected: '4512',
    },
  ];
  const part2tests: TestCase[] = [{
    input: `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`,
    expected: '1924',
  }];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day4_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day4_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2021day4_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2021day4_part2(input));
  const part2After = performance.now();
  
  logSolution(4, 2021, part1Solution, part2Solution);
  
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
