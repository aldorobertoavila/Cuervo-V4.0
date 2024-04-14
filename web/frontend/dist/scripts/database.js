const firebaseConfig = {
    apiKey: "AIzaSyBx5LuKE0u4o25-9ra5AUQ2UnnalLQ-MNc",
    authDomain: "cuervo-v4.firebaseapp.com",
    databaseURL: "https://cuervo-v4-default-rtdb.firebaseio.com",
    projectId: "cuervo-v4",
    storageBucket: "cuervo-v4.appspot.com",
    messagingSenderId: "54664465469",
    appId: "1:54664465469:web:8f22fcd96555a0a7f4ee54",
    measurementId: "G-3PV4JYTKH2"
};

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

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
    const photoElement = document.getElementById("photo");

    if (user) {
        photoElement.src = user.photoURL;
    } else {
        window.location.href = "login.html";
        photoElement.src = "/images/account_circle.png";
    }
});

const logoutButtonElement = document.getElementById('logout');

logoutButtonElement.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("El usuerio ha cerrado sesión exitosamente");
    }).catch((error) => {
        console.error("Hubo un error al cerrar sessión:", error);
    });
});

const database = firebase.database();
const dataRef = database.ref('data');

const batteryCardElement = document.querySelector(".overview-section__card--battery-level");
const headingCardElement = document.querySelector(".overview-section__card--heading");
const linearSpeedCardElement = document.querySelector(".overview-section__card--linear-speed");
const solarPanelPowerCardElement = document.querySelector(".overview-section__card--pv-power");
const temperatureCardElement = document.querySelector(".overview-section__card--temperature");

dataRef.on('child_added', (snapshot) => {
    const data = snapshot.val();

    updateCard(batteryCardElement, data.battery_level);
    updateCard(linearSpeedCardElement, data.linear_speed);
    updateCard(temperatureCardElement, data.motor_temperature);
    updateCard(headingCardElement, data.heading);
    updateCard(solarPanelPowerCardElement, data.solar_panel_power);
});