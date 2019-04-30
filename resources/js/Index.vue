<template>
    <div id="main">
        <Offcanvas />
        <div :class="{ 'hide_menu': $route.path === '/' || $route.path === '/register' || $route.path === '/login' }" id="content" class="off-canvas-content">
          <Menu />
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
        <div @click="closeMenu" class="overlay"></div>
    </div>
</template>

<script>
  import Offcanvas from './components/Offcanvas.vue'
  import Menu from './components/Menu.vue'

  export default {
    components: {
      Offcanvas,
      Menu
    },
    methods: {
      closeMenu() {
        $( ".off-canvas" ).removeClass("active");
        $( ".overlay" ).removeClass("active");
      }
    }
  }
</script>