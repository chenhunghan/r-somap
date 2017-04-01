import { getRandomEntities } from './getRandomEntities';

test('return 12 entities', () => (
	expect(getRandomEntities(12, 8).length).toBe(12)
));

test('each entity has 12 attributes', () => (
	expect(getRandomEntities(12, 8)[0].length).toBe(8)
));

