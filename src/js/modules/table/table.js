'use strict';

import * as hyperHTML from 'hyperhtml';
import * as List from 'list.js';

import './table.css';
import template from './table.html';

import * as format from 'date-fns/format';
import {roundToTwoDecimals} from '../../plugins/helpers';

const table = {};
table.init = (EE) => {
    EE.on('weatherData', render);
};

const render = (data) => {
    const wrapper = document.getElementById('table');
    const list = data.list;

    let thisDate = '';

    hyperHTML.bind(wrapper)`
        ${{html: template}}
    `;

    const wrapperData = document.getElementById('data');
    hyperHTML.bind(wrapperData)`
        ${list.map((item) => {
        thisDate = item.dt_txt ? format(new Date(item.dt_txt), 'MM-DD HH:mm') : '--';

        return `
            <tr>
                <td class="time">${thisDate}</td>
                <td class="desc">${item.weather[0].description}</td>
                <td class="temp">${roundToTwoDecimals(item.main.temp, '--')}</td>
                <td class="speed">${roundToTwoDecimals(item.wind.speed, '--')}</td>
            </tr>`;
    })}
    `;

// eslint-disable-next-line no-unused-vars
    const tableData = new List('table-data', {
        valueNames: ['time', 'desc', 'temp', 'speed']
    });
};

export { table };
