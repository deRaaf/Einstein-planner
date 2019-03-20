<template>
    <header class="top-bar">
      <div class="top-bar-left">
        <div class="logo__wrapper">
          <router-link to="/">
            <img class="logo" src="/../img/logo_einsteinclass.png" alt="Logo Einstein planner">
          </router-link>
        </div>
      </div>

      <div class="top-bar-right">
        <nav id="nav">
            <ul class="menu">
                <!--UNLOGGED-->
                <li v-if="!$auth.check()" v-for="(route, key) in routes.unlogged" v-bind:key="route.path">
                    <router-link  :to="{ name : route.path }" :key="key">
                        {{route.name}}
                    </router-link>
                </li>
                <!--LOGGED USER-->
                <li v-if="$auth.check(1)" v-for="(route, key) in routes.user" v-bind:key="route.path">
                    <router-link  :to="{ name : route.path }" :key="key">
                        {{route.name}}
                    </router-link>
                </li>
                <!--LOGGED ADMIN-->
                <li v-if="$auth.check(2)" v-for="(route, key) in routes.admin" v-bind:key="route.path">
                    <router-link  :to="{ name : route.path }" :key="key">
                        {{route.name}}
                    </router-link>
                </li>
                <!--LOGOUT-->
                <li v-if="$auth.check()">
                    <a href="#" @click.prevent="$auth.logout({ redirect: '/login' })">Logout</a>
                </li>
            </ul>
        </nav>
      </div>
    </header>
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
              name: 'Home',
              path: 'home'
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
  }
</script>