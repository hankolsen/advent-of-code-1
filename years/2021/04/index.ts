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
  while (rows.length > 5) {
    rows.splice(0, 1);
    const board = rows.splice(0, 5).map((row) => {
      const [, ...numbers] = row.match(/(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/) || [];
      return numbers.map(Number);
    });
    let boardColumns: number[][] = [[]];
    for (let x = 0; x < 5; x += 1) {
      boardColumns[x] = [];
      for (let y = 0; y < 5; y += 1) {
        boardColumns[x].push(board[y][x]);
      }
    }
    boards.push({ board, boardColumns });
  }
  return boards;
};

async function p2021day4_part1(input: string, ...params: any[]) {
  const rows = getRows(input);
  const winningNumbers = rows.splice(0, 1)[0].split(',').map(Number);
  const boards = parseBoards(rows);
  let bingo = false;
  let count = 5;
  let winningBoardNumber = -1;
  let numbers: number[] = [];
  while (!bingo) {
    numbers = winningNumbers.slice(0, count);
    boards.forEach(({ board, boardColumns }, i) => {
      board.forEach((row) => {
        if (row.every((number) => numbers.includes(number))) {
          bingo = true;
          winningBoardNumber = i;
        }
      });
      boardColumns.forEach((column) => {
        if (column.every((number) => numbers.includes(number))) {
          bingo = true;
          winningBoardNumber = i;
        }
      });
    });
    count += 1;
  }
  const winningBoard = boards[winningBoardNumber];
  let unMarkedNumbers = 0;
  const winner = numbers[numbers.length - 1];
  winningBoard.board.forEach((row) => {
    row.forEach((cell) => {
      if (!numbers.includes(cell)) {
        unMarkedNumbers += cell;
      }
    });
  });
  return unMarkedNumbers * winner
}

async function p2021day4_part2(input: string, ...params: any[]) {
  return 'Not implemented';
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
  const part2tests: TestCase[] = [];
  
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
