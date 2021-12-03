const getGammaAndEpsilon = (acc: number[][]) => {
  const { g, e } = acc.reduce(({ g, e }, entry) => {
    const max = Math.max(...entry);
    const min = Math.min(...entry);
    e.push(entry.findIndex((e) => e === max).toString());
    g.push(entry.findIndex((e) => e === min).toString());
    return { g, e };
  }, { g: [''], e: [''] });
  const gamma = parseInt(g.join(''), 2);
  const epsilson = parseInt(e.join(''), 2);
  return { gamma, epsilson };
};
export default getGammaAndEpsilon;
