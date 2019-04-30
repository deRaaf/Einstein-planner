import Vue from 'vue';
import VueRouter from 'vue-router';

// Make sure vue is using the router
Vue.use(VueRouter);

// Initialize VueRouter
let routes = [
    {
      path:'/',
      name: 'home',
      component: resolve => require(['./pages/Home.vue'], resolve),
      meta: { 
        auth: true,
        header: false, 
      }
    },
    {
      path: '/newitem',
      name: 'newitem',
      component: resolve => require(['./pages/NewItem.vue'], resolve),
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['./pages/Login.vue'], resolve),
      meta: { auth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['./pages/Register'], resolve),
      meta: { auth: false }
    },
    {
      path: '/agendaitem/:id',
      name: 'agendaitem',
      component: resolve => require(['./pages/AgendaItem'], resolve),
      meta: { auth: true },
      props: true,
    },
    {
      path: '/profiel',
      name: 'profile',
      component: resolve => require(['./pages/Profile'], resolve),
      meta: { auth: true },
    },
    // ADMIN ROUTES
    {
      path: '/admin',
      name: 'admin.dashboard',
      component: resolve => require(['./pages/admin/AdminDashboard'], resolve),
      meta: {
        auth: {roles: 2, redirect: {name: 'login'}, forbiddenRedirect: '/403'}
    }
  },
];

const router = new VueRouter({
    routes
});

export default router;