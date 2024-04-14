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

firebase.initializeApp(firebaseConfig);

const signInButtonElement = document.getElementById("sign-in-btn");

signInButtonElement.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider)
        .then((result) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            disclaimerElement = document.querySelector("card__disclaimer card__disclaimer--error");

            disclaimerElement.innerHTML = "No se pudo autenticar. Por favor, inténtalo de nuevo más tarde."
        });
})