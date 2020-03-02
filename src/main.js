import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCookies from 'vue-cookies';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({ // error reporting
    dsn: 'https://fd7f6f6e4edb4873b504d5e702731969@sentry.io/3111934',
    integrations: [new Integrations.Vue({Vue, attachProps: true, logErrors: true})],
});

Vue.use(VueCookies);


Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
