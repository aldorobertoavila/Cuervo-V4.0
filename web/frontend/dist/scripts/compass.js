setInterval(() => {
    const TRANSITION_TIME = 0.5;

    let arrowElement = document.querySelector('.compass-arrow');
    let randomRotation = Math.floor(Math.random() * 360);

    arrowElement.style.transition = `transform ${TRANSITION_TIME}s`;
    arrowElement.style.transform = `rotate(${randomRotation}deg)`;
}, 2000);