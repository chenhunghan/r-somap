import { initMap } from './initMap';

test('return 12 entities', () => (
	expect(initMap(8, 12, 10).length).toBe(8 * 12)
));

test('each entity has 12 attributes', () => (
	expect(initMap(8, 12, 10)[0].length).toBe(10)
));
