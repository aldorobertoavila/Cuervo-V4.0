setInterval(() => {
    let batteryLevelElement = document.querySelector(".battery__level");

    const randomLevel = Math.floor(Math.random() * 100);

    batteryLevelElement.style.height = randomLevel + "%";

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

}, 1500);