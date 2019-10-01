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
            component: Login
        },
        {
            path: '/multiplayer',
            name: 'multiplayer',
            component: Multiplayer,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/classic',
            name: 'classic',
            component: Classic,
            meta: {
                requiresAuth: true
            }
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
        },
        {
            path: '/friends',
            name: 'Friends',
            component: Friends,
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
        tokenCheck().then(results => {
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
        tokenCheck().then(results => {
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

const tokenCheck = async () => {
    const token = localStorage['token'];
    const config = {
        method: 'post',
        url: 'https://hangman-webapp.herokuapp.com/api/token/check',
        headers: { auth: token },
        data: { user: localStorage['user'] }
    };
    // eslint-disable-next-line no-return-await
    return await axios(config);
};
export default router;
