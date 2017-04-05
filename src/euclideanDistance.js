// @flow
export const euclideanDistance = (vector1: Array<number>, vector2: Array<number>): number => {
  if (vector1.length !== vector2.length) {
    throw new Error(`euclidean distance algorithm: two vectors in differnt dimension. vector 1 in ${vector1.length}; vector 2 = ${vector2.length}`);
  }
  return Math.hypot(...vector1.map((vector1Value, index) => vector1Value - vector2[index]));
  // above is the same as:
  // let sum = 0;
  // const length = vector1.length; // or vector2.length since they have the same dimension
  // for (let index = 0; index < length; index += 1) {
  //   sum += Math.pow(vector1[index] - vector2[index], 2);
  // }
  // return Math.sqrt(sum);
};
