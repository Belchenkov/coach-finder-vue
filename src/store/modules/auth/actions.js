export default {
    async login({ commit }, { email, password }) {
        const key = 'AIzaSyDbQeUq2bYm0cwhn5wbZbiurugltmYnq-U';
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

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
            throw new Error(data.message || 'Failed to login.');
        }

        commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: data.expiresIn,
        });
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

        commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: data.expiresIn,
        })
    },
    logout({ commit }) {
        commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }
};
