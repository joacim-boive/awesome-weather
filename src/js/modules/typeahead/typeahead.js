/* eslint-disable no-invalid-this */

import {conf} from '../../conf';

import * as hyperHTML from 'hyperhtml';
import {toggleVisible, data, get, debounce} from '../../plugins/helpers';

import './typeahead.css';
import template from './typeahead.html';


const typeahead = {};
typeahead.init = (EE) => {
    const wrapper = document.getElementById('typeahead');
    hyperHTML.bind(wrapper)`
        ${{html: template}}
    `;

    const go = document.getElementById('go');
    const autosuggest = document.getElementById('autosuggest');
    const query = document.getElementById('query');

    // This is only hear to remove the placeholder LI-element.
    // It's needed for PurifyCSS so the CSS isn't removed.
    autosuggest.removeChild(autosuggest.firstElementChild);

    go.addEventListener('click', submit.bind(this, EE));

// Need to do mousedown, instead of click, to prevent race condition with the blur event.
    autosuggest.addEventListener('mousedown', get.bind(this, query));

    query.addEventListener('keyup', getAutosuggest.bind(this, autosuggest));
    query.addEventListener('blur', toggler.bind(this, autosuggest));
    query.addEventListener('focus', () => {
        autosuggest.removeAttribute('hidden');
    });
};

const render = (cities, output) => {
    const html = cities.map((city) => {
        return `<li data-id="${city.id}">${city.name} ${city.country}</li>`;
    });

    output.innerHTML = html.join('');
};

const toggler = (obj) => {
    if (event.target.value) {
        toggleVisible(obj);
    }
};

const getAutosuggest = (obj) => {
    const search = event.currentTarget.value;

    if (search.length > 3) {
        data(conf.PROXY + '/typeahead/' + search).then((result) => {
            render(result, obj);
        });
    }

    if (search.length < 4) {
        obj.innerHTML = '';
    }
};

const submit = (EE) => {
    const id = query.dataset.id;

    data(conf.PROXY + '/weather/' + id).then((result) => {
        EE.emit('weatherData', result);
    });
};

export {typeahead};
