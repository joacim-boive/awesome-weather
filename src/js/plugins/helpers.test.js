/**
 * Use "old-style" functions for mocha due to lexical scope:
 * https://mochajs.org/#arrow-functions
 */

import * as helpers from './helpers';
import * as _ from 'lodash';


describe('helpers', () => {
    describe('roundToTwoDecimals()', () => {
        it('should always return two decimals', () => {
            expect(helpers.roundToTwoDecimals(2, '')).toBe('2.00');
            expect(helpers.roundToTwoDecimals(2.1, '')).toBe('2.10');
            expect(helpers.roundToTwoDecimals(2.455, '')).toBe('2.46');
        });

        it('should return the second argument, if first argument is undefined', () => {
            expect(helpers.roundToTwoDecimals(undefined, '--')).toBe('--');
        });

        test('Should not throw when no args supplied', () => {
            expect(() => {
                helpers.roundToTwoDecimals()
            }).not.toThrow();
        });
    });

    describe('getSelected', () => {
        // Replicate the onClickEvent-data.
        const thisEvent = _.set({}, 'target.dataset.id', '007');
        thisEvent.target.innerText = 'London';


        it('should return an object with matching values', () => {
            expect(helpers.getSelected(thisEvent)).toEqual({"id": "007", "value": "London"});
        });
    });

    describe('data', () => {
        it('should return an object with the get-property', () => {
            expect(helpers.data).toHaveProperty("get");
        });
    })
});
