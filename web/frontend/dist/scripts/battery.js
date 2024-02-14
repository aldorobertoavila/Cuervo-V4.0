setInterval(() => {
    let batteryLevelElement = document.querySelector(".battery__level");
    let numberElement = document.querySelector('.card__number--value');

    let randomLevel = Math.floor(Math.random() * 100);

    batteryLevelElement.style.height = randomLevel + "%";
    numberElement.textContent = randomLevel;

    if (randomLevel <= 10) {
        batteryLevelElement.className = "battery__level battery__level--fully_discharged";
    } else if (randomLevel <= 30) {
        batteryLevelElement.className = "battery__level battery__level--almost_discharged";
    } else if (randomLevel <= 50) {
        batteryLevelElement.className = "battery__level battery__level--mostly_charged";
    } else if (randomLevel <= 75) {
        batteryLevelElement.className = "battery__level battery__level--almost_charged";
    } else {
        batteryLevelElement.className = "battery__level battery__level--fully_charged";
    }

    let lastUpdateTimeElement = document.querySelector(".card__date-time");

    let currentTime = new Date();

    if (lastUpdateTimeElement.hasAttribute("datetime")) {
        let lastUpdateTimeString = lastUpdateTimeElement.getAttribute('datetime');
        let lastUpdateTime = new Date(lastUpdateTimeString);

        lastUpdateTimeElement.textContent = formatTimeDifference(currentTime, lastUpdateTime)
    } else {
        lastUpdateTimeElement.textContent = formatTimeDifference(currentTime, currentTime)
    }

    lastUpdateTimeElement.setAttribute('datetime', currentTime.toISOString());

}, 1500);

function formatTimeDifference(currentTime, lastUpdateTime) {
    let differenceInSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);

    let hours = Math.floor(differenceInSeconds / 3600);
    let minutes = Math.floor((differenceInSeconds % 3600) / 60);
    let seconds = differenceInSeconds % 60;

    if (hours > 0) {
        return hours + "h";
    } else if (minutes > 0) {
        return minutes + "m";
    }

    return seconds + "s";
}