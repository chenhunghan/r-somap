// @flow
import { findBMU } from './findBMU';
import { getCoordiOnMap } from './getCoordiOnMap';
import { h } from './neighborhoodFunc';

export const train = (
  SOMap: Array<Array<number>>,
  widthOfSOMap: number,
  sampleVector: Array<number>,
  t: number,
  numberOfEpochs: number,
  initRadius: number,
  neighborhoodFunc?: Function = h,
): {
  BMU: {
    index: number,
    coordination: Array<number>,
    vector: Array<number>,
  },
  SOMap: Array<Array<number>>,
} => {
  const bestMatchingUnit = findBMU(SOMap, widthOfSOMap, sampleVector);
  const SOMapWithCoordi = getCoordiOnMap(SOMap, widthOfSOMap);
  const updatedMap = SOMapWithCoordi.map((mapUnit) => {
    const rate = neighborhoodFunc(
      t,
      numberOfEpochs,
      bestMatchingUnit.coordination,
      mapUnit.coordination,
      initRadius,
    );
    return mapUnit.vector.map((v, i) => {
      const diff = sampleVector[i] - v;
      return v + rate * diff;
    });
  });
  return {
    BMU: bestMatchingUnit,
    SOMap: updatedMap,
  };
};

// export const updater = (
//   sampleVector: Array<number>,
//   mapUnitVector: Array<number>,
//   learningRate: number,
// ): Array<number> => mapUnitVector.map((mv, i) => {
//   const sv = sampleVector[i];
//   const diff = sv - mv;
//   return mv + (learningRate * diff);
// });
//
// export const updateBMU = (
//   SOMap: Array<Array<number>>,
//   widthOfSOMap: number,
//   sampleVector: Array<number>,
//   learningRate: number,
// ) => {
//   const bestMatchingUnit = findBMU(SOMap, widthOfSOMap, sampleVector);
//   const BMUIndex = bestMatchingUnit.index;
//   const BMUUpdatedSOMap = SOMap.map((v, i) => {
//     if (i === BMUIndex) {
//       return updater(sampleVector, bestMatchingUnit.vector, learningRate);
//     }
//     return v;
//   });
//   return {
//     bestMatchingUnit,
//     BMUUpdatedSOMap,
//   };
// };
//
// export const updateNeighbor = (
//   SOMap: Array<Array<number>>,
//   widthOfSOMap: number,
//   sampleVector: Array<number>,
//   bestMatchingUnit: {
//     index: number,
//     vector: Array<number>,
//   },
//   learningRate: number,
//   learningRadius: number,
// ) => {
//   const SOMapWithCoordi = getCoordiOnMap(SOMap, widthOfSOMap);
//   const neighborUpdatedMap = SOMapWithCoordi.map((mapUnit, index) => {
//     if (index === bestMatchingUnit.index) {
//       return mapUnit.vector;
//     }
//     if (euclideanDistance(mapUnit.coordination, SOMapWithCoordi[bestMatchingUnit.index].coordination) > learningRadius) {
//       return mapUnit.vector;
//     }
//     return updater(sampleVector, mapUnit.vector, learningRate);
//   });
//   return {
//     BMUWithCoordi: {
//       index: bestMatchingUnit.index,
//       vector: bestMatchingUnit.vector,
//       coordination: SOMapWithCoordi[bestMatchingUnit.index].coordination,
//     },
//     neighborUpdatedMap,
//   };
// };
//
// export const learn = (
//   SOMap: Array<Array<number>>,
//   widthOfSOMap: number,
//   sampleVector: Array<number>,
//   learningRate: number,
//   learningRadius: number,
// ): {
//   BMU: {
//     index: number,
//     coordination: Array<number>,
//     vector: Array<number>,
//   },
//   SOMap: Array<Array<number>>,
// } => {
//   // update winner by values of entity
//   const { BMUUpdatedSOMap, bestMatchingUnit } = updateBMU(
//     SOMap,
//     widthOfSOMap,
//     sampleVector,
//     learningRate,
//   );
//   const { neighborUpdatedMap, BMUWithCoordi } = updateNeighbor(
//     BMUUpdatedSOMap,
//     widthOfSOMap,
//     sampleVector,
//     bestMatchingUnit,
//     learningRate,
//     learningRadius,
//   );
//   return {
//     BMU: BMUWithCoordi,
//     SOMap: neighborUpdatedMap,
//   };
// };
