'use strict';
if (module.hot) {
    module.hot.accept();
}

import EventEmitter from 'eventemitter3';

import { typeahead } from '../modules/typeahead/typeahead';
import { table } from '../modules/table/table';
import { graph } from '../modules/graph/graph';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const init = () => {
    const EE = new EventEmitter();

    typeahead.init(EE);
    table.init(EE);
    graph.init(EE);
};

document.addEventListener('DOMContentLoaded', init);
