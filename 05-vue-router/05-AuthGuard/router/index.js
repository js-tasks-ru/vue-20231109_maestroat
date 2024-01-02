import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
      alias: '/meetups',
      name: 'index',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      meta: {
        requireGuest: true,
      },
      name: 'login',
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
      },
      name: 'register',
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      name: 'meetups_creat',
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      name: 'meetups_edit',
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});
  router.beforeEach((to, from) => {
    // console.log(isAuthenticated());
    // console.log(to);
    // console.log(from.name);
    // console.log(to.name);
    if (!isAuthenticated() && to.name === 'meetups_creat') return { name: 'login', query: { from: '/meetups/create' } }
    if (!isAuthenticated() && to.name === 'meetups_edit') return { name: 'login', query: { from: to.fullPath } }
    if (isAuthenticated() && to.name === 'login') return { name: 'index' }
  })
export { router };
