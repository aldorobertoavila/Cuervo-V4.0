function randomGaussian(mean, stdDev) {
    const theta = Math.cos(2.0 * Math.PI * Math.random());
    const rho = Math.sqrt(-2.0 * Math.log(Math.random()))

    return theta * rho * stdDev + mean;
}

function calculateAverage(numberArray) {
    const sum = numberArray.reduce((total, number) => total + number, 0);
    const average = sum / numberArray.length;

    return parseFloat(average.toFixed(2));
}

function generateRandomGaussian(min, max, mean, stdDev) {
    const number = Math.max(min, Math.min(max, randomGaussian(mean, stdDev)));

    return parseFloat(number.toFixed(2));
}

function generateTemperatures() {
    const rawTemperatures = Array.from({ length: 4 }, () => generateRandomGaussian(20, 40, 30, 2));

    const minTemperature = Math.min(...rawTemperatures);
    const maxTemperature = Math.max(...rawTemperatures);
    const averageTemperature = calculateAverage(rawTemperatures);

    return [rawTemperatures, averageTemperature, minTemperature, maxTemperature]
}

function createDefaultLineChartSettings(chartElement) {
    return {
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
            text: null
        },
        accessibility: {
            enabled: false
        },
        time: {
            useUTC: false
        },
        exporting: {
            buttons: {
                contextButton: {
                    menuItems: [
                        'viewFullscreen',
                        'separator',
                        'downloadPNG',
                        'downloadJPEG',
                        'downloadPDF',
                        'downloadSVG',
                        'separator',
                        'downloadCSV'
                    ]
                }
            }
        },
        yAxis: [],
        xAxis: {
            type: 'datetime',
            labels: {
                style: {
                    fontSize: '12px',
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
            formatter: function () {
                const datetime = Highcharts.dateFormat('%b %e, %Y %l:%M:%S %p UTC', this.x);

                let tooltipContent = `<span style="font-size: 12px">${datetime}</span><br>`;

                this.points.forEach((point) => {
                    const valueSuffix = point.series.options.valueSuffix;

                    if (point.series.type === 'line') {
                        tooltipContent += `<span style="color: ${point.color}">\u25CF</span> ${point.series.name}: <b>${point.y.toFixed(2)}${valueSuffix}</b><br>`;
                    } else if (point.series.type === 'arearange') {
                        tooltipContent += `<span style="color: ${point.color}">\u25CF</span> ${point.series.name}: <b>${point.point.low.toFixed(2)}${valueSuffix}</b> - <b>${point.point.high.toFixed(2)}${valueSuffix}</b><br>`;
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
        series: []
    };
}

function createMultiLineChart(chartElement, initialData) {
    const defaultSettings = createDefaultLineChartSettings(chartElement);

    const settings = Object.assign({}, defaultSettings, {
        yAxis: [
            {
                title: {
                    text: 'Voltage'
                },
                labels: {
                    format: '{value}V'
                },
                opposite: false,
                axisPosition: 'left',
                height: '33%',
                offset: 0
            },
            {
                title: {
                    text: 'Current'
                },
                labels: {
                    format: '{value}A'
                },
                opposite: false,
                axisPosition: 'left',
                top: '33%',
                height: '33%',
                offset: 0
            },
            {
                title: {
                    text: 'Power'
                },
                labels: {
                    format: '{value}W'
                },
                opposite: false,
                axisPosition: 'left',
                top: '66%',
                height: '33%',
                offset: 0
            }
        ],
        series: [
            {
                name: 'Voltage',
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: initialData.averageSeries,
                yAxis: 0,
                valueSuffix: "V"
            },
            {
                name: 'Current',
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: initialData.averageSeries,
                yAxis: 1,
                valueSuffix: "A"
            },
            {
                name: 'Power',
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: initialData.averageSeries,
                yAxis: 2,
                valueSuffix: "W"
            }
        ]
    });

    return Highcharts.stockChart(settings);
}

function createLineChart(chartElement, initialData) {
    const defaultSettings = createDefaultLineChartSettings(chartElement);

    const settings = Object.assign({}, defaultSettings, {
        yAxis: {
            opposite: false,
            axisPosition: 'left'
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
                data: initialData.averageSeries,
                valueSuffix: "°C"
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
                data: initialData.rangeSeries,
                valueSuffix: "°C"
            }
        ]
    });

    return Highcharts.stockChart(settings);
}

function generateInitialData() {
    const time = new Date().getTime();

    const series = { battery: { average: [], range: [], raw: [] } };

    for (let i = -3600; i < 0; i += 1) {
        const currentTime = time + i * 1000;

        const [rawTemperatures, averageTemperature, minTemperature, maxTemperature] = generateTemperatures();

        series.battery.average.push([currentTime, averageTemperature]);
        series.battery.range.push([currentTime, minTemperature, maxTemperature]);
        series.battery.raw.push([currentTime, rawTemperatures]);
    }

    return {
        battery: {
            current: {

            },
            power: 0, // MPPT
            temperature: {
                average: series.battery.average,
                range: series.battery.range,
                raw: series.battery.raw // Thermistors
            },
            voltage: 0, // MPPT
        },
        pv: {
            current: 0, // MPPT
            power: 0, // MPPT
            voltage: 0 // MPPT
        },
        motor: {
            speed: 0, // Hall effect sensor
            temperature: 0 // Thermistor
        }
    };
}

const initialData = generateInitialData();

const batteryLineChartElement = document.querySelector('.chart-block__line-chart--battery');
const motorLineChartElement = document.querySelector('.chart-block__line-chart--motor');
const pvLineChartElement = document.querySelector('.chart-block__line-chart--pv');

const batteryLineChart = createMultiLineChart(batteryLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });
const motorLineChart = createLineChart(motorLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });
const pvLineChart = createLineChart(pvLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });

setInterval(function () {
    const time = new Date().getTime();

    const [rawTemperatures, averageTemperature, minTemperature, maxTemperature] = generateTemperatures();

    const extremes = batteryLineChart.xAxis[0].getExtremes();
    const duration = extremes.max - extremes.min;
    const redraw = duration <= 15 * 60 * 1000;

    batteryLineChart.series[0].addPoint([time, averageTemperature], false, false);
    batteryLineChart.series[1].addPoint([time, averageTemperature], false, false);
    batteryLineChart.series[2].addPoint([time, averageTemperature], false, false);

    motorLineChart.series[0].addPoint([time, averageTemperature], false, false);
    motorLineChart.series[1].addPoint([time, minTemperature, maxTemperature], false, false);

    pvLineChart.series[0].addPoint([time, averageTemperature], false, false);
    pvLineChart.series[1].addPoint([time, minTemperature, maxTemperature], false, false);

    if (redraw) {
        batteryLineChart.redraw();
        motorLineChart.redraw();
        pvLineChart.redraw();
    }

}, 1100);