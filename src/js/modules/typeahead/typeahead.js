export {typeahead};

import {conf} from '../../conf';

import * as hyperHTML from 'hyperhtml';
import {toggleVisible, data, get} from '../../plugins/helpers';

import './typeahead.css';
import template from 'html-loader!./typeahead.html';

hyperHTML.bind(document.getElementById('typeahead'))`
        ${{html: template}}
    `;

const typeahead = {};
typeahead.init = (EE) => {
    const autosuggest = document.getElementById('autosuggest');
    const query = document.getElementById('query');

    const toggler = (e) => {
        if (e.srcElement.value) {
            toggleVisible(autosuggest);
        }
    };

    document.getElementById('go').addEventListener('click', () => {
        const id = query.dataset.id;

        data(conf.PROXY + '/weather/' + id).then((result) => {
            EE.emit('weatherData', result);
        });
    });

// Need to do mousedown, instead of click, to prevent race condition with the blur event.
    autosuggest.addEventListener('mousedown', get.bind(query));

    query.addEventListener('keyup', (e) => {
        const search = e.currentTarget.value;

        if (search.length > 3) {
            data(conf.PROXY + '/typeahead/' + search).then((result) => {
                render(result, autosuggest);
            });
        }

        if (search.length < 4) {
            autosuggest.innerHTML = '';
        }
    });

    query.addEventListener('focus', () => {
        autosuggest.removeAttribute('hidden');
    });

    query.addEventListener('blur', toggler);
};

const render = (cities, output) => {
    const html = cities.map((city) => {
        return `<li data-id="${city.id}">${city.name} ${city.country}</li>`;
    });

    output.innerHTML = html.join('');
};
