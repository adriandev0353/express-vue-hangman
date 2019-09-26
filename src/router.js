import Vue from 'vue';
import Router from 'vue-router';
import Play from './views/Play.vue';
import Leader from './views/Leaderboard.vue';
import New from './views/New-word.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import Admin from './views/Admin.vue';
import Friends from './views/Friends.vue';
import Multiplayer from './views/Multiplayer.vue';
import Classic from './views/Classic.vue';
import axios from 'axios';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                title: 'Login'
            }
        },
        {
            path: '/multiplayer',
            name: 'multiplayer',
            component: Multiplayer,
            meta: {
                requiresAuth: true,
                title: 'Multiplayer'
            }
        },
        {
            path: '/classic',
            name: 'classic',
            component: Classic,
            meta: {
                requiresAuth: true,
                title: 'Classic'
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                adminAuth: true,
                title: 'Admin'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                title: 'Register'
            }
        },
        {
            path: '/leader',
            name: 'Leaderboard',
            component: Leader,
            meta: {
                requiresAuth: true,
                title: 'Leaderboard'
            }
        },
        {
            path: '/new/word',
            name: 'Add new word',
            component: New,
            meta: {
                requiresAuth: true,
                title: 'Add new word'
            }
        },
        {
            path: '/play',
            name: 'Play',
            component: Play,
            meta: {
                requiresAuth: true,
                title: 'Play'
            }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            meta: {
                requiresAuth: true,
                title: 'Profile'
            }
        },
        {
            path: '/friends',
            name: 'Friends',
            component: Friends,
            meta: {
                requiresAuth: true,
                title: 'Friends'
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
                    document.title = to.meta.title(to);
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
