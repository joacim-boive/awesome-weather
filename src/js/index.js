'use strict';
if (module.hot) {
    module.hot.accept();
}

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import 'css/style.css';

import {typeahead} from './modules/typeahead';

const init = () => {
    typeahead.init();
};

init();
