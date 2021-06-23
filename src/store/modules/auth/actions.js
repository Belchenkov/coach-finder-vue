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

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', data.expiresIn);

        commit('setUser', {
            token: data.idToken,
            userId: data.localId,
            tokenExpiration: data.expiresIn,
        })
    },
    tryLogin({ commit }) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (token && userId) {
            commit('setUser', {
                token,
                userId,
                tokenExpiration: null
            })
        }
    },
    logout({ commit }) {
        commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        });
    }
};
