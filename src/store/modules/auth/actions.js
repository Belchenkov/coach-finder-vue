export default {
    async login({ dispatch }, payload) {
        return dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup({ dispatch }, payload) {
        return dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async auth({ commit }, { mode, email, password }) {
        const key = 'AIzaSyDbQeUq2bYm0cwhn5wbZbiurugltmYnq-U';
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;

        if (mode === 'signup') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        }

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
            throw new Error(data.message || 'Failed to auth. Check your data.');
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
