'use strict';

const awesomeWeather = ((() => {
    const init = () => {
        const typeahead = document.getElementById('typeahead');
        const query = document.getElementById('query');

        const toggler = (e) => {
            if (e.srcElement.value) {
                helpers.toggleVisible(typeahead);
            }
        };

        typeahead.addEventListener('mousedown', get.bind(query));

        document.getElementById('go').addEventListener('click', (e) => {

        });

        query.addEventListener('keyup', (e) => {
            const search = e.currentTarget.value;

            if (search.length > 3) {
                data(search).then((result) => {
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

        /**TODO
         * Blurs the event before the value is set from click on dropdown, causing a race condition
         */
        query.addEventListener('blur', toggler);
    };


    const data = (q) => {
        const PROXY = '//localhost:3000/api/typeahead/';
        const request = new Request(PROXY + q, {
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
})());

awesomeWeather.init();
