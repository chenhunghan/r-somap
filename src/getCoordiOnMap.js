// @flow

export const getXYinRect = (
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

export const getXYinHex = (
  array: Array<Array<number>>,
  widthOfSOMap: number,
  padding: number = 1,
): Array<{
  index: number,
  vector: Array<number>,
  coordination: Array<number>,
}> => {
  if (!Number.isInteger(widthOfSOMap)) {
    throw new Error('coordination scaler: typeof widthOfSOMap should be integer');
  }
  const arrayWithScaledDimension = array.map((vector, index) => {
    const rowN = Math.floor(index / widthOfSOMap);
    const d = Math.sqrt(padding * padding / 2);
    if (rowN % 2 === 0) {
      return {
        index,
        vector,
        coordination: [
          index % widthOfSOMap * padding,
          rowN * d,
        ],
      };
    }
    return {
      index,
      vector,
      coordination: [
        index % widthOfSOMap + d,
        rowN * d,
      ],
    };
  });
  return arrayWithScaledDimension;
};

export const getCoordiOnMap = (
  array: Array<Array<number>>,
  widthOfSOMap: number,
): Array<{
  index: number,
  vector: Array<number>,
  coordination: Array<number>,
}> => getXYinHex(array, widthOfSOMap);
