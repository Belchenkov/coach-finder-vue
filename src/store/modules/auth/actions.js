export default {
    async login() {

    },
    async signup({ commit }, { email, password }) {
        const key = 'AIzaSyDbQeUq2bYm0cwhn5wbZbiurugltmYnq-U';
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to authenticate.');
        }

        console.log(data);
        commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: data.expiresIn,
        })
    },
};
