import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import { log, logSolution } from '../../../util/log';
import { performance } from 'perf_hooks';
import { getRows } from '../../../util/input';

const YEAR = 2022;
const DAY = 7;

// solution path: /Users/hank/projects/aoc/advent-of-code-1/years/2022/07/index.ts
// data path    : /Users/hank/projects/aoc/advent-of-code-1/years/2022/07/data.txt
// problem url  : https://adventofcode.com/2022/day/7

const cd = (arg: string, cwd: string[]) => {
  if (arg === '/') {
    cwd = ['/'];
  } else if (arg === '..') {
    cwd.pop();
  } else {
    cwd.push(arg);
  }
  return cwd;
};

const getSizes = (input: string) => {
  const rows = getRows(input);
  const fileSystem: Record<string, any> = {};
  let cwd: string[];
  
  rows.forEach((row) => {
    const [, command, arg] = row.match(/^\$ (cd|ls)\s?(.*)?/) ?? [];
    const [, dir] = row.match(/dir (.*)/) ?? [];
    const [, size, file] = row.match(/(\d+) (.*)/) ?? [];
    if (command) {
      if (command === 'cd') {
        cwd = cd(arg, cwd);
      }
    } else {
      if (!fileSystem[cwd.join('/')]) {
        fileSystem[cwd.join('/')] = {};
      }
      if (dir) {
        fileSystem[cwd.join('/')][dir] = 'dir';
      } else {
        fileSystem[cwd.join('/')][file] = Number(size);
      }
    }
  });
  
  const read = (tree: Record<string, string | number>, dir: string, sum: Record<string, number>) => {
    const size = Object.entries(tree[dir]).reduce((acc, [file, size]) => {
      acc += size === 'dir' ? read(tree, `${dir}/${file}`, sum) : size;
      return acc;
    }, 0);
    sum[dir] = size;
    return size;
  };
  
  const sizes: Record<string, number> = {};
  read(fileSystem, '/', sizes);
  
  return sizes;
};

async function p2022day7_part1(input: string, ...params: any[]) {
  return Object.entries(getSizes(input)).filter(x => x[1] <= 100_000).reduce((acc, [name, size]) => acc + size, 0);
}

async function p2022day7_part2(input: string, ...params: any[]) {
  const sizes = getSizes(input);
  const toFree = 30_000_000 - (70_000_000 - sizes['/']);
  const sortedSizes = Object.entries(sizes).filter(x => x[1] >= toFree).sort(([a, aSize], [b, bSize]) => aSize - bSize);
  return sortedSizes[0][1];
}

async function run() {
  const part1tests: TestCase[] = [
    {
      input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
      expected: '95437',
    },
  ];
  const part2tests: TestCase[] = [
    {
      input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
      expected: '24933642',
    },
  ];
  
  // Run tests
  test.beginTests();
  await test.section(async () => {
    for (const testCase of part1tests) {
      test.logTestResult(testCase, String(await p2022day7_part1(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  await test.section(async () => {
    for (const testCase of part2tests) {
      test.logTestResult(testCase, String(await p2022day7_part2(testCase.input, ...(testCase.extraArgs || []))));
    }
  });
  test.endTests();
  
  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);
  
  const part1Before = performance.now();
  const part1Solution = String(await p2022day7_part1(input));
  const part1After = performance.now();
  
  const part2Before = performance.now();
  const part2Solution = String(await p2022day7_part2(input));
  const part2After = performance.now();
  
  logSolution(7, 2022, part1Solution, part2Solution);
  
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
