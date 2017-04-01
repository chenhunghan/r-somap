// @flow

export const randomArray = (length: number): Array<number> => [...new Array(length)].map(() => Math.random());
