export {graph};

import * as format from 'date-fns/format';
import * as Chart from 'chart.js/dist/Chart';
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

        let thisDate = format(new Date(item.dt_txt), 'MM-DD HH:mm');

        datesetDates.push(thisDate);
        datasetTemp.push(item.main.temp);
        datasetWind.push(item.wind.speed);
    }

    render(config);
};
