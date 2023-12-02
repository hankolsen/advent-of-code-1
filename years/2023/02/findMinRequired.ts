export const findMinRequired = (rows: string[]) => {
  const res = rows.reduce((acc, row) => {
    const [, game] = row.match(/^Game (\d+)/)!;
    const turns = row.split(': ')[1].split('; ');
    const minColors: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };
    turns.forEach((turn) => {
      turn.split(',').forEach((hand) => {
        const [, count, color] = hand.match(/(\d+) (red|green|blue)/)!;
        if (Number(count) > minColors[color]) {
					minColors[color] = Number(count);
				}
      });
    });
		const power = minColors.red * minColors.blue * minColors.green;
		acc += power
		return acc;
  }, 0);
  return res;
};
