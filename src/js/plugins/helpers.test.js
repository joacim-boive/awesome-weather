/**
 * Use "old-style" functions for mocha due to lexical scope:
 * https://mochajs.org/#arrow-functions
 */

import * as helpers from './helpers';

describe('Test Labbs', () =>{
    test('Jest Test ', () => {
        expect();
    });
});


describe('helpers', () => {
    // const get = (e, obj) => {
    //     const target = e.target;
    //     const city = target.dataset.id;
    //
    //     obj.value = target.innerText;
    //     obj.dataset.id = city;
    //
    //     return obj;
    // };

    // const e = new MouseEvent()
    describe('roundToTwoDecimals()', () => {
        it('should always return two decimals', () => {
            expect(helpers.roundToTwoDecimals(2, '')).toBe('2.00');
            expect(helpers.roundToTwoDecimals(2.1, '')).toBe('2.10');
            expect(helpers.roundToTwoDecimals(2.455, '')).toBe('2.46');
        });

        it('should return the second argument, if first argument is undefined', () => {
            expect(helpers.roundToTwoDecimals(undefined, '--')).toBe('--');
        });

        test('Should not throw when no args supplied', () =>{
            expect(() =>{
                helpers.roundToTwoDecimals()
            }).not.toThrow();
        });
    });

    describe('get', () =>{

    })
});

