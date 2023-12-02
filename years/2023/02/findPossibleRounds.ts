const maxColors: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const findPossibleRounds = (rows: string[]) => {
  const res = rows.reduce((acc, row) => {
    const [, game] = row.match(/^Game (\d+)/)!;
    const turns = row.split(': ')[1].split('; ');
    const possible = turns.every((turn) => {
      return turn.split(',').every((hand) => {
        const [, count, color] = hand.match(/(\d+) (red|green|blue)/)!;
				return Number(count) <= maxColors[color];
      });
    });
		if (possible) {
			acc += Number(game);
		}
		return acc;
  }, 0);
	return res;
};
