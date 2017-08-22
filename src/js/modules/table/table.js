export {table};

import * as hyperHTML from 'hyperhtml';
import * as List from 'list.js';

import './listjs.css';

// import * as format from 'date-fns/format';
// import {sv} from 'date-fns/locale/sv';

/** TODO
 * Can't get 24h support from date-fns working
 * Ugly solution for now.
 * https://date-fns.org/
 *
 * Why use date-fns over moment.js
 * https://www.sitepoint.com/date-fns-javascript-date-library/
 * https://github.com/date-fns/date-fns/issues/275#issuecomment-264934189
 */

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
