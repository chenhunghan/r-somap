import { createStore } from './createStore';
import { createMap } from './createMap';
import { train } from './train';

export const observableSOM = (
  inputDataSet: Array<Array<number>>,
  observer: Function,
  mapSize?: number = Math.max(150, Math.round(5 * Math.sqrt(inputDataSet.length))),
  initRadius?: number = Math.sqrt(mapSize) / 2,
  numberOfEpochs?: number = 10 * mapSize, // at least 10 * mapSize suggested by SOM Toolbox
  neighborhoodFunc?: Function,
  widthOfSOMap?: number = Math.round(Math.sqrt(mapSize / 1.5) * 1.5),
  initMap?: Array<Array<number>> = createMap(
    widthOfSOMap,
    Math.ceil(mapSize / widthOfSOMap),
    inputDataSet[0].length,
  ),
): Array<Array<number>> => {
  const reducer = (state = {}, action) => {
    switch (action.type) {
      case 'MAP_AT_T': {
        const m = {};
        m[action.t] = action.SOMap; // eslint-disable-line fp/no-mutation
        return Object.assign({}, state, m);
      }
      default:
        return state;
    }
  };
  const store = createStore(reducer);
  const unsubscribe = store.subscribe(observer);
  const epochs = Array.from({ length: numberOfEpochs }, (v, i) => i);
  epochs.reduce(((accumulatingMapWithTime, t) =>
    inputDataSet.reduce((accumulatingMap, sampleVector) => {
      const newMap = train(
        accumulatingMap,
        widthOfSOMap,
        sampleVector,
        t,
        numberOfEpochs,
        initRadius,
        neighborhoodFunc,
      ).SOMap;
      store.dispatch({
        type: 'MAP_AT_T',
        t,
        SOMap: newMap,
      });
      return newMap;
    }, accumulatingMapWithTime)), initMap);
  return unsubscribe;
};
