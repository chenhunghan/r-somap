import { observableSOM } from './observableSOM';

it('support unsubscribe', () => {
  const observer = jest.fn();
  observableSOM(
    [[5000, 5000, 5000], [-100, -100, -100]],
    observer,
    10,
    0.5,
    20, // numberOfEpochs
  );
  expect(observer.mock.calls.length).toBe(40);
});
