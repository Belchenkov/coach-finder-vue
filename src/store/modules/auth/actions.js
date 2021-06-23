let timer;

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
    async auth({ commit, dispatch }, { mode, email, password }) {
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

        const expiresIn = +data.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('tokenExpiration', expirationDate);

        timer = setTimeout(() => {
            dispatch('autoLogout');
        }, expiresIn);

        commit('setUser', {
            token: data.idToken,
            userId: data.localId
        })
    },
    tryLogin({ commit, dispatch }) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            dispatch('autoLogout');
        }, expiresIn);

        if (token && userId) {
            commit('setUser', {
                token,
                userId
            })
        }
    },
    logout({ commit }) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');

        clearTimeout(timer);

        commit('setUser', {
            token: null,
            userId: null
        });
    },
    autoLogout({ commit, dispatch }) {
        dispatch('logout');
        commit('setAutoLogout');
    }
};
