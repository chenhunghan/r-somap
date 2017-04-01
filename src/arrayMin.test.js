import { arrayMinIndex } from './arrayMin';

test('return the index of min number from input array', () => (
	expect(arrayMinIndex([1, 2, 3, 10, 100, 3])).toBe(0)
));
