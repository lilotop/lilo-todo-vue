import Vue from 'vue';
import VueRouter from 'vue-router';
import Todos from '../views/Todos';
import Projects from '../views/Projects';
import About from '../views/About';
import Login from '../views/Login';
import SignUp from "../views/SignUp";

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/todos' },
    {
        path: '/todos',
        name: 'todos',
        component: Todos,
        props: (route) => ({ project: route.query.project })
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: SignUp
    }
];

const router = new VueRouter({
    // can't use history mode - hosting on github pages where i can't set a fallback 404
    // so for example reloading the page /todos gives us 404 because it doesn't actually exist
    // the default mode uses hash symbol which is considered 'same page' route
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
