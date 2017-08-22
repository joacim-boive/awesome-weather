'use strict';
if (module.hot) {
    module.hot.accept();
}

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import 'css/style.css';

import EventEmitter from 'eventemitter3';

import { typeahead } from './modules/typeahead/typeahead';
import { table } from './modules/table/table';

const init = () => {
    const EE = new EventEmitter();

    typeahead.init(EE);
    table.init(EE);
};

init();
