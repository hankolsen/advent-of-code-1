import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 10;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/10/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/10/data.txt
// problem url  : https://adventofcode.com/2021/day/10
const openingTags = ['(', '[', '{', '<'];
const closingTags = [')', ']', '}', '>'];

async function p2021day10_part1(input: string, ...params: any[]) {
  const mismatches = getRows(input).reduce((acc: string[], row) => {
    const tags: string[] = [];
    row.split('').some((c) => {
      if (openingTags.includes(c)) {
        tags.push(c);
        return false;
      }
      
      const closingTagIndex = closingTags.findIndex((tag) => tag === c);
      const openingTag = tags.pop();
      const openingTagIndex = openingTags.findIndex((tag) => tag === openingTag);
      if (closingTagIndex !== openingTagIndex) {
        acc.push(c);
        return true;
      }
    });
    return acc;
  }, []);
  const tagsPoints: { [key: string]: number } = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };
  return mismatches.reduce((sum, tag) => {
    sum += tagsPoints[tag];
    return sum;
  }, 0);
}

async function p2021day10_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]
`,
      expected: '26397',
    },
  ];
  const part2tests: TestCase[] = [];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day10_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day10_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2021day10_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2021day10_part2(input));
  const part2After = performance.now();
  
  logSolution(10, 2021, part1Solution, part2Solution);
  
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
