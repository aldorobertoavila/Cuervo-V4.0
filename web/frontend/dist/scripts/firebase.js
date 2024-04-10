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

    } catch (e) {
        console.error(e);
        loadElement.textContent = 'Error loading the Firebase SDK, check the console.';
    }
});