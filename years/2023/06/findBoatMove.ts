export const findBoatMove = (rows: string[]) => {
  const time = rows[0].replace(/\s+/g, '').match(/(\d+)/g)?.map(Number)[0];
  const record = rows[1].replace(/\s+/g, '').match(/(\d+)/g)?.map(Number)[0];

  let recordsBeaten = 0;
  for (let speed = 0; speed <= time!; speed += 1) {
    const distance = speed * (time! - speed);
    if (distance > record!) {
      recordsBeaten += 1;
    }
  }

  return recordsBeaten;
};
