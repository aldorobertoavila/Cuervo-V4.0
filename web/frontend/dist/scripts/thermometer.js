const temperatureConfig = {
	min: -20,
	max: 80,
	unit: "Celcius"
};

const thermometerColumnElement = document.querySelector(".thermometer__column");

setInterval(() => {
	const range = temperatureConfig.max - temperatureConfig.min;
	const randomTemperature = (Math.random() * range + temperatureConfig.min).toFixed(2);
	const adjustedHeight = (randomTemperature - temperatureConfig.min) / range * 100;

    thermometerColumnElement.style.height = adjustedHeight + "%";
	thermometerColumnElement.dataset.value = randomTemperature + "°C";
}, 1000);