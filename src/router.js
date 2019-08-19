import Vue from 'vue';
import Router from 'vue-router';
import Play from './views/Play.vue';
import Leader from './views/Leaderboard.vue';
import New from './views/New-word.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Play',
            component: Play
        },
        {
            path: '/about',
            name: 'Leaderboard',
            component: Leader
        },
        {
            path: '/new/word',
            name: 'Add new word',
            component: New
        }
    ]
});
