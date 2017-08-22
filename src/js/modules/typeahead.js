/* eslint-disable no-unused-vars */
export {typeahead};

import {conf} from '../conf';
import {toggleVisible, data, get} from '../plugins/helpers';


const typeahead = {};
typeahead.init = () => {
    const autosuggest = document.getElementById('typeahead');
    const query = document.getElementById('query');

    const toggler = (e) => {
        if (e.srcElement.value) {
            toggleVisible(autosuggest);
        }
    };

    document.getElementById('go').addEventListener('click', () => {
        const id = query.dataset.id;

        data(conf.PROXY + '/weather/' + id).then((result) => {
            console.log(result);
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
        return `<li data-id="${city.id}">${city.name}</li>`;
    });

    output.innerHTML = html.join('');
};
