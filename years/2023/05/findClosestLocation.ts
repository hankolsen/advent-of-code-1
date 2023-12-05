export const findClosestLocation = (rows: string[]) => {
  const [seedsRow, ...blocks] = rows;
  let seeds = seedsRow.match(/(\d+)/g)?.map(Number);

	blocks.forEach((block) => {
		const ranges = block.split('\n').slice(1).map((line) => line.split(' ').map(Number));
		const currentSeeds: number[] = [];
		seeds?.forEach((x) => {
			if (
				!ranges.some(([dest, source, size]) => {
					if (source <= x && x < source + size) {
						currentSeeds.push(x - source + dest);
						return true;
					}
				})
			) {
				currentSeeds.push(x);
			}

		});
		seeds = currentSeeds;

	})
  return Math.min(...seeds!);
};
