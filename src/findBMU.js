// @flow
import { arrayMinIndex } from './arrayMin';
import { euclideanDistance } from './euclideanDistance';

/**
* @returns ```index``` is the index of in the array; ```coordination``` is an array [x, y] of coordination on a rect map. ```vector``` is the vector on the map unit.
*/
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
/**
* @param padding - the distance between map unit, default = 1
* @returns ```index``` is the index of in the array; ```coordination``` is an array [x, y] of coordination on a hexagonal map. ```vector``` is the vector on the map unit.
*/
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
/**
<p>
The selection of BMU is based on a batch comparision of similarities between the sample vector and the all map units \( m_{i} \). The similarity is defined as the smallest Euclidean distance from \( x(t) \). The BMU or the \( m_{c} \) is defined as
</p>

<span>
\[ \|x(t)-m_{c}\| = \min{\|x(t)-m_{i}\|} \]
</span>

There are two types of finding algorithms. The ```findBMUinRect``` returns the \( [x, y] \) on a rectangle map. The ```findBMUinHex``` returns the \( [x, y] \) on a hexagonal map. The default is the ```findBMUinHex```.
**/
export const findBMU = (
  SOMap: Array<Array<number>>,
  widthOfSOMap: number,
  sampleVector: Array<number>,
  type: string = 'hex',
): {
  index: number,
  coordination: Array<number>,
  vector: Array<number>,
} => {
  if (type === 'rect') {
    return findBMUinRect(SOMap, widthOfSOMap, sampleVector);
  }
  return findBMUinHex(SOMap, widthOfSOMap, sampleVector);
};
