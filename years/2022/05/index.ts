import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';

const YEAR = 2022;
const DAY = 5;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/05/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/05/data.txt
// problem url  : https://adventofcode.com/2022/day/5

type Crates = Record<number, string[]>;

const getCratesAndInstructions = (input: string) => {
  const [stacks, procedure] = input.split('\n\n').map((r) => r.split('\n'));
  
  const crates = stacks.reduce((acc: Crates, line) => {
    let index = 0;
    const row = line.split('');
    while (row.length) {
      const crate = row.splice(0, 4).join('').trim();
      if (crate) {
        const [, content] = crate.match(/\[(\w)]/) ?? [];
        acc[index] = acc[index] ? [...acc[index], content] : [content];
      }
      index += 1;
    }
    return acc;
  }, {});
  
  const instructions = procedure.slice(0, procedure.length - 1).map((move) => {
    const [, count, from , to] = move.match(/move (\d+) from (\d+) to (\d+)/) ?? [];
    return { count: Number(count), from: Number(from) - 1, to: Number(to) - 1 };
  })
  
  return { crates, instructions };
};

const getTopCrates = (crates: Crates) => {
  return Object.values(crates).reduce((acc, col) => {
    if (col[0]) {
      acc += col[0];
    }
    return acc;
  }, '')
};

async function p2022day5_part1(input: string, ...params: any[]) {
  const { crates, instructions } = getCratesAndInstructions(input);
  
  instructions.forEach(({ count, from, to }) => {
    crates[to].unshift(...crates[from].splice(0, count).reverse());
  });
  
  return getTopCrates(crates);
}

async function p2022day5_part2(input: string, ...params: any[]) {
  const { crates, instructions } = getCratesAndInstructions(input);

  instructions.forEach(({ count, from, to }) => {
    crates[to].unshift(...crates[from].splice(0, count));
  });
  
  return getTopCrates(crates);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`, expected: 'CMZ'
    }
  ];
  const part2tests: TestCase[] = [
    {
      input: `    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`, expected: 'MCD'
    }
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
	    test.logTestResult(testCase, String(await p2022day5_part1(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
		  test.logTestResult(testCase, String(await p2022day5_part2(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2022day5_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2022day5_part2(input));
  const part2After = performance.now();

  logSolution(5, 2022, part1Solution, part2Solution);

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
