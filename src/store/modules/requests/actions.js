export default {
    async contactCoach({ commit }, { coachId, email, message }) {
        const newRequest = {
            userEmail: email,
            message,
        };

        const res = await fetch(`https://coach-finder-e361c.firebaseio.com/requests/${coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to send request.');
        }

        newRequest.id = data.name;
        newRequest.coachId = coachId;

        commit('addRequest', newRequest);
    },
    async fetchRequests({ rootGetters, commit }) {
        const coachId = rootGetters["auth/userId"];
        const token = rootGetters["auth/token"];

        const res = await fetch(`https://coach-finder-e361c.firebaseio.com/requests/${coachId}.json?auth=${token}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch requests.');
        }

        const requests = [];

        for (const key in data) {
            const request = {
                id: key,
                coachId,
                userEmail: data[key].userEmail,
                message: data[key].message
            };
            requests.push(request);
        }
        commit('setRequests', requests);
    }
}