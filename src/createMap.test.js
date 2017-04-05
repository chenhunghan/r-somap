import { createMap } from './createMap';

test('return 12 entities', () => (
	expect(createMap(8, 12, 10).length).toBe(8 * 12)
));

test('each entity has 12 attributes', () => (
	expect(createMap(8, 12, 10)[0].length).toBe(10)
));
