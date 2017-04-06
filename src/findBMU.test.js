import { findBMU, findBMUinRect, findBMUinHex } from './findBMU';

const SOMap = [
  [100, 3, 10], [0, 2, 8], [0, 2, 1],
      [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [0, 0, 1],
      [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
      [101, 3, 10], [0, 3, 8], [9999, 9999, 9998],
];

test('findBMUinRect should return index, coordinations in [x, y] and winner value', () => (
	expect(findBMUinRect(
    SOMap,
    3,
    [9999, 9999, 9999],
  )).toEqual({
    index: 17,
    coordination: [2, 5],
    vector: [9999, 9999, 9998],
  })
));

const d = Math.sqrt(0.5);

test('findBMUinHex should return index, coordinations in [x, y] and winner value', () => (
	expect(findBMUinHex(
    SOMap,
    3,
    [9999, 9999, 9999],
  )).toEqual({
    index: 17,
    coordination: [2 + d, 5 * d],
    vector: [9999, 9999, 9998],
  })
));


test('default findBMU is findBMUinHex', () => (
	expect(findBMU(
    SOMap,
    3,
    [9999, 9999, 9999],
  )).toEqual(findBMUinHex(SOMap, 3, [9999, 9999, 9999]))
));
