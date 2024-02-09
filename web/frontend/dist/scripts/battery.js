setInterval(() => {
    let levelElement = document.querySelector(".battery__level");
    let randomLevel = Math.floor(Math.random() * 100);

    levelElement.style.height = randomLevel + "%";

    if (randomLevel <= 10) {
        levelElement.className = "battery__level battery__level--fully_discharged";
    } else if (randomLevel <= 30) {
        levelElement.className = "battery__level battery__level--almost_discharged";
    } else if (randomLevel <= 50) {
        levelElement.className = "battery__level battery__level--mostly_charged";
    } else if (randomLevel <= 75) {
        levelElement.className = "battery__level battery__level--almost_charged";
    } else {
        levelElement.className = "battery__level battery__level--fully_charged";
    }

}, 1000);