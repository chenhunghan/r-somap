// @flow
import { randomArray } from './randomArray';

export const createMap = (
  mapWidth: number = 8,
  mapHeight: number = 12,
  dimension: number = 3,
): Array<Array<number>> => Array.from({ length: mapWidth * mapHeight }, () => randomArray(dimension));
