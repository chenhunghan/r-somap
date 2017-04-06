// @flow
import { arrayMinIndex } from './arrayMin';
import { euclideanDistance } from './euclideanDistance';

export const findBMUinRect = (
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

export const findBMUinHex = (
  SOMap: Array<Array<number>>,
  widthOfSOMap: number,
  sampleVector: Array<number>,
  padding: number = 1,
): {
  index: number,
  coordination: Array<number>,
  vector: Array<number>,
} => {
  const distanceCollection = SOMap.map(mapUnit => euclideanDistance(mapUnit, sampleVector));
  const index = arrayMinIndex(distanceCollection); // Winner unit's index, should be an intergar.
  const rowN = Math.floor(index / widthOfSOMap);
  const d = Math.sqrt(padding * padding / 2);
  if (rowN % 2 === 0) {
    return {
      index,
      coordination: [
        index % widthOfSOMap * padding,
        rowN * d,
      ],
      vector: SOMap[index],
    };
  }
  return {
    index,
    coordination: [
      index % widthOfSOMap + d,
      rowN * d,
    ],
    vector: SOMap[index],
  };
};

export const findBMU = (
  SOMap: Array<Array<number>>,
  widthOfSOMap: number,
  sampleVector: Array<number>,
  padding: number = 1,
): {
  index: number,
  coordination: Array<number>,
  vector: Array<number>,
} => findBMUinHex(SOMap, widthOfSOMap, sampleVector, padding);
