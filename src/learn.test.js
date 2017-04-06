import { updater, updateBMU, updateNeighbor, learn } from './learn';
import { findBMU } from './findBMU';

test('updater with update map unit = [1,1,1] with the values from smaple vector [1,2,3], learningRate = 0.5, updated map should be [1, 1.5, 2]', () => (
	expect(
		updater([1, 2, 3], [1, 1, 1], 0.5),
	).toEqual([1, 1, 1].map((v, i) => v + 0.5 * ([1, 2, 3][i] - v)))
));

const SOMap = [
  [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [0, 0, 1],
  [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [1000, 9999, 9998],
];
const widthOfSOMap = 3;
const sampleVector = [10000, 10000, 10000];
const learningRate = 0.5;
const au = mapUnit => updater(sampleVector, mapUnit, learningRate);

test('updateBMU should update BMU on given SOMap according to sampleVector', () => (
  expect(updateBMU(
    SOMap,
    widthOfSOMap,
    sampleVector,
    learningRate,
  )).toEqual({
    bestMatchingUnit: findBMU(SOMap, widthOfSOMap, sampleVector),
    BMUUpdatedSOMap: [
			[100, 3, 10], [0, 2, 8], [0, 2, 1],
			[100, 3, 10], [0, 2, 2], [0, 1, 1],
			[101, 3, 10], [0, 3, 8], [0, 0, 1],
			[100, 3, 10], [0, 2, 8], [0, 2, 1],
			[100, 3, 10], [0, 2, 2], [0, 1, 1],
      [101, 3, 10], [0, 3, 8], au([1000, 9999, 9998]),
    ],
  })
));

test('updateNeighbor should update neighborhood map units by radius = 2', () => (
  expect(updateNeighbor(
		SOMap,
    widthOfSOMap,
    sampleVector,
    findBMU(SOMap, widthOfSOMap, sampleVector),
    learningRate,
    2,
  )).toEqual({
    BMUWithCoordi: findBMU(SOMap, widthOfSOMap, sampleVector),
    neighborUpdatedMap: [
			 	 [100, 3, 10], 		 [0, 2, 8],	 		[0, 2, 1],
			 	 			[100, 3, 10], 		 [0, 2, 2],	 		[0, 1, 1],
			 	 [101, 3, 10], 		 [0, 3, 8],	 		[0, 0, 1],
			 	 			[100, 3, 10], 		 au([0, 2, 8]),	 au([0, 2, 1]),
			 	 [100, 3, 10], 	au([0, 2, 2]), au([0, 1, 1]),
      		 au([101, 3, 10]), au([0, 3, 8]), 		[1000, 9999, 9998],
    ],
  })
));

test('learn should update both BMU and its neighbors', () => (
  expect(learn(
		SOMap,
    widthOfSOMap,
    sampleVector,
    learningRate,
    2,
  )).toEqual({
    BMU: findBMU(SOMap, widthOfSOMap, sampleVector),
    SOMap: [
			 	 [100, 3, 10], 		 [0, 2, 8],	 		[0, 2, 1],
			 	 			[100, 3, 10], 		 [0, 2, 2],	 		[0, 1, 1],
			 	 [101, 3, 10], 		 [0, 3, 8],	 		[0, 0, 1],
			 	 			[100, 3, 10], 		 au([0, 2, 8]),	 au([0, 2, 1]),
			 	 [100, 3, 10], 	au([0, 2, 2]), au([0, 1, 1]),
      		 au([101, 3, 10]), au([0, 3, 8]), au([1000, 9999, 9998]),
    ],
  })
));

test('learn should update both BMU and its neighbors when raduis = 1', () => (
  expect(learn(
		SOMap,
    widthOfSOMap,
    sampleVector,
    learningRate,
    1,
  )).toEqual({
    BMU: findBMU(SOMap, widthOfSOMap, sampleVector),
    SOMap: [
			 	 [100, 3, 10], 		 [0, 2, 8],	 		[0, 2, 1],
			 	 [100, 3, 10], 		 [0, 2, 2],	 		[0, 1, 1],
			 	 [101, 3, 10], 		 [0, 3, 8],	 		[0, 0, 1],
			 	 [100, 3, 10], 		 [0, 2, 8],	   	[0, 2, 1],
			 	 [100, 3, 10], 	   [0, 2, 2],	 au([0, 1, 1]),
         [101, 3, 10], 	au([0, 3, 8]), au([1000, 9999, 9998]),
    ],
  })
));
