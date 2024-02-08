function updateCompassRotation() {
    let arrow = document.querySelector('.overview-section__compass-arrow');
    let randomRotation = Math.floor(Math.random() * 360);

    arrow.style.transition = "transform 0.5s";
    arrow.style.transform = 'rotate(' + randomRotation + 'deg)';
}

setInterval(updateCompassRotation, 2500);