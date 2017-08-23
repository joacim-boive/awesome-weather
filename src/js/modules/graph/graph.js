export {graph};

import * as moment from 'moment';
import * as Chart from 'chart.js';
import './graph.css';

const graph = {};
graph.init = (EE) => {
    EE.on('weatherData', sanitize);
};

const render = (config) => {
    let ctx = document.getElementById('graph').getContext('2d');

// eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, config);
};

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
                    type: 'time',
                    time: {
                        format: 'MM-DD HH:mm',
                        tooltipFormat: 'll HH:mm'
                    },
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
    for (let i = 0, listLen = list.length; i <listLen; i++) {
        item = list[i];

        datesetDates.push(new Date(item.dt_txt));
        datasetTemp.push(item.main.temp);
        datasetWind.push(item.wind.speed);
    }

    render(config);
};
