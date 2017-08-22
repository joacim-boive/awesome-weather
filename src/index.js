'use strict';

if (module.hot) {
    module.hot.accept();
}

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'css/style.css';

import {get, toggleVisible, data} from './js/plugins/helpers';

export {init};

const init = () => {
    const PROXY = '//localhost:3000/api';

    const typeahead = document.getElementById('typeahead');
    const query = document.getElementById('query');

    const toggler = (e) => {
        if (e.srcElement.value) {
            toggleVisible(typeahead);
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

const render = (cities, output) => {
    const html = cities.map((city) => {
        return `<li data-id="${city.id}">${city.name}</li>`;
    });

    output.innerHTML = html.join('');
};

init();
