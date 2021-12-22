import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 12;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/12/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/12/data.txt
// problem url  : https://adventofcode.com/2021/day/12


const parseInput = (input: string) => {
  const paths = new Map<string, string[]>();
  getRows(input).map((row) => {
    const [start, stop] = row.split('-');
    paths.set(start, [...(paths.get(start) ?? []), stop]);
    paths.set(stop, [...(paths.get(stop) ?? []), start]);
  });
  return paths;
}

async function p2021day12_part1(input: string, ...params: any[]) {
  const paths = parseInput(input);
  const foundPaths = [];
  const findPath = (pos: string, current: string[]) => {
    if (pos === 'end') {
      foundPaths.push([...current, pos]);
      return;
    }
    const next = [...current, pos];
    // @ts-ignore
    for (const direction of paths.get(pos)) {
      if (direction.toLowerCase() !== direction || !current.includes(direction)) {
        findPath(direction, next);
      }
    }
  };

  findPath('start', []);
  return foundPaths.length;
}

async function p2021day12_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`,
      expected: '10'
    },
    {
      input: `
dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`,
      expected: '19'
    },
    {
      input: `
fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`,
      expected: '226'
    }
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
	    test.logTestResult(testCase, String(await p2021day12_part1(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
		  test.logTestResult(testCase, String(await p2021day12_part2(testCase.input, ...(testCase.extraArgs || []))));
	  }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day12_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day12_part2(input));
  const part2After = performance.now();

  logSolution(12, 2021, part1Solution, part2Solution);

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
