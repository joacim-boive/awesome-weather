'use strict';

import * as format from 'date-fns/format';
import * as Chart from 'chart.js/dist/Chart'; // path required, otherwise Moment.js is included as well
import './graph.css';

const graph = {};
graph.init = (EE) => {
    EE.on('weatherData', sanitize);
    render.init();
};

const render = ((() => {
    let graph = null;
    let chart = null;

    const init = () => {
        graph = document.getElementById('graph');
    };

    const draw = (config) => {
        /** TODO
         * Use update instead
         * http://www.chartjs.org/docs/latest/developers/api.html#updateduration-lazy
         * Doesn't seem to work at the moment - nothing happens when called with new data.
         * The below is a workaround.
         */
        if (chart) {
            chart.destroy();
        }

        chart = new Chart(graph.getContext('2d'), config);
    };

    return {
        init: init,
        draw: draw
    };
})());

const sanitize = (data) => {
    let datesetDates = [];
    let datasetTemp = [];
    let datasetWind = [];
    let list = data.list;
    let item = null;

    let config = {
        type: 'line',
        data: {
            labels: datesetDates,
            datasets: [{
                label: 'Temperature ℃',
                backgroundColor: 'rgb(255, 99, 132',
                borderColor: 'rgb(255, 99, 132)',
                fill: false,
                data: datasetTemp
            },
                {
                    label: 'Wind m/s',
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    fill: false,
                    data: datasetWind
                }]
        },
        options: {
            title: {
                text: 'Chart.js Time Scale'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
        }
    };

    // Not sexy - but the most efficient! ;)
    for (let i = 0, listLen = list.length; i < listLen; i++) {
        item = list[i];

        let thisDate = format(new Date(item.dt_txt), 'MM-DD HH:mm');

        datesetDates.push(thisDate);
        datasetTemp.push(item.main.temp);
        datasetWind.push(item.wind.speed);
    }

    render.draw(config);
};

export { graph };
