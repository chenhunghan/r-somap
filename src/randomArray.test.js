import { randomArray } from './randomArray';

test('return 12 entities', () => (
	expect(randomArray(10).length).toBe(10)
));
