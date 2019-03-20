<template>
    <div class="login">
      <div class="form-container">
          <div class="form-title text-center">
              <h1>Login</h1>
          </div>

          <div class="alert alert-danger" v-if="has_error">
              <p>Error, unable to connect with these credentials.</p>
          </div>
        <form autocomplete="off" @submit.prevent="login" method="post">
            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
              <label for="email">E-mail</label>
              <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
              <span class="help-block" v-if="has_error && errors.email">{{ errors.email }}</span>
            </div>

            <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
              <label for="password">Wachtwoord</label>
              <input type="password" id="password" class="form-control" v-model="password" required>
              <span class="help-block" v-if="has_error && errors.password">{{ errors.password }}</span>
            </div>
            
            <button type="submit" class="button button-primary">Login</button>
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
        has_error: false,
        error: '',
        errors: {},
      }
    },

    mounted() {
      //
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
            console.log("success")
            const redirectTo = redirect ? redirect.from.name : this.$auth.user().role === 2 ? 'admin.dashboard' : 'home'

            this.$router.push({name: redirectTo})
          },
          error: function(res) {
            console.log("failed")
            console.log(res.response.data.errors)
            app.has_error = true
            app.error = res.response.data.error
            app.errors = res.response.data.errors || {}
          },
          rememberMe: true,
          fetchUser: true
        })
      }
    }
  }
</script>