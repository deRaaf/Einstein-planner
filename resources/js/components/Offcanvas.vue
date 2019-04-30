<template>
  <div class="off-canvas position-left">
      <div class="cancel">
        <svg @click="closeMenu" width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
              <path d="M16.7316 18.3763L0.35451 34.7534C-0.100475 35.2084 -0.100475 35.9455 0.35451 36.4005C0.581713 36.6283 0.880026 36.7416 1.17776 36.7416C1.47607 36.7416 1.77381 36.6283 2.00101 36.4005L18.5013 19.9002L35.0015 36.4005C35.2293 36.6283 35.5271 36.7416 35.8248 36.7416C36.1225 36.7416 36.4208 36.6283 36.648 36.4005C37.103 35.9455 37.103 35.2084 36.648 34.7534L20.2715 18.3763L36.659 1.98758C37.114 1.53259 37.114 0.795484 36.659 0.3405C36.204 -0.113907 35.4669 -0.113907 35.0125 0.3405L18.5019 16.8523L1.98945 0.341078C1.53446 -0.113329 0.797932 -0.113329 0.342947 0.341078C-0.112037 0.796062 -0.112037 1.53317 0.342947 1.98816L16.7316 18.3763Z" fill="#C4C4C4"/>
          </g>
          <defs>
              <clipPath id="clip0">
                  <rect width="37" height="37" fill="white"/>
              </clipPath>
          </defs>
        </svg>
      </div>
      <nav id="nav">
        <ul class="menu vertical">
            <!--UNLOGGED-->
            <li @click="closeMenu" class="menu-item" v-if="!$auth.check()" v-for="(route, key) in routes.unlogged" v-bind:key="route.path">
                <router-link  :to="{ name : route.path }" :key="key">
                    {{route.name}}
                </router-link>
            </li>
            <!--LOGGED USER-->
            <li @click="closeMenu" class="menu-item"  v-if="$auth.check(1)" v-for="(route, key) in routes.user" v-bind:key="route.path">
                <router-link  :to="{ name : route.path }" :key="key">
                    {{route.name}}
                </router-link>
            </li>
            <!--LOGGED ADMIN-->
            <li @click="closeMenu" class="menu-item" v-if="$auth.check(2)" v-for="(route, key) in routes.admin" v-bind:key="route.path">
                <router-link  :to="{ name : route.path }" :key="key">
                    {{route.name}}
                </router-link>
            </li>
            <!--LOGOUT-->
            <li @click="closeMenu" class="menu-item"  v-if="$auth.check()">
                <a href="#" @click.prevent="$auth.logout({ redirect: '/login' })">Uitloggen</a>
            </li>
        </ul>
      </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        routes: {
          // UNLOGGED
          unlogged: [
            {
              name: 'Register',
              path: 'register'
            },
            {
              name: 'Login',
              path: 'login'
            }
          ],

          // LOGGED USER
          user: [
            {
              name: 'Rooster',
              path: 'home'
            },
            {
              name: 'Profiel',
              path: 'profile'
            }
          ],
          // LOGGED ADMIN
          admin: [
            {
              name: 'Dashboard',
              path: 'admin.dashboard'
            }
          ]
        }
      }
    },
    methods: {
      closeMenu() {
        $( ".off-canvas" ).removeClass("active");
        $( ".overlay" ).removeClass("active");
      }
    }
  }
</script>