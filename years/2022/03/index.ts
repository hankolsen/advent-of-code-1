import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution, trace } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows, getRowsAsArrays } from '../../../util/input';

const YEAR = 2022;
const DAY = 3;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/03/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/03/data.txt
// problem url  : https://adventofcode.com/2022/day/3

const getCharacterValue = (character: string) => {
  let diff = 38;
  if (character.match(/[a-z]/)) {
    diff = 96;
  }
  return character.charCodeAt(0) - diff;
};
async function p2022day3_part1(input: string, ...params: any[]) {
  const rows = getRowsAsArrays(input);

  return rows.reduce((acc, row) => {
    const size = row.length;
    const [first, second] = [row.slice(0, size / 2), row.slice(size / 2)];
    first.some((letter) => {
      if (second.includes(letter)) {
        acc += getCharacterValue(letter);
        return true;
      }
    });
    return acc;
  }, 0);
}

async function p2022day3_part2(input: string, ...params: any[]) {
  const rows = getRowsAsArrays(input);

  let group: string[][] = [];
  const groups = rows.reduce((acc: string[][][], row, i) => {
    group.push(row);
    if ((i + 1) % 3 === 0) {
      acc.push(group);
      group = [];
    }
    return acc;
  }, []);

  return groups.reduce((acc, group) => {
    group[0].some((letter) => {
      if (group[1].includes(letter) && group[2].includes(letter)) {
        acc += getCharacterValue(letter);
        return true;
      }
    });
    return acc;
  }, 0);
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
      expected: '157',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
      expected: '70',
    },
  ];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day3_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day3_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2022day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2022day3_part2(input));
  const part2After = performance.now();

  logSolution(3, 2022, part1Solution, part2Solution);

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
