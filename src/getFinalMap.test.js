import { getFinalMap } from './getFinalMap';
import { updater } from './learn';

const inputDataSet = [
  [10000, 10000, 10000],
  [-1, -1, -1],
];
const SOMap = [
  [-1.2, -1.2, -1.2], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [0, 0, 1],
  [100, 3, 10], [0, 2, 8], [0, 2, 1],
  [100, 3, 10], [0, 2, 2], [0, 1, 1],
  [101, 3, 10], [0, 3, 8], [1000, 9999, 9998],
];
const widthOfSOMap = 3;
const baseDenominator = 1;
const baseLearningRadius = 2;
const baseLearningRate = 0.5;
const au0 = mapUnit => updater(inputDataSet[0], mapUnit, baseLearningRate);
const au1 = mapUnit => updater(inputDataSet[1], mapUnit, baseLearningRate);

test('getFinalMap should get map with 1+ input vector sample(s)', () => (
  expect(getFinalMap(
    inputDataSet,
    SOMap,
    widthOfSOMap,
    1,
    baseDenominator,
    baseLearningRadius,
    baseLearningRate,
  )).toEqual([
    au1([-1.2, -1.2, -1.2]), 	 au1([0, 2, 8]),	 		au1([0, 2, 1]),
    au1([100, 3, 10]), 		     au1([0, 2, 2]),	 		    [0, 1, 1],
    au1([101, 3, 10]), 		     au1([0, 3, 8]),	 	      [0, 0, 1],
        [100, 3, 10], 		     au0([0, 2, 8]),	 		au0([0, 2, 1]),
        [100, 3, 10], 	       au0([0, 2, 2]),	 		au0([0, 1, 1]),
    au0([101, 3, 10]),	 		   au0([0, 3, 8]),	 		au0([1000, 9999, 9998]),
  ])
));

const denominator = (1 + 1 / baseDenominator);
const learningRateAtSecondCycle = (baseLearningRate / denominator);
const au0t = mapUnit => updater(inputDataSet[0], mapUnit, learningRateAtSecondCycle);
const au1t = mapUnit => updater(inputDataSet[1], mapUnit, learningRateAtSecondCycle);

test('getFinalMap should get updated map for timesPerInputSample = 2 or more', () => (
  expect(getFinalMap(
    inputDataSet,
    SOMap,
    widthOfSOMap,
    2,
    baseDenominator,
    baseLearningRadius,
    baseLearningRate,
  )).toEqual([
    au1t(au1([-1.2, -1.2, -1.2])), 	 au1t(au1([0, 2, 8])),	 		au1([0, 2, 1]),
    au1t(au1([100, 3, 10])), 		          au1([0, 2, 2]),	 		      [0, 1, 1],
    au1([101, 3, 10]), 		                au1([0, 3, 8]),	 	        [0, 0, 1],
        [100, 3, 10], 		                au0([0, 2, 8]),	 		  au0([0, 2, 1]),
        [100, 3, 10], 	                  au0([0, 2, 2]),	 au0t(au0([0, 1, 1])),
    au0([101, 3, 10]),	 		        au0t(au0([0, 3, 8])),	 au0t(au0([1000, 9999, 9998])),
  ])
));
