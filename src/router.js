import Vue from 'vue';
import Router from 'vue-router';
import Play from './views/Play.vue';
import Leader from './views/Leaderboard.vue';
import New from './views/New-word.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
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
