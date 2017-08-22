'use strict';

const awesomeWeather = (() => {
    const init = () => {
        const PROXY = '//localhost:3000/api';

        const typeahead = document.getElementById('typeahead');
        const query = document.getElementById('query');

        const toggler = (e) => {
            if (e.srcElement.value) {
                helpers.toggleVisible(typeahead);
            }
        };

        // Need to do mousedown, instead of click, to prevent race condition with the blur event.
        typeahead.addEventListener('mousedown', get.bind(query));

        document.getElementById('go').addEventListener('click', (e) => {
            const id = query.dataset.id;

            data(PROXY + '/weather/' + id).then((result) => {
                console.log(result);
            });
        });

        query.addEventListener('keyup', (e) => {
            const search = e.currentTarget.value;

            if (search.length > 3) {
                data(PROXY + '/typeahead/' + search).then((result) => {
                    render(result, typeahead);
                });
            }

            if (search.length < 4) {
                typeahead.innerHTML = '';
            }
        });

        query.addEventListener('focus', (e) => {
            typeahead.removeAttribute('hidden');
        });

        query.addEventListener('blur', toggler);
    };


    /**
     * Get data from API
     * /typeahead/ - Get's available cities
     * /weather/ - Gets the expected weather for provided id.
     * @param url
     * @returns {Promise.<TResult>}
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

    const render = (cities, output) => {
        const html = cities.map((city) => {
            return `<li data-id="${city.id}">${city.name}</li>`;
        });

        output.innerHTML = html.join('');
    };

    /**
     * Needs to be "old-school" function (not =>) to preserve this-behaviour
     * @param e - Event that triggers function
     */
    const get = function(e) {
// eslint-disable-next-line no-invalid-this
        const that = this;
        const target = e.srcElement;
        const city = target.dataset.id;

        // helpers.toggleVisible(target.parentElement);
        console.info(city);
        that.value = target.innerText;
        that.dataset.id = city;
    };


// eslint-disable-next-line no-unused-vars
    const helpers = (function() {
        /**
         * Show or hide object by toggling [hidden]
         * @param obj Object to toggle
         */
        const _toggleVisible = (obj) => {
            obj.hasAttribute('hidden') ? obj.removeAttribute('hidden') : obj.setAttribute('hidden', 'true');
        };

        return {
            toggleVisible: _toggleVisible
        };
    }());

    return {
        init: init
    };
})();

awesomeWeather.init();
