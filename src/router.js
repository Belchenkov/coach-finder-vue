import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from "vue-router";

import store from './store';

const CoachDetail = defineAsyncComponent(() => import('@/pages/coaches/CoachDetail'));
const CoachRegistration = defineAsyncComponent(() => import('@/pages/coaches/CoachRegistration'));
const ContactCoach = defineAsyncComponent(() => import('@/pages/requests/ContactCoach'));
const CoachesList = defineAsyncComponent(() => import('@/pages/coaches/CoachesList'));
const RequestsReceived = defineAsyncComponent(() => import('@/pages/requests/RequestsReceived'));
const UserAuth = defineAsyncComponent(() => import('@/pages/auth/UserAuth'));
const NotFound = defineAsyncComponent(() => import('@/pages/NotFound'));

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