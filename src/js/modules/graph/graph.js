export {graph};

// import * as moment from 'moment';
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
                        format: timeFormat,
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

    debugger;
    render(config);
};


(function() {
    let Months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    let Samples = window.Samples || (window.Samples = {});
    Samples.utils = {
        // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
        srand: function(seed) {
            this._seed = seed;
        },

        rand: function(min, max) {
            let seed = this._seed;
            min = min === undefined? 0 : min;
            max = max === undefined? 1 : max;
            this._seed = (seed * 9301 + 49297) % 233280;
            return min + (this._seed / 233280) * (max - min);
        },

        numbers: function(config) {
            let cfg = config || {};
            let min = cfg.min || 0;
            let max = cfg.max || 1;
            let from = cfg.from || [];
            let count = cfg.count || 8;
            let decimals = cfg.decimals || 8;
            let continuity = cfg.continuity || 1;
            let dfactor = Math.pow(10, decimals) || 0;
            let data = [];
            let i;
            let value;

            for (i=0; i<count; ++i) {
                value = (from[i] || 0) + this.rand(min, max);
                if (this.rand() <= continuity) {
                    data.push(Math.round(dfactor * value) / dfactor);
                } else {
                    data.push(null);
                }
            }

            return data;
        },

        labels: function(config) {
            let cfg = config || {};
            let min = cfg.min || 0;
            let max = cfg.max || 100;
            let count = cfg.count || 8;
            let step = (max-min) / count;
            let decimals = cfg.decimals || 8;
            let dfactor = Math.pow(10, decimals) || 0;
            let prefix = cfg.prefix || '';
            let values = [];
            let i;

            for (i=min; i<max; i+=step) {
                values.push(prefix + Math.round(dfactor * i) / dfactor);
            }

            return values;
        },

        months: function(config) {
            let cfg = config || {};
            let count = cfg.count || 12;
            let section = cfg.section;
            let values = [];
            let i;
            let value;

            for (i=0; i<count; ++i) {
                value = Months[Math.ceil(i)%12];
                values.push(value.substring(0, section));
            }

            return values;
        },

        transparentize: function(color, opacity) {
            let alpha = opacity === undefined? 0.5 : 1 - opacity;
            return Chart.helpers.color(color).alpha(alpha).rgbString();
        },

        merge: Chart.helpers.configMerge
    };

    Samples.utils.srand(Date.now());
}());


let timeFormat = 'MM/DD/YYYY HH:mm';
