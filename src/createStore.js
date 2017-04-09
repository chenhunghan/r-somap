export const createStore = (reducer) => {
  // simple subscribable store implementation inspired by Redux, see more https://github.com/reactjs/redux/blob/master/src/createStore.js
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action); // eslint-disable-line fp/no-mutation
    listeners.forEach(listener => listener());
  };
  const subscribe = (listener) => {
    listeners = listeners.concat([listener]); // eslint-disable-line fp/no-mutation
    return () => {
      listeners = listeners.filter(l => l !== listener); // eslint-disable-line fp/no-mutation
    };
  };
  dispatch({});
  return {
    dispatch,
    subscribe,
    getState,
  };
};
