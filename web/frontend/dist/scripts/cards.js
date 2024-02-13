function updateDaytime() {
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
}

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