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

// TODO: return a function to prevent query selector calls
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

const speedCardElement = document.querySelector(".overview-section__card--speed");
const temperatureCardElement = document.querySelector(".overview-section__card--temperature");
const orientationCardElement = document.querySelector(".overview-section__card--orientation");
const batteryCardElement = document.querySelector(".overview-section__card--battery");
const pvCardElement = document.querySelector(".overview-section__card--pv");

setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 100);

    updateCard(batteryCardElement, randomNumber);
    updateCard(speedCardElement, randomNumber);
    updateCard(temperatureCardElement, randomNumber);
    updateCard(orientationCardElement, randomNumber);
    updateCard(pvCardElement, randomNumber);

}, 1100);
