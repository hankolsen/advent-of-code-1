const getMostAndLeastCommonBits = (rows: string[]) => {
  const acc: number[][] = [];
  for (let col = 0; col < rows[0].length; col += 1) {
    acc.push([0, 0]);
    rows.forEach((row) => {
      const cellValue = Number(row.trim().split('')[col]);
      acc[col][cellValue] += 1;
    });
  }
  return acc;
};

export default getMostAndLeastCommonBits;
