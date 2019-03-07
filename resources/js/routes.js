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
      meta: { middlewareAuth: true }
    },
    {
      path: '/newitem',
      name: 'newitem',
      component: resolve => require(['./pages/NewItem.vue'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['./pages/Login.vue'], resolve)
    }
  ];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.middlewareAuth)) {                
      if (!auth.check()) {
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          });

          return;
      }
  }

  next();
})

export default router;