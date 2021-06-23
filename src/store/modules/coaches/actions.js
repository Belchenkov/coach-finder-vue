export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters["auth/userId"];
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const token = context.rootGetters["auth/token"];
        console.log(userId, token)
        try {
            const res = await fetch(`https://coach-finder-e361c.firebaseio.com/coaches/${userId}.json?auth=${token}`, {
                method: 'PUT',
                body: JSON.stringify(coachData)
            });

            if (!res.ok) {
                // error ...
            }
        } catch (e) {
            console.log(e);
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
    async loadCoaches(context, payload) {
        if (payload.forceRefresh && !context.getters.shouldUpdate) return;

        const res = await fetch(`https://coach-finder-e361c.firebaseio.com/coaches.json`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch');
        }

        const coaches = [];

        for (const key in data) {
            const coach = {
                id: key,
                firstName: data[key].firstName,
                lastName: data[key].lastName,
                description: data[key].description,
                hourlyRate: data[key].hourlyRate,
                areas: data[key].areas
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
        context.commit('setFetchTimestamp');
    }
};
