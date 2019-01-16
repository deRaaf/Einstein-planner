import Vue from 'vue';
import VueRouter from 'vue-router';

// Make sure vue is using the router
Vue.use(VueRouter);

// Initialize VueRouter
export default new VueRouter({
  routes:[
    {
      path:'/',
      name: 'home',
      component: resolve => require(['./pages/Home.vue'], resolve)
    }
  ]
});