const { beforeUserCreated, beforeUserSignedIn, HttpsError } = require("firebase-functions/v2/identity");

function belongsToOrganization(user) {
    return user?.email?.includes('@ut-tijuana.edu.mx');
}

export const checkBeforeUserCreated = beforeUserCreated((event) => {
    const user = event.data;

    if (!belongsToOrganization(user)) {
        throw new HttpsError('invalid-argument', 'Unauthorized email');
    }

    return {
        emailVerified: true,
    };
});

export const checkBeforeUserSignedIn = beforeUserSignedIn((event) => {
    const user = event.data;

    if (!user.emailVerified || !belongsToOrganization(user)) {
        throw new HttpsError('invalid-argument', 'Unauthorized email');
    }

    return Promise.resolve();
});