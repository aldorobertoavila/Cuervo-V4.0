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
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: [],
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
                data: [],
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
                data: [],
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
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: [],
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
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: [],
                yAxis: 1,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Battery 1',
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: [],
                yAxis: 0,
                valueSuffix: "°C"
            },
            {
                name: 'Temperature Battery 2',
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
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
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: [],
                yAxis: 1,
                valueSuffix: "°C"
            },
            {
                name: 'Speed',
                zIndex: 1,
                marker: {
                    symbol: 'circle',
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: null
                },
                data: [],
                yAxis: 0,
                valueSuffix: "km/h"
            }
        ]
    });

    return Highcharts.stockChart(settings);
}

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBx5LuKE0u4o25-9ra5AUQ2UnnalLQ-MNc",
    authDomain: "cuervo-v4.firebaseapp.com",
    databaseURL: "https://cuervo-v4-default-rtdb.firebaseio.com",
    projectId: "cuervo-v4",
    storageBucket: "cuervo-v4.appspot.com",
    messagingSenderId: "54664465469",
    appId: "1:54664465469:web:8f22fcd96555a0a7f4ee54",
    measurementId: "G-3PV4JYTKH2"

};

const MAX_INTERVAL_DURATION = 15 * 60 * 1000;

firebase.initializeApp(FIREBASE_CONFIG);

firebase.auth().onAuthStateChanged((user) => {
    const photoElement = document.getElementById("photo");

    if (user) {
        photoElement.src = user.photoURL;
    } else {
        window.location.href = "login.html";
        photoElement.src = "/images/account_circle.png";
    }
});

const logoutButtonElement = document.getElementById('logout');

logoutButtonElement.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("El usuerio ha cerrado sesión exitosamente");
    }).catch((error) => {
        console.error("Hubo un error al cerrar sessión:", error);
    });
});

const batteryCardElement = document.querySelector(".overview-section__card--battery");
const headingCardElement = document.querySelector(".overview-section__card--heading");
const linearSpeedCardElement = document.querySelector(".overview-section__card--linear-speed");
const solarPanelPowerCardElement = document.querySelector(".overview-section__card--solar-panel");
const temperatureCardElement = document.querySelector(".overview-section__card--temperature");

const batteryContentSectionElement = document.querySelector('.collapsible-content-section__body--battery');
const solarPannelContentSectionElement = document.querySelector('.collapsible-content-section__body--pv');
const motorContentSectionElement = document.querySelector('.collapsible-content-section__body--motor');

const batteryChargingLineChartElement = document.querySelector('.chart-block__line-chart--battery-charging');
const batteryTemperatureLineChartElement = document.querySelector('.chart-block__line-chart--battery-temperature');
const motorLineChartElement = document.querySelector('.chart-block__line-chart--motor');
const solarPanelLineChartElement = document.querySelector('.chart-block__line-chart--pv');

const batteryChargingLineChart = createBatteryChargingLineChart(batteryChargingLineChartElement, {});
const batteryTemperatureLineChart = createBatteryTemperatureLineChart(batteryTemperatureLineChartElement, {});
const solarPanelLineChart = createBatteryChargingLineChart(solarPanelLineChartElement, {});
const motorLineChart = createMotorLineChart(motorLineChartElement, {});

var dataRef = firebase.database().ref('/data');

dataRef.limitToLast(1).on('child_added', (snapshot) => {
    const formatTimeDifference = (newDateTime, oldDateTime) => {
        const differenceInSeconds = Math.floor((newDateTime - oldDateTime) / 1000);

        const hours = Math.floor(differenceInSeconds / 3600);
        const minutes = Math.floor((differenceInSeconds % 3600) / 60);
        const seconds = differenceInSeconds % 60;

        if (hours > 0) {
            return hours + "h";
        } else if (minutes > 0) {
            return minutes + "m";
        }

        return seconds + "s";
    }

    const shouldRedrawChart = (section, chart, intervalDuration) => {
        const extremes = chart.xAxis[0].getExtremes();
        const duration = extremes.max - extremes.min;

        return section.style.opacity == '1' && duration <= intervalDuration;
    };

    const updateCard = (cardElement, numberValue) => {
        const numberElement = cardElement.querySelector('.number-block__value');
        const timeElement = cardElement.querySelector(".card__date-time");

        numberElement.textContent = numberValue;

        const currentTime = new Date();

        if (timeElement.hasAttribute("datetime")) {
            const lastUpdateTimeString = timeElement.getAttribute('datetime');
            const lastUpdateTime = new Date(lastUpdateTimeString);

            timeElement.textContent = formatTimeDifference(currentTime, lastUpdateTime)
        } else {
            timeElement.textContent = formatTimeDifference(currentTime, currentTime)
        }

        timeElement.setAttribute('datetime', currentTime.toISOString());
    }

    const updateSeries = (chart, seriesIndex, time, ...data) => {
        chart.series[seriesIndex].addPoint([time, ...data], false, false);
    };

    const roundFloat = (value, decimals) => parseFloat(value.toFixed(decimals));

    const data = snapshot.val();

    const date = new Date(snapshot.key);
    const time = date.getTime();

    updateCard(batteryCardElement, roundFloat(data.battery_level, 2));
    updateCard(linearSpeedCardElement, roundFloat(data.linear_speed, 2));
    updateCard(temperatureCardElement, roundFloat(data.motor_temperature, 2));
    updateCard(headingCardElement, roundFloat(data.heading, 2));
    updateCard(solarPanelPowerCardElement, roundFloat(data.solar_panel_power, 2));

    updateSeries(batteryChargingLineChart, 0, time, roundFloat(data.battery_bank_voltage, 2));
    updateSeries(batteryChargingLineChart, 1, time, roundFloat(data.battery_bank_current, 2));
    updateSeries(batteryChargingLineChart, 2, time, roundFloat(data.battery_bank_power, 2));

    updateSeries(batteryTemperatureLineChart, 0, time, roundFloat(data.battery_temperature_average, 2));
    updateSeries(batteryTemperatureLineChart, 1, time, roundFloat(data.battery_temperature_min, 2), roundFloat(data.battery_temperature_max, 2));
    updateSeries(batteryTemperatureLineChart, 2, time, roundFloat(data.battery_temperature1, 2));
    updateSeries(batteryTemperatureLineChart, 3, time, roundFloat(data.battery_temperature2, 2));

    updateSeries(solarPanelLineChart, 0, time, roundFloat(data.battery_bank_voltage, 2));
    updateSeries(solarPanelLineChart, 1, time, roundFloat(data.battery_bank_current, 2));
    updateSeries(solarPanelLineChart, 2, time, roundFloat(data.battery_bank_power, 2));

    updateSeries(motorLineChart, 0, time, roundFloat(data.motor_temperature, 2));
    updateSeries(motorLineChart, 1, time, roundFloat(data.linear_speed, 2));

    if (shouldRedrawChart(batteryContentSectionElement, batteryChargingLineChart, MAX_INTERVAL_DURATION)) {
        batteryChargingLineChart.redraw();
    }

    if (shouldRedrawChart(batteryContentSectionElement, batteryTemperatureLineChart, MAX_INTERVAL_DURATION)) {
        batteryTemperatureLineChart.redraw();
    }

    if (shouldRedrawChart(solarPannelContentSectionElement, solarPanelLineChart, MAX_INTERVAL_DURATION)) {
        solarPanelLineChart.redraw();
    }

    if (shouldRedrawChart(motorContentSectionElement, motorLineChart, MAX_INTERVAL_DURATION)) {
        motorLineChart.redraw();
    }
});