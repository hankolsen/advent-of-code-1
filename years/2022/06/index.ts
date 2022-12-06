import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRow } from '../../../util/input';

const YEAR = 2022;
const DAY = 6;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/06/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/06/data.txt
// problem url  : https://adventofcode.com/2022/day/6

async function p2022day6_part1(input: string, ...params: any[]) {
  const data = getRow(input);
  const result = data.match(/(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)(\w)(?!\1|\2|\3|\4)/) ?? [];
  return result.index! + 4;
}

async function p2022day6_part2(input: string, ...params: any[]) {
  const data = getRow(input);
  const result = data.match(/(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)(\w)(?!\1|\2|\3|\4)(\w)(?!\1|\2|\3|\4|\5)(\w)(?!\1|\2|\3|\4|\5|\6)(\w)(?!\1|\2|\3|\4|\5|\6|\7)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12|\13)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12|\13|\14)/) ?? [];
  return result.index! + 14;
}

async function run() {
  const part1tests: TestCase[] = [
    { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expected: '7' },
    { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected: '5' },
    { input: 'nppdvjthqldpwncqszvftbrmjlhg', expected: '6' },
    { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected: '10' },
    { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected: '11' },
  ];
  const part2tests: TestCase[] = [
    { input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb', expected: '19' },
    { input: 'bvwbjplbgvbhsrlpgdmjqwftvncz', expected: '23' },
    { input: 'nppdvjthqldpwncqszvftbrmjlhg', expected: '23' },
    { input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', expected: '29' },
    { input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', expected: '26' },
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day6_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day6_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day6_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day6_part2(input));
  const part2After = performance.now();
  
  logSolution(6, 2022, part1Solution, part2Solution);
  
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
