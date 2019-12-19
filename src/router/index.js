import Vue from 'vue';
import VueRouter from 'vue-router';
import Todos from '../views/Todos';
import Projects from '../views/Projects';

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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
