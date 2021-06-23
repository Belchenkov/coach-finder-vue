export default {
    setUser(state, { token, userId }) {
        state.token = token;
        state.userId = userId;
    }
};
