export default {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;
        const coachData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        try {
            const res = await fetch(`https://coach-finder-e361c.firebaseio.com/coaches/${userId}.json`, {
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
    }
};