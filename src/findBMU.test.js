import { findBMU, simpleFindBMU } from './findBMU';

const SOMap = [
  [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [0, 0, 1],
  [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [9999, 9999, 9998],
];

test('findBMU should return index, coordinations in [x, y] and winner value', () => (
	expect(findBMU(
    SOMap,
    3,
    [9999, 9999, 9999],
  )).toEqual({
    index: 17,
    coordination: [2, 5],
    vector: [9999, 9999, 9998],
  })
));

test('simpleFindBMU should return coordinations in [x, y]', () => (
	expect(simpleFindBMU(
    SOMap,
    3,
    [9999, 9999, 9999],
  )).toEqual([2, 5])
));
