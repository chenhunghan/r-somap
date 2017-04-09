import { createRandomInput } from './createRandomInput';

test('return 12 entities', () => (
	expect(createRandomInput(12, 8).length).toBe(12)
));

test('each entity has 12 attributes', () => (
	expect(createRandomInput(12, 8)[0].length).toBe(8)
));
