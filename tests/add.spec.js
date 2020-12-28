import { strictEqual } from 'assert';

import { add } from '../api/add';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      strictEqual([1, 2, 3].indexOf(4), -1);
    });

    it('adds 2 given value', () => {
      strictEqual(add(2, 2), 4);
    });
  });
});
