export const findCards = (rows: string[]) => {
	const totalCards = rows.length;
	const cards: Record<number, number> = {};

	rows.forEach((_, i) => {
		cards[i + 1] =1;
	});

	rows.forEach((row, index) => {
		const winningNumbers = row.split('|')[0].split(':')[1].match(/(\d+)/g)?.map((n) => Number(n)).sort((a, b) => a < b ? -1 : 1);
		const elfNumbers = row.split('|')[1].match(/(\d+)/g)?.map((n) => Number(n)).sort((a, b) => a < b ? -1 : 1);
		
		const cardNumber = index + 1;

		const numberOfWins = elfNumbers?.reduce((wins, number) => {
			if (winningNumbers?.includes(number)) {
				wins += 1;	
			}
			return wins;
		}, 0) ?? 0;

		for (let i = cardNumber + 1; i <= cardNumber + numberOfWins; i += 1) {
			cards[i] += 1 * cards[cardNumber ];
		}
	});

	return Object.values(cards).reduce((acc, num) => {
		acc += num;
		return acc;
	}, 0)

}