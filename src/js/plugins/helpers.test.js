import * as helpers from './helpers';

describe('helpers', () => {
    context('roundToTwoDecimals', () => {
        it('should always return two decimals', () => {
            expect(helpers.roundToTwoDecimals(2, '')).to.equal('2.00');
            expect(helpers.roundToTwoDecimals(2.1, '')).to.equal('2.10');
            expect(helpers.roundToTwoDecimals(2.455, '')).to.equal('2.46');
        });

        it('should return the second argument, if first argument is undefined', () => {
            expect(helpers.roundToTwoDecimals(undefined, '--')).to.equal('--');
        });
    });
});
