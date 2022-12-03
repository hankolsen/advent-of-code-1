import { getRowsAsArrays } from '../../../util/input';
import { getItemValue as getItemValue } from './getItemValue';
import { Item, Rucksack } from './types';

export const findDuplicateValues = (input: string) => {
  const rucksacks: Rucksack[] = getRowsAsArrays(input);

  return rucksacks.reduce((acc, rucksack) => {
    const size = rucksack.length;
    const [firstCompartment, secondCompartment]: [Rucksack, Rucksack] = [
      rucksack.slice(0, size / 2),
      rucksack.slice(size / 2),
    ];
    firstCompartment.some((item) => {
      if (secondCompartment.includes(item)) {
        acc += getItemValue(item);
        return true;
      }
    });
    return acc;
  }, 0);
};
