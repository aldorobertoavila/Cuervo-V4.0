setInterval(() => {
    let arrow = document.querySelector('.compass-arrow');
    let randomRotation = Math.floor(Math.random() * 360);

    arrow.style.transition = "transform 0.5s";
    arrow.style.transform = 'rotate(' + randomRotation + 'deg)';
}, 2500);