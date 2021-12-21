import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 21;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/21/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/21/data.txt
// problem url  : https://adventofcode.com/2021/day/21

const parseInput = (input: string) => getRows(input).map((row) => row.match(/\d$/g) ?? []).map((pos) => {
  return { pos: Number(pos), points: 0 }
});
const move = (startingPos: number, steps: number) => (startingPos + steps - 1) % 10 + 1;
let timesRolled: number;
const rollDie = () => Array(3).fill(1).reduce((dice) => {
  timesRolled += 1;
  dice += ((timesRolled - 1) % 100) + 1;
  return dice;
}, 0);

async function p2021day21_part1(input: string, ...params: any[]) {
  const players = parseInput(input);
  let found = false;
  timesRolled = 0;
  while (!found) {
    for (const player of [0, 1]) {
      let { pos, points } = players[player];
      pos = move(pos, rollDie());
      points += pos;
      players[player] = { pos, points };
      if (points >= 1000) {
        found = true;
        break;
      }
    }
  }

  const loser = players.find(({ points }) => points < 1000);
  return loser!.points * timesRolled;
}

async function p2021day21_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
Player 1 starting position: 4
Player 2 starting position: 8
`,
      expected: '739785',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day21_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day21_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day21_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day21_part2(input));
  const part2After = performance.now();

  logSolution(21, 2021, part1Solution, part2Solution);

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
