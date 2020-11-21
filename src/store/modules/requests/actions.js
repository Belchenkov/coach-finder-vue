export default {
    contactCoach({ commit }, { coachId, email, message }) {
        const newRequest = {
            id: new Date().toISOString(),
            coachId: coachId,
            userEmail: email,
            message,
        };

        commit('addRequest', newRequest);
    }
}