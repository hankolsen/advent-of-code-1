const getGammaAndEpsilon = (acc: { least: number, most: number }[]) => {
  const { e, g } = acc.reduce(({ e, g }, { least, most }) => {
    e.push(most.toString());
    g.push(least.toString());
    return { e, g };
  }, { e: [''], g: [''] });
  
  const epsilon = parseInt(e.join(''), 2);
  const gamma = parseInt(g.join(''), 2);
  return { epsilon, gamma };
};
export default getGammaAndEpsilon;
