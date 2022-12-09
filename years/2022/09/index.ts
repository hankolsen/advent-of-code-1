import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2022;
const DAY = 9;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/09/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/09/data.txt
// problem url  : https://adventofcode.com/2022/day/9

type Coordinate = [number, number];

const moves: Record<string, (c: Coordinate) => Coordinate> = {
  U: ([x, y]: Coordinate) => [x, y - 1],
  R: ([x, y]: Coordinate) => [x + 1, y],
  D: ([x, y]: Coordinate) => [x, y + 1],
  L: ([x, y]: Coordinate) => [x - 1, y],
};

const tailMoves: Record<string, string[]> = {
  '+,+': ['R', 'D'],
  '+,-': ['R', 'U'],
  '-,+': ['L', 'D'],
  '-,-': ['L', 'U'],
  '0,+': ['D'],
  '0,-': ['U'],
  '+,0': ['R'],
  '-,0': ['L'],
};

const moveTail = (head: Coordinate, tail: Coordinate) => {
  const xDiff = head[0] - tail[0] === 0 ? '0' : head[0] > tail[0] ? '+' : '-';
  const yDiff = head[1] - tail[1] === 0 ? '0' : head[1] > tail[1] ? '+' : '-';
  return tailMoves[`${xDiff},${yDiff}`];
};

const getInstructions = (input: string, snakeLength: number = 2) => {
  const rows = getRows(input);
  const instructions = rows.map((row) => {
    const [dir, steps] = row.split(' ');
    return { dir, steps: Number(steps) };
  });
  
  const visited = new Set();
  visited.add('0,0');
  
  const snake: Coordinate[] = Array(snakeLength).fill([0, 0]);
  
  return { instructions, visited, snake };
};

async function p2022day9_part1(input: string, ...params: any[]) {
  const { instructions, visited, snake } = getInstructions(input);

  let head = snake[0];
  let tail = snake[snake.length - 1];
  
  const moveHead = (dir: string, steps: number) => {
    for (let i = 1; i <= steps; i += 1) {
      head = moves[dir](head);
      let distance = [Math.abs(head[0] - tail[0]), Math.abs(head[1] - tail[1])];
      if (distance[0] > 1 || distance[1] > 1) {
        const tailMoves = moveTail(head, tail);
        tailMoves.forEach((dir: string) => {
          tail = moves[dir](tail);
        });
        visited.add(`${tail[0]},${tail[1]}`);
      }
    }
  };
  
  instructions.forEach(({ dir, steps }) => {
    moveHead(dir, steps);
  });
  
  return visited.size;
}

async function p2022day9_part2(input: string, ...params: any[]) {
  const { instructions, visited, snake } = getInstructions(input, 10);
  
  const moveBody = (first: Coordinate, second: Coordinate, index: number) => {
    let distance = [Math.abs(first[0] - second[0]), Math.abs(first[1] - second[1])];
    if (distance[0] > 1 || distance[1] > 1) {
      const tailMoves = moveTail(first, second);
      tailMoves.forEach((dir: string) => {
        snake[index] = moves[dir](snake[index]);
      });
      if (index === snake.length - 1) {
        visited.add(`${snake[snake.length - 1][0]},${snake[snake.length - 1][1]}`)
      } else {
        moveBody(snake[index], snake[index + 1], index + 1);
      }
    }
  };
  
  const moveHead = (dir: string, steps: number) => {
    for (let i = 1; i <= steps; i += 1) {
      snake[0] = moves[dir](snake[0]);
      
      moveBody(snake[0], snake[1], 1);
    }
  };
  
  instructions.forEach(({ dir, steps }) => {
    moveHead(dir, steps);
  });
  return visited.size;
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
      expected: '13',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
      expected: '1',
    },{
      input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
      expected: '36',
    }
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day9_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day9_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day9_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day9_part2(input));
  const part2After = performance.now();
  
  logSolution(9, 2022, part1Solution, part2Solution);
  
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
