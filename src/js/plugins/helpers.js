'use strict';

/**
 * Formats the input so it's consistently two decimals
 * @param {string|number} thisNumber - The number to be formatted
 * @param {string} missing - The text to return if thisNumber is undefined
 * @return {string}
 */
const roundToTwoDecimals = (thisNumber, missing = '--') => {
    return thisNumber ? parseFloat(Math.round(thisNumber * 100) / 100).toFixed(2) : missing;
};

/**
 * Gets value from clicked element in dropdown and sets the corresponding dataset.id
 * @param {object} e - The event object that triggered this call.
 * @return {object} data -
 */
const getSelected = (e) => {
    const target = e.target;
    const cityId = target.dataset.id;
    const data = {};

    data.value = target.innerText;
    data.id = cityId;

    return data;
};

/**
 * Get data from API
 * /typeahead/ - Get's available cities
 * /weather/ - Gets the expected weather for provided id.
 * @param {string} url
 * @return {Promise.<TResult>}
 */
const data = ((() => {
    const cache = new Map();

    const get = (url) => {
        let thisData = cache.get(url);

        if (thisData) {
            return new Promise((resolve) => {
                resolve(thisData);
            });
        }

        return fetch(url).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }).then((json) => {
            cache.set(url, json);

            return json;
        }).catch((error) => {
            console.error(error);
        });
    };

    return {
        get: get
    };
})());

export {getSelected, data, roundToTwoDecimals};
