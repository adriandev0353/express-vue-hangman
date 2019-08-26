import Vue from 'vue';
import router from './router';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

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
    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
