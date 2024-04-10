function calculateAverage(numberArray) {
    const sum = numberArray.reduce((total, number) => total + number, 0);
    const average = sum / numberArray.length;

    return parseFloat(average.toFixed(2));
}

function generateTemperatures() {
    const rawTemperatures = Array.from({ length: 4 }, () => Math.random() * 100);

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
        legend: {
            enabled: true
        },
        credits: {
            enabled: false
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
                stickyTracking: true,
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

function createDefaultMarkerSettings() {
    return {
        symbol: 'circle',
        fillColor: 'white',
        lineWidth: 2,
        lineColor: null
    }
}

function createBatteryChargingLineChart(chartElement, initialData) {
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
                marker: createDefaultMarkerSettings(),
                data: initialData.averageSeries,
                yAxis: 0,
                valueSuffix: "V"
            },
            {
                name: 'Current',
                marker: createDefaultMarkerSettings(),
                data: initialData.averageSeries,
                yAxis: 1,
                valueSuffix: "A"
            },
            {
                name: 'Power',
                marker: createDefaultMarkerSettings(),
                data: initialData.averageSeries,
                yAxis: 2,
                valueSuffix: "W"
            }
        ]
    });

    return Highcharts.stockChart(settings);
}

function createBatteryTemperatureLineChart(chartElement, initialData) {
    const defaultSettings = createDefaultLineChartSettings(chartElement);

    const settings = Object.assign({}, defaultSettings, {
        yAxis: [
            {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    format: '{value}°C'
                },
                opposite: false,
                axisPosition: 'left',
                height: '50%',
                top: '50%',
                offset: 0
            },
            {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    format: '{value}°C'
                },
                opposite: false,
                axisPosition: 'left',
                height: '50%',
                offset: 0
            }
        ],
        series: [
            {
                name: 'Average Temperature',
                zIndex: 1,
                marker: createDefaultMarkerSettings(),
                data: initialData.averageSeries,
                yAxis: 1,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Range',
                type: 'arearange',
                lineWidth: 0,
                color: Highcharts.getOptions().colors[0],
                fillOpacity: 0.3,
                zIndex: 0,
                marker: createDefaultMarkerSettings(),
                data: initialData.rangeSeries,
                yAxis: 1,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Battery 1',
                marker: createDefaultMarkerSettings(),
                data: [],
                yAxis: 0,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Battery 2',
                marker: createDefaultMarkerSettings(),
                data: [],
                yAxis: 0,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Battery 3',
                marker: createDefaultMarkerSettings(),
                data: [],
                yAxis: 0,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Battery 4',
                marker: createDefaultMarkerSettings(),
                data: [],
                yAxis: 0,
                valueSuffix: "°C"
            }
        ]
    });

    return Highcharts.stockChart(settings);
}

function createMotorLineChart(chartElement, initialData) {
    const defaultSettings = createDefaultLineChartSettings(chartElement);

    const settings = Object.assign({}, defaultSettings, {
        yAxis: [
            {
                title: {
                    text: 'Speed'
                },
                labels: {
                    format: '{value}km/h'
                },
                opposite: false,
                axisPosition: 'left',
                height: '50%',
                offset: 0
            },
            {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    format: '{value}°C'
                },
                opposite: false,
                axisPosition: 'left',
                height: '50%',
                top: '50%',
                offset: 0
            }
        ],
        series: [
            {
                name: 'Temperature',
                zIndex: 1,
                marker: createDefaultMarkerSettings(),
                data: initialData.averageSeries,
                yAxis: 1,
                valueSuffix: "°C"
            },
            {
                name: 'Speed',
                zIndex: 1,
                marker: createDefaultMarkerSettings(),
                data: initialData.averageSeries,
                yAxis: 0,
                valueSuffix: "km/h"
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

const batteryContentSectionElement = document.querySelector('.collapsible-content-section__body--battery');
const pvContentSectionElement = document.querySelector('.collapsible-content-section__body--pv');
const motorContentSectionElement = document.querySelector('.collapsible-content-section__body--motor');

const batteryChargingLineChartElement = document.querySelector('.chart-block__line-chart--battery-charging');
const batteryTemperatureLineChartElement = document.querySelector('.chart-block__line-chart--battery-temperature');
const motorLineChartElement = document.querySelector('.chart-block__line-chart--motor');
const pvLineChartElement = document.querySelector('.chart-block__line-chart--pv');

const batteryChargingLineChart = createBatteryChargingLineChart(batteryChargingLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });
const batteryTemperatureLineChart = createBatteryTemperatureLineChart(batteryTemperatureLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });
const pvLineChart = createBatteryChargingLineChart(pvLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });
const motorLineChart = createMotorLineChart(motorLineChartElement, { averageSeries: initialData.battery.temperature.average, rangeSeries: initialData.battery.temperature.range });

setInterval(() => {
    const updateSeries = (chart, seriesIndex, time, ...data) => {
        chart.series[seriesIndex].addPoint([time, ...data], false, false);
    };

    const shouldRedrawChart = (section, chart, intervalDuration) => {
        const extremes = chart.xAxis[0].getExtremes();
        const duration = extremes.max - extremes.min;

        return section.style.opacity == '1' && duration <= intervalDuration;
    };

    const MAX_INTERVAL_DURATION = 15 * 60 * 1000;

    const time = new Date().getTime();

    const [rawTemperatures, averageTemperature, minTemperature, maxTemperature] = generateTemperatures();
    const [batteryTemperature1, batteryTemperature2, batteryTemperature3, batteryTemperature4] = rawTemperatures;

    updateSeries(batteryChargingLineChart, 0, time, averageTemperature);
    updateSeries(batteryChargingLineChart, 1, time, averageTemperature);
    updateSeries(batteryChargingLineChart, 2, time, averageTemperature);

    updateSeries(batteryTemperatureLineChart, 0, time, averageTemperature);
    updateSeries(batteryTemperatureLineChart, 1, time, minTemperature, maxTemperature);
    updateSeries(batteryTemperatureLineChart, 2, time, batteryTemperature1);
    updateSeries(batteryTemperatureLineChart, 3, time, batteryTemperature2);
    updateSeries(batteryTemperatureLineChart, 4, time, batteryTemperature3);
    updateSeries(batteryTemperatureLineChart, 5, time, batteryTemperature4);

    updateSeries(pvLineChart, 0, time, averageTemperature);
    updateSeries(pvLineChart, 1, time, averageTemperature);
    updateSeries(pvLineChart, 2, time, averageTemperature);

    updateSeries(motorLineChart, 0, time, averageTemperature);
    updateSeries(motorLineChart, 1, time, averageTemperature);

    if (shouldRedrawChart(batteryContentSectionElement, batteryChargingLineChart, MAX_INTERVAL_DURATION)) {
        batteryChargingLineChart.redraw();
    }

    if (shouldRedrawChart(batteryContentSectionElement, batteryTemperatureLineChart, MAX_INTERVAL_DURATION)) {
        batteryTemperatureLineChart.redraw();
    }

    if (shouldRedrawChart(pvContentSectionElement, pvLineChart, MAX_INTERVAL_DURATION)) {
        pvLineChart.redraw();
    }

    if (shouldRedrawChart(motorContentSectionElement, motorLineChart, MAX_INTERVAL_DURATION)) {
        motorLineChart.redraw();
    }

}, 1100);