<template>
    <div id="main">
        <navHeader></navHeader>
        <div id="content" class="off-canvas-content" data-off-canvas-content>
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
    </div>
</template>

<script>
  import navHeader from './components/navHeader.vue'
  export default {
    data() {
      return {
        //
      }
    },
    components: {
      navHeader
    }
  }
</script>