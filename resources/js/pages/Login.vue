<template>
    <div class="login centered">
      <div class="form-container">

        <div class="logo_wrapper">
          <svg width="107" height="124" viewBox="0 0 107 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 117.943C0 121.03 2.4268 123.455 5.51546 123.455H101.485C104.573 123.455 107 121.03 107 117.943V56.2159H0V117.943Z" fill="#B3ECFF"/>
            <path d="M31.9896 31.9659H27.5772C24.4886 31.9659 22.0618 29.5409 22.0618 26.4545V5.51136C22.0618 2.425 24.4886 0 27.5772 0H31.9896C35.0783 0 37.5051 2.425 37.5051 5.51136V26.4545C37.5051 29.5409 35.0783 31.9659 31.9896 31.9659Z" fill="#B3ECFF"/>
            <path d="M79.4227 31.9659H75.0103C71.9217 31.9659 69.4949 29.5409 69.4949 26.4545V5.51136C69.4949 2.425 71.9217 0 75.0103 0H79.4227C82.5114 0 84.9382 2.425 84.9382 5.51136V26.4545C84.9382 29.5409 82.5114 31.9659 79.4227 31.9659Z" fill="#B3ECFF"/>
            <path d="M101.485 16.5341H90.5639V26.4546C90.5639 32.5171 85.6 37.4773 79.533 37.4773H75.1206C69.0536 37.4773 64.0897 32.5171 64.0897 26.4546V16.5341H43.1309V26.4546C43.1309 32.5171 38.167 37.4773 32.1 37.4773H27.6876C21.6206 37.4773 16.6567 32.5171 16.6567 26.4546V16.5341H5.51546C2.4268 16.5341 0 18.9591 0 22.0455V50.7046H107V22.0455C107 18.9591 104.573 16.5341 101.485 16.5341Z" fill="#B3ECFF"/>
            <path d="M24.5989 103.614C23.8268 102.842 23.4958 101.74 23.4958 100.417V72.8602C23.4958 71.4273 23.8268 70.325 24.5989 69.6636C25.3711 68.8921 26.4742 68.5614 27.7979 68.5614H45.5577C46.9917 68.5614 48.0948 68.8921 48.867 69.4432C49.6392 70.1046 49.9701 70.9864 49.9701 72.0886C49.9701 74.5136 48.4258 75.8364 45.4474 75.8364H32.6515V82.6705H44.5649C47.5433 82.6705 49.0876 83.883 49.0876 86.308C49.0876 87.5205 48.7567 88.4023 47.9845 88.9534C47.2123 89.6148 46.1093 89.8352 44.6752 89.8352H32.6515V97.3307H45.5577C48.5361 97.3307 50.0804 98.5432 50.0804 101.078C50.0804 102.291 49.7495 103.173 48.9773 103.724C48.2051 104.385 47.102 104.606 45.668 104.606H27.7979C26.3639 104.716 25.2608 104.385 24.5989 103.614Z" fill="white"/>
            <path d="M59.0154 103.724C58.1329 102.842 57.802 101.74 57.802 100.307V72.8602C57.802 71.4273 58.1329 70.325 58.9051 69.6636C59.6773 68.8921 60.7803 68.5614 62.1041 68.5614H75.2309C79.202 68.5614 82.401 69.5534 84.6071 71.6477C86.8133 73.6318 87.9164 76.4977 87.9164 80.1352C87.9164 83.7727 86.8133 86.5284 84.4968 88.6227C82.2907 90.717 79.0917 91.7091 75.1206 91.7091H67.068V100.307C67.068 101.74 66.6267 102.842 65.7443 103.724C64.8618 104.606 63.7587 104.936 62.2144 104.936C61.001 105.047 59.8979 104.606 59.0154 103.724ZM74.0175 84.5443C75.7824 84.5443 77.1061 84.2136 77.8783 83.442C78.7608 82.6705 79.0917 81.5682 79.0917 80.1352C79.0917 77.1591 77.3267 75.6159 73.9072 75.6159H67.068V84.5443H74.0175Z" fill="white"/>
          </svg>
        </div>

        <div class="form-title">
            <h1>Inloggen</h1>
        </div>

        <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
              <label for="email">E-mail adres:</label>
              <input type="email" id="email" class="form-control" placeholder="email@domein.com" v-model="email" required>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
              <label for="password">Wachtwoord:</label>
              <input type="password" id="password" class="form-control" v-model="password" required>
            </div>

            <div class="alert" v-if="has_error">
              <p>Wachtwoord of e-mail onjuist, probeer het opnieuw.</p>
            </div>
            
            <button type="submit" class="button button-primary">Login</button>
            <router-link to="/reset">Wachtwoord vergeten?</router-link>
            <router-link to="/register">Registreer een account</router-link>
          </form>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        email: null,
        password: null,
        errors: {},
        has_error: false,
      }
    },
    methods: {
      login() {
        // get the redirect object
        var redirect = this.$auth.redirect()
        var app = this

        this.$auth.login({
          data: {
            email: app.email,
            password: app.password
          },
          success: function() {
            // handle redirection
            const redirectTo = redirect ? redirect.from.name : this.$auth.user().role === 2 ? 'admin.dashboard' : 'home'

            this.$router.push({name: redirectTo})
          },
          error: function(res) {
            app.has_error = true
            app.errors = error.response.data.errors
          },
          rememberMe: true,
          fetchUser: true
        })
      }
    }
  }
</script>