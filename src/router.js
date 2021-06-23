import { createRouter, createWebHistory } from "vue-router";

import store from './store';

import NotFound from "@/pages/NotFound";
import CoachesList from "@/pages/coaches/CoachesList";
import CoachDetail from "@/pages/coaches/CoachDetail";
import CoachRegistration from "@/pages/coaches/CoachRegistration";
import ContactCoach from "@/pages/requests/ContactCoach";
import RequestsReceived from "@/pages/requests/RequestsReceived";
import UserAuth from "@/pages/auth/UserAuth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/coaches',
        },
        {
            path: '/coaches',
            component: CoachesList,
        },
        {
            path: '/coaches/:id',
            component: CoachDetail,
            props: true,
            children: [
                {
                    path: 'contact',
                    component: ContactCoach
                },
            ]
        },
        {
            path: '/register',
            component: CoachRegistration,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/requests',
            component: RequestsReceived,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/auth',
            component: UserAuth,
            meta: {
                requiresUnAuth: true
            }
        },
        {
            path: '/:notFound(.*)',
            component: NotFound
        }
    ]
});

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters["auth/isAuth"]) {
        next('/auth');
    } else if (to.meta.requiresUnAuth && store.getters["auth/isAuth"]) {
        next('/coaches')
    } else {
        next();
    }
});

export default router;