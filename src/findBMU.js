// @flow
import { arrayMinIndex } from './arrayMin';
import { euclideanDistance } from './euclideanDistance';

export const findBMU = (
  SOMap: Array<Array<number>>,
  widthOfSOMap: number,
  sampleVector: Array<number>,
): {
  index: number,
  coordination: Array<number>,
  vector: Array<number>,
} => {
  const distanceCollection = SOMap.map(mapUnit => euclideanDistance(mapUnit, sampleVector));
  const index = arrayMinIndex(distanceCollection); // Winner unit's index, should be an intergar.
  const coordination = [
    index % widthOfSOMap,
    Math.floor(index / widthOfSOMap),
  ];
  return {
    index,
    coordination,
    vector: SOMap[index],
  };
};

export const simpleFindBMU = (
  SOMap: Array<Array<number>>,
  widthOfSOMap: number,
  sampleVector: Array<number>,
): Array<number> => {
  const distanceCollection = SOMap.map(mapUnit => euclideanDistance(mapUnit, sampleVector));
  const index = arrayMinIndex(distanceCollection); // Winner unit's index, should be an intergar.
  return [
    index % widthOfSOMap,
    Math.floor(index / widthOfSOMap),
  ];
};
