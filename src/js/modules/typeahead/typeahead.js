'use strict';

/* eslint-disable no-invalid-this */

import {conf} from '../../conf';

import * as hyperHTML from 'hyperhtml';

import * as debounce from 'lodash/debounce';
import {data, getSelected} from '../../plugins/helpers';

import './typeahead.css';
import template from './typeahead.html';

const typeahead = {};
typeahead.init = (EE) => {
    const wrapper = document.getElementById('typeahead');
    hyperHTML.bind(wrapper)`
        ${{html: template}}
    `;

    const submit = document.getElementById('go');
    const autosuggest = document.getElementById('autosuggest');
    const query = document.getElementById('query');

    // This is only hear to remove the placeholder LI-element.
    // It's needed for PurifyCSS so the CSS isn't removed.
    autosuggest.removeChild(autosuggest.firstElementChild);

    submit.addEventListener('click', debounce((event) => {
        submitQuery.apply(this, [event, EE]);
    }, 1000, {
        leading: true,
        trailing: false
    }));
    // , submitQuery.bind(this, EE));

// Need to do mousedown, instead of click, to prevent race condition with the blur event.
    autosuggest.addEventListener('mousedown', debounce((event) => {
        const data = getSelected.apply(this, [event]);

        query.dataset.id = data.id;
        query.value = data.value;
    }, 300, {
        leading: true,
        trailing: false
    }));
    // , get.bind(this, query));

    query.addEventListener('keyup', debounce((event) => {
        getAutosuggest.apply(this, [event, autosuggest]);
    }, 300, {
        leading: true,
        trailing: false
    }));

    query.addEventListener('blur', debounce((event) => {
        toggler.apply(this, [event, autosuggest]);
    }));
    // , toggler.bind(this, autosuggest));

    query.addEventListener('focus', () => {
        autosuggest.removeAttribute('hidden');
    });
};

const render = (cities, output) => {
    const template = cities.map((city) => {
        return `<li data-id="${city.id}">${city.name} ${city.country}</li>`;
    });

    hyperHTML.bind(output)`
        ${template}
    `;
};

/**
 * Sets, or removes, the attribute hidden on object
 * Bootstrap uses this attribute to hide/show in layout.
 * @param {object} e - eventClick that triggers function call
 * @param {object} obj - Object to toggle
 */
const toggler = (e, obj) => {
    if (e.target.value) {
        obj.hasAttribute('hidden') ? obj.removeAttribute('hidden') : obj.setAttribute('hidden', 'true');
    }
};

const getAutosuggest = (e, obj) => {
    const search = e.target.value;
    const getData = () => {
        data.get(conf.PROXY + '/typeahead/' + search).then((result) => {
            render(result, obj);
        });
    };

    if (search.length > 3) {
        getData();
    }

    if (search.length < 4) {
        obj.innerHTML = '';
    }
};

const submitQuery = (e, EE) => {
    const id = query.dataset.id;

    e.preventDefault();

    data.get(conf.PROXY + '/weather/' + id).then((result) => {
        EE.emit('weatherData', result);
    });
};

export { typeahead };
