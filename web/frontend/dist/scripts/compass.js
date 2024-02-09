setInterval(() => {
    let arrowElement = document.querySelector('.compass-arrow');
    let randomRotation = Math.floor(Math.random() * 360);

    arrowElement.style.transform = `rotate(${randomRotation}deg)`;
}, 2000);