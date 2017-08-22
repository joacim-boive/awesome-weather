export {get, toggleVisible, data, roundToTwoDecimals};


const roundToTwoDecimals = (thisNumber, missing) => {
    return thisNumber ? parseFloat(Math.round(thisNumber * 100) / 100).toFixed(2) : missing;
};

/**
 * Gets value from clicked element in dropdown and sets the corresponding dataset.id
 * @param {object} e - Event that triggers function
 */
const get = function (e) {
    // Needs to be "old-school" function (not =>) to preserve this-behaviour

    // eslint-disable-next-line no-invalid-this
    const that = this;
    const target = e.srcElement;
    const city = target.dataset.id;

    // helpers.toggleVisible(target.parentElement);
    console.info(city);
    that.value = target.innerText;
    that.dataset.id = city;
};

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
