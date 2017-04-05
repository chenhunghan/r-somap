// @flow
import { randomArray } from './randomArray';

export const getRandomEntities = (
  numberOfEntities: number = 12,
  dimension: number = 8,
): Array<Array<number>> => Array.from({ length: numberOfEntities }, () => randomArray(dimension));
