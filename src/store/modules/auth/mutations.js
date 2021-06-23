export default {
    setUser(state, { token, userId }) {
        state.token = token;
        state.userId = userId;
        state.didAutoLogout = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
};
