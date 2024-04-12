document.addEventListener('DOMContentLoaded', function () {
    const loadElement = document.querySelector('#load');

    try {
        let app = firebase.app();
        let features = [
            'auth',
            'database',
            'firestore',
            'functions',
            'messaging',
            'storage',
            'analytics',
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        loadElement.textContent = `Firebase SDK loaded with ${features.join(', ')}`;

        const database = app.database();

        const databaseRef = database.ref('/data');

        databaseRef.on('child_added', function (snapshot) {
            console.log("New child added:", snapshot.key, snapshot.val());
        });

    } catch (e) {
        console.error(e);
        loadElement.textContent = 'Error loading the Firebase SDK, check the console.';
    }
});