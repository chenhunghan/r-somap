import { createStore } from './createStore';

describe('store test', () => {
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

  test('createStore() return {}', () => {
    const store = createStore(reducer);
    return expect(store.getState()).toEqual({});
  });

  test('dispatch an action', () => {
    const store = createStore(reducer);
    store.dispatch({
      type: 'MAP_AT_T',
      t: 100,
      SOMap: [],
    });
    return expect(store.getState()).toEqual({
      100: [],
    });
  });

  const unknownAction = () => ({ type: '' });

  // the following tests is "inspired by tests in Redux, see https://github.com/reactjs/redux/blob/master/test/createStore.spec.js"

  it('exposes the public API', () => {
    const store = createStore(reducer);
    const methods = Object.keys(store);
    expect(methods.length).toBe(3);
    expect(methods).toContain('subscribe');
    expect(methods).toContain('dispatch');
    expect(methods).toContain('getState');
  });

  it('support unsubscribe', () => {
    const store = createStore(reducer);
    const listener = jest.fn();
    const unsubscribe = store.subscribe(listener);
    unsubscribe();
    store.dispatch(unknownAction());
    expect(listener.mock.calls.length).toBe(0);
  });

  it('only removes listener once when unsubscribe is called', () => {
    const listenerA = jest.fn();
    const listenerB = jest.fn();
    const store = createStore(reducer);
    const unsubscribeA = store.subscribe(listenerA);
    store.subscribe(listenerB);

    unsubscribeA();
    unsubscribeA();

    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(0);
    expect(listenerB.mock.calls.length).toBe(1);
  });

  it('supports multiple subscriptions', () => {
    const store = createStore(reducer);
    const listenerA = jest.fn();
    const listenerB = jest.fn();

    const unsubscribeA = store.subscribe(listenerA);
    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(1);
    expect(listenerB.mock.calls.length).toBe(0);

    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(2);
    expect(listenerB.mock.calls.length).toBe(0);

    const unsubscribeB = store.subscribe(listenerB);
    expect(listenerA.mock.calls.length).toBe(2);
    expect(listenerB.mock.calls.length).toBe(0);

    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(3);
    expect(listenerB.mock.calls.length).toBe(1);

    unsubscribeA();
    expect(listenerA.mock.calls.length).toBe(3);
    expect(listenerB.mock.calls.length).toBe(1);

    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(3);
    expect(listenerB.mock.calls.length).toBe(2);

    unsubscribeB();
    expect(listenerA.mock.calls.length).toBe(3);
    expect(listenerB.mock.calls.length).toBe(2);

    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(3);
    expect(listenerB.mock.calls.length).toBe(2);

    store.subscribe(listenerA);
    expect(listenerA.mock.calls.length).toBe(3);
    expect(listenerB.mock.calls.length).toBe(2);

    store.dispatch(unknownAction());
    expect(listenerA.mock.calls.length).toBe(4);
    expect(listenerB.mock.calls.length).toBe(2);
  });
});
