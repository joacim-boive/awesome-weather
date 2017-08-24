import * as helpers from './helpers';
// import { } from './helpers';

describe('helpers', () => {
    describe('roundToTwoDecimals', () => {
        it('should return two decimals', () => {
            console.log(helpers.roundToTwoDecimals);
            // console.log(helpers.roundToTwoDecimals);
            expect(helpers.roundToTwoDecimals(2, '--')).to.equal('2.00');
        });

        it('works again', () => {
            expect('hi').to.equal('hi');
        });
    });
});
