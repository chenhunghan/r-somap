// @flow
import { randomArray } from './randomArray';

export const initMap = (
  mapWidth: number = 8,
  mapHeight: number = 12,
  numberOfAttributes: number = 3,
): Array<Array<number>> => {
  const SOMap = [];
  for (let i = 0; i < (mapWidth * mapHeight); i += 1) {
    SOMap.push(randomArray(numberOfAttributes));
  }
  return SOMap;
};
