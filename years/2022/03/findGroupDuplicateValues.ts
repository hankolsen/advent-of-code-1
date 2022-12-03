import { getRowsAsArrays } from '../../../util/input';
import { getItemValue } from './getItemValue';
import { Rucksack, RucksackGroup } from './types.d';

export const findGroupDuplicateValues = (input: string, groupSize: number = 3) => {
  const rucksacks: Rucksack[] = getRowsAsArrays(input);

  let group: RucksackGroup = [];
  
	return rucksacks.reduce((acc, rucksack, i) => {
    group.push(rucksack);
    
		if ((i + 1) % groupSize === 0) {
			const [firstRucksack, ...otherRucksacks] = group;
			firstRucksack.some((item) => {
				if (otherRucksacks.every((rucksack) => rucksack.includes(item))) {
					acc += getItemValue(item);
					return true;
				}
			});
      group = [];
    }
    return acc;
  }, 0);
};
