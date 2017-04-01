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
const timesPerInputSample = 1;
const baseDenominator = 1;
const baseLearningRadius = 2;
const baseLearningRate = 0.5;
const au0 = mapUnit => updater(inputDataSet[0], mapUnit, baseLearningRate);
const au1 = mapUnit => updater(inputDataSet[1], mapUnit, baseLearningRate);

test('updateBMU should update BMU on given SOMap according to sampleVector', () => (
  expect(getFinalMap(
    inputDataSet,
    SOMap,
    widthOfSOMap,
    timesPerInputSample,
    baseDenominator,
    baseLearningRadius,
    baseLearningRate,
  )).toEqual([
    au1([-1.2, -1.2, -1.2]), 	 au1([0, 2, 8]),	 		au1([0, 2, 1]),
    au1([100, 3, 10]), 		     au1([0, 2, 2]),	 		    [0, 1, 1],
    au1([101, 3, 10]), 		         [0, 3, 8],	 	       	[0, 0, 1],
        [100, 3, 10], 		         [0, 2, 8],	 		  au0([0, 2, 1]),
        [100, 3, 10], 	       au0([0, 2, 2]),	 		au0([0, 1, 1]),
    au0([101, 3, 10]),	 		   au0([0, 3, 8]),	 		au0([1000, 9999, 9998]),
  ])
));
