// @flow
import { randomArray } from './randomArray';

export const getRandomEntities = (
  numberOfEntities: number = 12,
  numberOfAttributes: number = 8,
): Array<Array<number>> => {
  const randomEntities = [];
  for (let i = 0; i < numberOfEntities; i += 1) {
    randomEntities.push(randomArray(numberOfAttributes));
  }
  return randomEntities;
};
