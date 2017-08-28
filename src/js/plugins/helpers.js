// /**
//  * Waits until Xms have passed before calling the function again.
//  * @param {object} func - Function to debounce
//  * @param {number} wait - Wait for Xms, or 300ms if not provided
//  * @return {function(...[*]=)}
//  */
// const debounce = (func, wait = 300) => {
//     let timeout = null;
//
//     return (...args) => {
//         clearTimeout(timeout);
//
//         timeout = setTimeout(() => {
//             timeout = null;
// // eslint-disable-next-line no-invalid-this
//             func.apply(this, args);
//         }, wait);
//     };
// };
//
// /**
//  * Only call this function at most Xms
//  * @param {object} func - The function to call
//  * @param {number} threshold - The number of minimum ms to pass before next execution
//  * @return {function(...[*]=)}
//  */
// const throttle = (func, threshold = 250) => {
//     let last = null;
//     let deferTimer = null;
//
//     return (...args) => {
//         const now = +new Date();
//
//         if (last && now < last + threshold) {
//             clearTimeout(deferTimer);
//
//             deferTimer = setTimeout(() => {
//                 last = now;
// // eslint-disable-next-line no-invalid-this
//                 func.apply(this, args);
//             }, threshold);
//         } else {
//             last = now;
// // eslint-disable-next-line no-invalid-this
//             func.apply(this, args);
//         }
//     };
// };

/**
 * Formats the input so it's consistently two decimals
 * @param {string|number} thisNumber - The number to be formatted
 * @param {string} missing - The text to return if thisNumber is undefined
 * @return {string}
 */
const roundToTwoDecimals = (thisNumber, missing) => {
    return thisNumber ? parseFloat(Math.round(thisNumber * 100) / 100).toFixed(2) : missing;
};

/**
 * Gets value from clicked element in dropdown and sets the corresponding dataset.id
 * @param {object} obj - Object (input-field) to be updated with data.
 */
const get = (obj) => {
    const target = event.target;
    const city = target.dataset.id;

    obj.value = target.innerText;
    obj.dataset.id = city;
};

/**
 * Sets, or removes, the attribute hidden on object
 * Bootstrap uses this attribute to hide/show in layout.
 * @param {object} obj - Object to toggle
 */
const toggleVisible = (obj) => {
    setTimeout(function() {
        obj.hasAttribute('hidden') ? obj.removeAttribute('hidden') : obj.setAttribute('hidden', 'true');
    }, 0);
};

/**
 * Get data from API
 * /typeahead/ - Get's available cities
 * /weather/ - Gets the expected weather for provided id.
 * @param {string} url
 * @return {Promise.<TResult>}
 */
const data = (url) => {
    const request = new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text'
        })
    });

    return fetch(request).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }).then((json) => {
        return json;
    }).catch((error) => {
        console.error(error);
    });
};

export {get, toggleVisible, data, roundToTwoDecimals, debounce, throttle};
