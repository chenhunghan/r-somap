// @flow
import { learn } from './learn';
import { initMap } from './initMap';

export const getFinalMap = (
  inputDataSet: Array<Array<number>>,
  SOMap: Array<Array<number>> = initMap(8, 12, 3),
  widthOfSOMap: number = 8,
  timesPerInputSample: number = 100,
  baseDenominator: number = 300,
  baseLearningRadius: number = 3,
  baseLearningRate: number = 0.3,
): Array<Array<number>> => {
  const times = Array.from(new Array(timesPerInputSample), (x, i) => i);
  let trainedMap = SOMap;
  inputDataSet.forEach((sampleVector) => {
    times.forEach((t) => {
      const denominator = (1 + t / baseDenominator);
      const learningRadius = (baseLearningRadius / denominator);
      const learningRate = (baseLearningRate / denominator);
      trainedMap = learn(
        trainedMap,
        widthOfSOMap,
        sampleVector,
        learningRate,
        learningRadius,
      ).SOMap;
    });
  });
  return trainedMap;
};
