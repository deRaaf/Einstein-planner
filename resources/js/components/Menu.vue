<template>
    <header class="header">
        <svg @click="openMenu" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="8.4" rx="4.2" fill="#B3ECFF"/>
            <rect y="16.8" width="42" height="8.4" rx="4.2" fill="#B3ECFF"/>
            <rect y="33.6001" width="42" height="8.4" rx="4.2" fill="#B3ECFF"/>
        </svg>
    </header>
</template>

<script>
export default {
    methods: {
      openMenu() {
        $( ".off-canvas" ).addClass("active");
        $( ".overlay" ).addClass("active");
      }
    }
}
</script>

