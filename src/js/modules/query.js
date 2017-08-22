export {query};

import {conf} from '../conf';
import {data} from './js/plugins/helpers';

const query = () => {
    exports.init = () => {
        const query = document.getElementById('query');

        document.getElementById('go').addEventListener('click', () => {
            const id = query.dataset.id;

            data(conf.PROXY + '/weather/' + id).then((result) => {
                console.log(result);
            });
        });
    };
};
