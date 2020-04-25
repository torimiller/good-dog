const isEqual = require('../isEqual');

const expect = require('chai').expect;

describe('isEqual', function() {
    it('should give right answers for equal and unequal inputs', function() {
        // we're going to the `isEqual` function on a range of inputs
        // that the function should return true for.
        const equalInputs = [
            [1, 1],
            [true, true],
            ['foo', 'foo']
        ];
        // loop through inputs and check that each set returns true
        equalInputs.forEach(function(input) {
            const answer = isEqual(input[0], input[1]);
            // use `chai.expect`'s keywords to set expectations for
            // `isEqual`'s behavior
            expect(answer).to.be.true;
        });

        // range of inputs that the function should return false for
        const unequalInputs = [
            ['1', 1],
            [1, 2],
            [1, true],
            [0, false]
        ];
        // loop through inputs and check that each set returns false
        unequalInputs.forEach(function(input) {
            const answer = isEqual(input[0], input[1]);
            expect(answer).to.be.false;
        });
    });
  }
);