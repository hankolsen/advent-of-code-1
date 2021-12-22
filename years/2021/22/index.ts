import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2021;
const DAY = 22;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2021/22/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2021/22/data.txt
// problem url  : https://adventofcode.com/2021/day/22

const parseInput = (input: string) => {
  return getRows(input).map((row) => {
    const [, setting, x1, x2, y1, y2, z1, z2] = row.match(/(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/) ?? [];
    return {
      setting: setting === 'on', x1: Number(x1), x2: Number(x2), y1: Number(y1), y2: Number(y2), z1: Number(z1), z2: Number(z2),
    };
  });
};

const k = (x: number, y: number, z: number) => `${x},${y},${z}`;
const isWithinLimits = (numbers: number[], limit: number) => numbers.every((n) => Math.abs(n) <= limit)

async function p2021day22_part1(input: string, ...params: any[]) {
  const instructions = parseInput(input);
  const grid = instructions.reduce((grid, { setting, x1, x2, y1, y2, z1, z2 }) => {
    if (!isWithinLimits([x1, x2, y1, y2, z1, z2], 50)) {
      return grid;
    }
    for (let x = x1; x <= x2; x += 1) {
      for (let y = y1; y <= y2; y += 1) {
        for (let z = z1; z <= z2; z += 1) {
          grid.set(k(x, y, z), setting);
        }
      }
    }
    return grid;
  }, new Map<string, boolean>());
  return [...grid.values()].filter(Boolean).length;
}

async function p2021day22_part2(input: string, ...params: any[]) {
  return 'Not implemented';
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `
on x=10..12,y=10..12,z=10..12
on x=11..13,y=11..13,z=11..13
off x=9..11,y=9..11,z=9..11
on x=10..10,y=10..10,z=10..10
`,
      expected: '39',
    },
    {
      input: `
on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682
`,
      expected: '590784',
    },
  ];
  const part2tests: TestCase[] = [];

  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2021day22_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2021day22_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2021day22_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2021day22_part2(input));
  const part2After = performance.now();

  logSolution(22, 2021, part1Solution, part2Solution);

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
