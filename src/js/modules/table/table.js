export {table};

import * as hyperHTML from 'hyperhtml';
import * as List from 'list.js';

import './table.css';

import {roundToTwoDecimals} from '../../plugins/helpers';

const table = {};
table.init = (EE) => {
    EE.on('weatherData', render);
};

const render = (data) => {
    const list = data.list;

    hyperHTML.bind(document.getElementById('data'))`
        ${list.map((item) => {
        let dt = item.dt_txt ? item.dt_txt.substr(5, 11) : '--';

        return `
            <tr>
                <td class="time">${dt}</td>
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
