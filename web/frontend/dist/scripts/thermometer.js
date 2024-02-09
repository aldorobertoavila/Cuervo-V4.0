const UNITS = {
	Celcius: "°C",
	Fahrenheit: "°F"
};

let temperatureConfig = {
	min: -20,
	max: 80,
	unit: "Celcius"
};

setInterval(() => {
	let columnElement = document.querySelector(".thermometer__column");

	let range = temperatureConfig.max - temperatureConfig.min;
	let randomTemperature = (Math.random() * range + temperatureConfig.min).toFixed(2);
	let adjustedHeight = (randomTemperature - temperatureConfig.min) / range * 100;

    columnElement.style.height = adjustedHeight + "%";
	columnElement.dataset.value = randomTemperature + UNITS[temperatureConfig.unit];
}, 1000);