import { getCoordiOnMap } from './getCoordiOnMap';

test('getCoordiOnMap should return map with coordination', () => (
	expect(getCoordiOnMap(
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

test('throw error when widthOfSOMap is not integer', () => (
	expect(() => getCoordiOnMap(
  [],
    0.3,
  )).toThrowError()
));
