// @flow
import { learn } from './learn';
import { createMap } from './createMap';

export const getFinalMap = (
  inputDataSet: Array<Array<number>>,
  initMap: Array<Array<number>> = createMap(8, 12, 3),
  widthOfSOMap: number = 8,
  timesPerInputSample: number = 100,
  baseDenominator: number = 300,
  baseLearningRadius: number = 3,
  baseLearningRate: number = 0.3,
): Array<Array<number>> => {
  const times = Array.from({ length: timesPerInputSample }, (v, i) => i);
  return times.reduce(((accumulatingMapWithTime, t) => {
    const denominator = (1 + t / baseDenominator);
    const learningRadius = (baseLearningRadius / denominator);
    const learningRate = (baseLearningRate / denominator);
    return inputDataSet.reduce((accumulatingMap, sampleVector) => {
      const newMap = learn(
        accumulatingMap,
        widthOfSOMap,
        sampleVector,
        learningRate,
        learningRadius,
      ).SOMap;
      return newMap;
    }, accumulatingMapWithTime);
  }), initMap);
  // above is the functional reactive version of:
  //
  // let trainedMap = SOMap;
  // inputDataSet.forEach((sampleVector) => {
  //   times.forEach((t) => {
  //     const denominator = (1 + t / baseDenominator);
  //     const learningRadius = (baseLearningRadius / denominator);
  //     const learningRate = (baseLearningRate / denominator);
  //     trainedMap = learn(
  //       trainedMap,
  //       widthOfSOMap,
  //       sampleVector,
  //       learningRate,
  //       learningRadius,
  //     ).SOMap;
  //   });
  // });
  // return trainedMap;
}
