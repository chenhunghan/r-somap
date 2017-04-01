// @flow

export const getCoordiOnMap = (
  array: Array<Array<number>>,
  widthOfSOMap: number,
): Array<{
  index: number,
  vector: Array<number>,
  coordination: Array<number>,
}> => {
  if (!Number.isInteger(widthOfSOMap)) {
    throw new Error('coordination scaler: typeof widthOfSOMap should be integer');
  }
  const arrayWithScaledDimension = array.map((vector, index) => {
    const coordination = [
      index % widthOfSOMap,
      Math.floor(index / widthOfSOMap),
    ];
    return {
      index,
      vector,
      coordination,
    };
  });
  return arrayWithScaledDimension;
};
