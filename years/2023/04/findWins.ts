export const findWins = (rows: string[]) => {
	return rows.reduce((sum, row) => {
		const winningNumbers = row.split('|')[0].split(':')[1].match(/(\d+)/g)?.map((n) => Number(n)).sort((a, b) => a < b ? -1 : 1);
		const elfNumbers = row.split('|')[1].match(/(\d+)/g)?.map((n) => Number(n)).sort((a, b) => a < b ? -1 : 1);
		
		const res = elfNumbers?.reduce((acc, number) => {
			if (winningNumbers?.includes(number)) {
				if (acc === 0) {
					acc = 1;
				} else {
					acc *= 2;
				}
			}
			return acc;
		}, 0);
		sum += res ?? 0;
		return sum;
	}, 0)
};