import { getCoordiOnMap, getXYinRect, getXYinHex } from './getCoordiOnMap';

test('getCoordiOnMap defaulr is getXYinRect', () => {
  const map = [
    [100, 3, 10], [0, 2, 8], [0, 2, 1],
    [100, 3, 10], [0, 2, 2], [0, 1, 1],
  ];
  const widthOfMap = 3;
  return expect(getCoordiOnMap(map, widthOfMap)).toEqual(getXYinHex(map, widthOfMap));
});

test('throw error when widthOfSOMap is not integer', () => (
	expect(() => getCoordiOnMap([], 0.3)).toThrowError()
));


test('getXYinRect should return XY coordination on a rect map', () => (
	expect(getXYinRect(
  [
      [100, 3, 10], [0, 2, 8], [0, 2, 1],
      [100, 3, 10], [0, 2, 2], [0, 1, 1],
  ],
    3,
  )).toEqual([
    { vector: [100, 3, 10], coordination: [0, 0], index: 0 }, { vector: [0, 2, 8], coordination: [1, 0], index: 1 }, { vector: [0, 2, 1], coordination: [2, 0], index: 2 },
    { vector: [100, 3, 10], coordination: [0, 1], index: 3 }, { vector: [0, 2, 2], coordination: [1, 1], index: 4 }, { vector: [0, 1, 1], coordination: [2, 1], index: 5 },
  ])
));

const d = Math.sqrt(0.5);

test('getXYinHex should return XY coordination on a hex map', () => (
	expect(getXYinHex(
  [
      [100, 3, 10], [0, 2, 8], [0, 2, 1],
      [100, 3, 10], [0, 2, 2], [0, 1, 1],
  ],
    3,
  )).toEqual([
    { vector: [100, 3, 10], coordination: [0, 0 * d], index: 0 },
    { vector: [0, 2, 8], coordination: [1, 0 * d], index: 1 },
    { vector: [0, 2, 1], coordination: [2, 0 * d], index: 2 },
    { vector: [100, 3, 10], coordination: [0 + d, 1 * d], index: 3 },
    { vector: [0, 2, 2], coordination: [1 + d, 1 * d], index: 4 },
    { vector: [0, 1, 1], coordination: [2 + d, 1 * d], index: 5 },
  ])
));
