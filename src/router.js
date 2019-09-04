import Vue from 'vue';
import Router from 'vue-router';
import Play from './views/Play.vue';
import Leader from './views/Leaderboard.vue';
import New from './views/New-word.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import Admin from './views/Admin.vue';
import axios from 'axios';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                adminAuth: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/leader',
            name: 'Leaderboard',
            component: Leader,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/new/word',
            name: 'Add new word',
            component: New,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/play',
            name: 'Play',
            component: Play,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        const token = localStorage['token'];
        axios
            .post('https://hangman-webapp.herokuapp.com/api/token/check', token)
            .then(results => {
                const response = results.data;
                const auth = response.success;

                if (!auth) {
                    next({
                        path: '/',
                        query: { redirect: to.fullPath }
                    });
                } else {
                    next();
                }
            });
    } else if (to.matched.some(record => record.meta.adminAuth)) {
        const token = localStorage['token'];
        axios
            .post('https://hangman-webapp.herokuapp.com/api/token/check', token)
            .then(results => {
                const response = results.data;
                const auth = response.success;
                const user = response.user;

                if (!auth) {
                    next({
                        path: '/',
                        query: { redirect: to.fullPath }
                    });
                } else if (user === 'admin') {
                    next();
                } else {
                    next({
                        path: '/',
                        query: { redirect: to.fullPath }
                    });
                }
            });
    } else {
        next();
    };
});
export default router;
