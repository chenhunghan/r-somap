import { euclideanDistance } from './euclideanDistance';

test('return correct euclidean distance of two two-dimensional points', () => (
	expect(euclideanDistance([0, 3], [4, 0])).toBe(5)
));

test('return correct euclidean distance of two three-dimensional points', () => (
	expect(euclideanDistance([0, 0, 3], [4, 0, 0])).toBe(5)
));

test('throws errors when dimension did not match', () => {
  expect(() => euclideanDistance([0, 0], [0, 0, 0])).toThrowError();
});
