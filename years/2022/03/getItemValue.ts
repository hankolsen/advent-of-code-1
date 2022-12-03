import { Item } from './types';

export const getItemValue = (item: Item) => {
  let diff = 38;
  if (item.match(/[a-z]/)) {
    diff = 96;
  }
  return item.charCodeAt(0) - diff;
};
