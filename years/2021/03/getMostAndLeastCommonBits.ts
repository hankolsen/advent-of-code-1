const getMostAndLeastCommonBits = (rows: string[]) => {
  const acc: number[][] = [];
  for (let col = 0; col < rows[0].length; col += 1) {
    acc.push([0, 0]);
    rows.forEach((row) => {
      const cellValue = Number(row.trim().split('')[col]);
      acc[col][cellValue] += 1;
    });
  }
  return acc.map((e) => {
    const max = Math.max(...e);
    const min = Math.min(...e);
    const most = e.findIndex((e) => e === max);
    const least = e.findIndex((e) => e === min);
    return { least, most }
  });
};

export default getMostAndLeastCommonBits;
