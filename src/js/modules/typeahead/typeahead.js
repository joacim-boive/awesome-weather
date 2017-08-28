export {typeahead};

import {conf} from '../../conf';

import * as hyperHTML from 'hyperhtml';
import {toggleVisible, data, get, debounce} from '../../plugins/helpers';

import './typeahead.css';
import template from './typeahead.html';

const typeahead = {};
typeahead.init = (EE) => {
    hyperHTML.bind(document.getElementById('typeahead'))`
        ${{html: template}}
    `;

    const autosuggest = document.getElementById('autosuggest');
    const query = document.getElementById('query');

    // This is only hear to remove the placeholder LI-element.
    // It's needed for PurifyCSS so the CSS isn't removed.
    autosuggest.removeChild(autosuggest.firstElementChild);

    const toggler = (e) => {
        if (e.target.value) {
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
    autosuggest.addEventListener('mousedown', debounce(get.bind(query)));

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
