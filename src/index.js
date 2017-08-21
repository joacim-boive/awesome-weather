/* eslint-disable switch-colon-spacing */
'use strict';

/* eslint-disable no-unused-vars */
const awesomeWeather = ((() => {
    const init = () => {
        document.getElementById('go').addEventListener('click', (e) => {

        });
        document.getElementById('query').addEventListener('keyup', (e) => {
            const search = e.currentTarget.value;

            if (search.length > 3) {
                data(search).then(render);
            }

            if (search.length < 4) {
                document.getElementById('typeahead').innerHTML = '';
            }
        });
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

    const render = (cities) => {
        if (!cities) {
            return;
        }

        const holder = document.getElementById('typeahead');

        const html = cities.map((city) => {
            return `<li data-id="${city.id}">${city.name}</li>`;
        });

        holder.innerHTML = html.join('');
    };

    return {
        init: init
    };
})());
