export const findBoatMoves = (rows: string[]) => {
	const times = rows[0].match(/(\d+)/g)?.map(Number);
	const distances = rows[1].match(/(\d+)/g)?.map(Number);

	return times?.reduce((acc, time, i) => {
		let recordsBeaten = 0;
		const record = distances?.[i] ?? Infinity;
		for (let speed = 0; speed <= time; speed += 1) {
			const distance = speed * (time - speed);
			if (distance > record) {
				recordsBeaten += 1;
			}
		}
		acc *= recordsBeaten
		return acc;
	}, 1);
}