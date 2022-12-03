import { getRowsAsArrays } from '../../../util/input';
import { getItemValue } from './getItemValue';
import { Rucksack, RucksackGroup } from './types.d';

export const findGroupDuplicateValues = (input: string) => {
  const rucksacks: Rucksack[] = getRowsAsArrays(input);

  let group: RucksackGroup = [];
  
	return rucksacks.reduce((acc, rucksack, i) => {
    group.push(rucksack);
    if ((i + 1) % 3 === 0) {
			group[0].some((letter) => {
				if (group[1].includes(letter) && group[2].includes(letter)) {
					acc += getItemValue(letter);
					return true;
				}
			});
      group = [];
    }
    return acc;
  }, 0);
};
