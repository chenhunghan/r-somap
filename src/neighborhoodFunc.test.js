import { alpha, sigma, h } from './neighborhoodFunc';
import { euclideanDistance } from './euclideanDistance';

test('learning rate(alpha) should = initRate at t = 0', () => (
	expect(alpha(0, 100, 1)).toEqual(1)
));

test('learning rate(alpha) should = initRate + t/epochs at t = 1', () => (
	expect(alpha(1, 100, 1)).toEqual(1 - 1 / 100)
));

test('learning rate function has a default init rate = 0.5', () => (
	expect(alpha(10, 100)).toEqual(0.5 - 10 / 100)
));

test('learning radius(sigma) should return corret value when t = 0', () => (
	expect(sigma(0, 100, 10, 0)).toEqual(10)
));

test('learning radius(sigma) should return corret value when t = 1', () => (
	expect(sigma(1, 100, 10)).toEqual((100 - 1) / 100 * (10 - Math.sqrt(1) * 0.5))
));

test('learning radius(sigma) should return corret value when t = 98', () => (
	expect(sigma(98, 100, 10, 2)).toEqual((100 - 98) / 100 * (10 - 2))
));

test('h, neighborhood function should return corret value', () => (
	expect(h(98, 100, [0, 0], [3, 3], 0.4)).toEqual(alpha(98, 100) * Math.exp(-euclideanDistance([0, 0], [3, 3]) / (2 * sigma(98, 100, 0.4) * sigma(98, 100, 0.4))))
));
