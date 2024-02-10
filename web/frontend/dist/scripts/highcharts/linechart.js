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
    const temperatures = Array.from({ length: 4 }, () => generateTemperature(20, 40, 30, 2));

    const minTemperature = Math.min(...temperatures);
    const maxTemperature = Math.max(...temperatures);
    const averageTemperature = calculateAverage(temperatures);

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

const chart = Highcharts.stockChart('container', {
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
    plotOptions: {
        series: {
            findNearestPointBy: 'xy',
            stickyTracking: false,
            cropThreshold: 1,
			dataGrouping: {
				enabled: false
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
                    tooltipContent += `<span style="color: ${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y}${this.series.tooltipOptions.valueSuffix}</b><br>`;
                } else if (point.series.type === 'arearange') {
                    tooltipContent += `<span style="color: ${point.color}">\u25CF</span> ${point.series.name}: <b>${point.point.low}${this.series.tooltipOptions.valueSuffix}</b> - <b>${point.point.high}${this.series.tooltipOptions.valueSuffix}</b><br>`;
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
                enabled: false
            },
            data: initialData.rangeSeries
        }
    ]
});

setInterval(function () {
    const [averageTemperature, minTemperature, maxTemperature] = generateTemperatures();
    const time = new Date().getTime();

    chart.series[1].addPoint([time, minTemperature, maxTemperature], true, true);
    chart.series[0].addPoint([time, averageTemperature], true, true);
}, 1000);