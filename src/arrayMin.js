// @flow
export const arrayMinIndex = (arr: Array<number>): number => {
  let lowest = 0;
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < arr[lowest]) {
      lowest = i;
    }
  }
  return lowest;
};
