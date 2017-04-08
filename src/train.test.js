import { train } from './train';
import { h } from './neighborhoodFunc';
import { findBMU } from './findBMU';
import { getCoordiOnMap } from './getCoordiOnMap';

const SOMap = [
  [-100, -50, -100], [0, 2, 8], [0, 2, 1],
      [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [0, 0, 1],
      [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
      [101, 3, 10], [0, 3, 8], [1000, 9999, 9998],
];
const BMU = findBMU(SOMap, 3, [5000, 5000, 5000]);

test('learn should update both BMU and its neighbors at t = 0 and number of epochs = 1', () => (
  expect(train(
    SOMap,
    3, // widthOfSOMap
    [5000, 5000, 5000], // sampleVector
    0, // t
    1, // numberOfEpochs
    Math.sqrt(0.5), // initRadius
  )).toEqual({
    BMU,
    SOMap: getCoordiOnMap(SOMap, 3).map((mapUnit) => {
      const rate = h(
        0,
        1,
        BMU.coordination,
        mapUnit.coordination,
        Math.sqrt(0.5),
      );
      return mapUnit.vector.map((v, i) => {
        const diff = [5000, 5000, 5000][i] - v;
        return v + rate * diff;
      });
    }),
  })
));

test('learn should update both BMU and its neighbors at t = 1 and number of epochs = 2', () => (
  expect(train(
    SOMap,
    3, // widthOfSOMap
    [5000, 5000, 5000], // sampleVector
    0, // t
    1, // numberOfEpochs
    Math.sqrt(0.5), // initRadius
  )).toEqual({
    BMU,
    SOMap: getCoordiOnMap(getCoordiOnMap(SOMap, 3).map((mapUnit) => {
      const rate = h(
        0,
        2,
        BMU.coordination,
        mapUnit.coordination,
        Math.sqrt(0.5),
      );
      return mapUnit.vector.map((v, i) => {
        const diff = [5000, 5000, 5000][i] - v;
        return v + rate * diff;
      });
    }), 3).map((mapUnit) => {
      const rate = h(
        1,
        2,
        BMU.coordination,
        mapUnit.coordination,
        Math.sqrt(0.5),
      );
      return mapUnit.vector.map((v, i) => {
        const diff = [5000, 5000, 5000][i] - v;
        return v + rate * diff;
      });
    }),
  })
));
