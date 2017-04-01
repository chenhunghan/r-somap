// @flow
export const euclideanDistance = (point1: Array<number>, point2: Array<number>): number => {
  if (point1.length !== point2.length) {
    throw new Error(`euclidean distance algorithm: two input points in differnt dimension. point 1 in ${point1.length}; point 2 has ${point2.length}`);
  }
  return Math.hypot(...point1.map((point1Value, index) => point1Value - point2[index]));
  // above is the same as:
  // let sum = 0;
  // const length = point1.length; // or point2.length since they have the same dimension
  // for (let index = 0; index < length; index += 1) {
  //   sum += Math.pow(point1[index] - point2[index], 2);
  // }
  // return Math.sqrt(sum);
};
