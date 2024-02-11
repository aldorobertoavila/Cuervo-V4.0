function randomGaussian(mean, stdDev) {
    let theta = Math.cos(2.0 * Math.PI * Math.random());
    let rho = Math.sqrt(-2.0 * Math.log(Math.random()))

    return theta * rho * stdDev + mean;
}

function calculateAverage(numberArray) {
    const sum = numberArray.reduce((total, number) => total + number, 0);
    const average = sum / numberArray.length;

    return parseFloat(average.toFixed(2));
}

function generateTemperature(min, max, mean, stdDev) {
    const temperature = Math.max(min, Math.min(max, randomGaussian(mean, stdDev)));

    return parseFloat(temperature.toFixed(2));
}

function generateTemperatures() {
    const rawTemperatures = Array.from({ length: 4 }, () => generateTemperature(20, 40, 30, 2));

    const minTemperature = Math.min(...rawTemperatures);
    const maxTemperature = Math.max(...rawTemperatures);
    const averageTemperature = calculateAverage(rawTemperatures);

    return [averageTemperature, minTemperature, maxTemperature]
}

function generateInitialData() {
    const series = { averageSeries: [], rangeSeries: [] };
    const time = new Date().getTime();

    for (let i = -3600; i < 0; i += 1) {
        const [averageTemperature, minTemperature, maxTemperature] = generateTemperatures();
        const currentTime = time + i * 1000;

        series.averageSeries.push([currentTime, averageTemperature]);
        series.rangeSeries.push([currentTime, minTemperature, maxTemperature]);
    }

    return series;
}

const initialData = generateInitialData();

const chartElement = document.querySelector('.line-chart--pv-current');

const chart = Highcharts.stockChart({
    chart: {
        renderTo: chartElement,
        zooming: {
            mouseWheel: {
                enabled: false,
            }
        },
        alignTicks: false
    },
    title: {
        text: 'Live random data'
    },
    accessibility: {
        enabled: false
    },
    time: {
        useUTC: false
    },
    exporting: {
        enabled: false
    },
    yAxis: {
        opposite: false,
        axisPosition: 'left'
    },
    xAxis: {
        type: 'datetime',
        labels: {
            rotation: -45,
            style: {
                fontSize: '10px',
                textAlign: 'center',
                verticalAlign: 'middle'
            }
        },
        dateTimeLabelFormats: {
            second: '%H:%M:%S',
            minute: '%H:%M:%S',
            hour: '%H:%M',
            day: '%Y-%m-%d',
            week: '%Y-%m-%d',
            month: '%Y-%m',
            year: '%Y'
        },
        tickInterval: 1000,
        events: {
            afterSetExtremes: function () {
                const extremes = this.getExtremes();
                const interval = extremes.max - extremes.min;

                const secondInterval = 1000;
                const minuteInterval = 60 * secondInterval;
                const hourInterval = 60 * minuteInterval;

                let tickInterval = secondInterval;

                if (interval <= secondInterval) {
                    tickInterval = secondInterval;
                } else if (interval <= minuteInterval) {
                    tickInterval = 5 * secondInterval;
                } else if (interval <= 5 * minuteInterval) {
                    tickInterval = minuteInterval;
                } else if (interval <= 15 * minuteInterval) {
                    tickInterval = minuteInterval;
                } else if (interval <= hourInterval) {
                    tickInterval = 5 * minuteInterval;
                }

                const min = Math.floor(extremes.min / tickInterval) * tickInterval;
                const max = Math.ceil(extremes.max / tickInterval) * tickInterval;

                this.update({ tickInterval, min, max }, true, false);
            }
        }
    },
    plotOptions: {
        series: {
            findNearestPointBy: 'xy',
            stickyTracking: false,
            cropThreshold: 1,
            dataGrouping: {
                enabled: true,
                units: [
                    ['minute', [1, 5, 10, 15, 30, 45]],
                    ['hour', [1, 6, 12]],
                    ['day', [1]]
                ]
            }
        }
    },
    tooltip: {
        shared: true,
        valueDecimals: 2,
        valueSuffix: '°C',
        formatter: function () {
            let datetime = Highcharts.dateFormat('%b %e, %Y %l:%M:%S %p UTC', this.x);

            let tooltipContent = `<span style="font-size: 12px">${datetime}</span><br>`;

            this.points.forEach((point) => {
                if (point.series.type === 'line') {
                    tooltipContent += `<span style="color: ${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y.toFixed(2)}${this.series.tooltipOptions.valueSuffix}</b><br>`; // Limiting to 2 decimals
                } else if (point.series.type === 'arearange') {
                    tooltipContent += `<span style="color: ${point.color}">\u25CF</span> ${point.series.name}: <b>${point.point.low.toFixed(2)}${this.series.tooltipOptions.valueSuffix}</b> - <b>${point.point.high.toFixed(2)}${this.series.tooltipOptions.valueSuffix}</b><br>`; // Limiting to 2 decimals
                }
            });

            return tooltipContent;
        },
    },
    rangeSelector: {
        buttons: [{
            count: 1,
            type: 'minute',
            text: '1m'
        },
        {
            count: 5,
            type: 'minute',
            text: '5m'
        },
        {
            count: 15,
            type: 'minute',
            text: '15m'
        },
        {
            count: 30,
            type: 'minute',
            text: '30m'
        },
        {
            count: 1,
            type: 'hour',
            text: '1h'
        },
        {
            type: 'all',
            text: 'All'
        }],
        inputEnabled: true,
        selected: 0
    },
    series: [
        {
            name: 'Average Temperature',
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            },
            data: initialData.averageSeries
        },
        {
            name: 'Temperature Range',
            type: 'arearange',
            lineWidth: 0,
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            },
            data: initialData.rangeSeries
        }
    ]
});

setInterval(function () {
    const [averageTemperature, minTemperature, maxTemperature] = generateTemperatures();
    const time = new Date().getTime();

    const extremes = chart.xAxis[0].getExtremes();
    const duration = extremes.max - extremes.min;
    const redraw = duration <= 15 * 60 * 1000;

    chart.series[1].addPoint([time, minTemperature, maxTemperature], redraw, true);
    chart.series[0].addPoint([time, averageTemperature], redraw, true);
}, 1000);