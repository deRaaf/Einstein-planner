<template>
    <div id="main">
        <Offcanvas></Offcanvas>
        <div id="content" class="off-canvas-content" data-off-canvas-content>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
    </div>
</template>

<script>
  import Offcanvas from './components/Offcanvas.vue'
  export default {
    data() {
      return {
        //
      }
    },
    components: {
      Offcanvas
    }
  }
</script>