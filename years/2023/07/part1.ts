const count = <T>(arr: T[], value: T) => {
  let count = 0;
  arr.forEach((e) => {
    if (e === value) {
      count += 1;
    }
  });

  return count;
};

export const part1 = (rows: string[]) => {
  type Hand = string[];
  type Play = [Hand, number];
  const plays: Play[] = [];

  const letterMap = '23456789TJQKA';

  rows.forEach((row) => {
    const [hand, bid] = row.split(' ');
    plays.push([hand.split(''), Number(bid)]);
  });

  const classifyHand = (hand: Hand) => {
    const counts = hand.map((card) => count(hand, card));
    if (counts.includes(5)) {
      return 6;
    }
    if (counts.includes(4)) {
      return 5;
    }
    if (counts.includes(3)) {
      if (counts.includes(2)) {
        return 4;
      }
      return 3;
    }
    if (count(counts, 2) === 4) {
      return 2;
    }

    if (counts.includes(2)) {
      return 1;
    }
    return 0;
  };

  plays.sort((a: Play, b: Play) => {
    if (classifyHand(a[0]) === classifyHand(b[0])) {
      let result = 0;
      a[0].some((card, i) => {
        if (letterMap.indexOf(card) > letterMap.indexOf(b[0][i])) {
          result = 1;
          return true;
        }
        if (letterMap.indexOf(card) < letterMap.indexOf(b[0][i])) {
          result = -1;
          return true;
        }
      });
      return result;
    }

    return classifyHand(a[0]) - classifyHand(b[0]);
  });

  return plays.reduce((acc, [hand, bid], rank) => {
    acc += (rank + 1) * bid;
    return acc;
  }, 0);
};
