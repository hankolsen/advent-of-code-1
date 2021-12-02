const parseRow = (row: string) => {
  const [, dir, val] = row.match(/(forward|up|down) (\d+)/) ?? [];
  return { dir, val: Number(val) };
};

// Part 1
type Props = {
  x: number;
  y: number;
  val: number;
};

const ops: { [key: string]: ({ x, y, val }: Props) => { x: number; y: number } } = {
  forward: ({ x, y, val }: Props) => ({ x: x + val, y }),
  up: ({ x, y, val }: Props) => ({ x, y: y - val }),
  down: ({ x, y, val }: Props) => ({ x, y: y + val }),
};

export const diveFirst = (rows: string[]) => {
  const { x, y } = rows.reduce(
    ({ x, y }, row) => {
      const { dir, val } = parseRow(row);
      return ops[dir]({ x, y, val });
    },
    { x: 0, y: 0 },
  );

  return x * y;
};

// Part 2
type Props2 = {
  x: number;
  y: number;
  val: number;
  aim: number;
};

const ops2: { [key: string]: ({ x, y, aim, val }: Props2) => { x: number; y: number; aim: number } } = {
  forward: ({ x, y, aim, val }: Props2) => ({ x: x + val, y: y + val * aim, aim }),
  up: ({ x, y, aim, val }: Props2) => ({ x, y, aim: aim - val }),
  down: ({ x, y, aim, val }: Props2) => ({ x, y, aim: aim + val }),
};

export const diveSecond = (rows: string[]) => {
  const { x, y } = rows.reduce(
    ({ x, y, aim }, row) => {
      const { dir, val } = parseRow(row);
      return ops2[dir]({ x, y, aim, val });
    },
    { x: 0, y: 0, aim: 0 },
  );

  return x * y;
};
