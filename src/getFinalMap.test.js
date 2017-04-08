import { stepwiseRecursiveSOM } from './getFinalMap';
import { train } from './train';
import { h } from './neighborhoodFunc';

const SOMap = [
  [-100, -50, -100], [0, 2, 8], [0, 2, 1],
      [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [0, 0, 1],
      [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
      [101, 3, 10], [0, 3, 8], [1000, 9999, 9998],
];

test('stepwiseRecursiveSOM', () => (
  expect(stepwiseRecursiveSOM(
    [[5000, 5000, 5000], [-100, -100, -100]], // inputDataSet
    SOMap.length, // mapSize
    Math.sqrt(0.5), // initRadius
    1, // numberOfEpochs
    h, // neighborhoodFunc
    3, // widthOfSOMap
    SOMap, // initMap
  )).toEqual(train(train(
    SOMap,
    3, // widthOfSOMap
    [5000, 5000, 5000], // sampleVector
    0, // t
    1, // numberOfEpochs
    Math.sqrt(0.5), // initRadius
  ).SOMap,
  3, // widthOfSOMap
  [-100, -100, -100], // sampleVector
  0, // t
  1, // numberOfEpochs
  Math.sqrt(0.5), // initRadius
).SOMap)
));
