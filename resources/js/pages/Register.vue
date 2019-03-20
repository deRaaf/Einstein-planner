<template>
    <div class="login">
      <div class="form-container">
        <div class="form-title text-center">
            <h1>Registreren</h1>
        </div>
          <div class="alert alert-danger" v-if="has_error && !success">
              <p v-if="error == 'registration_validation_error'">Valideringsfout(en), raadpleeg de onderstaande velden.</p>
              <p v-else>Fout, kan momenteel niet registreren. Neem contact op met een beheerder als het probleem aanhoudt.</p>
          </div>

          <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">

              <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                  <label for="name">Naam</label>
                  <input type="text" id="name" class="form-control" placeholder="John doe" v-model="name">
                  <span class="help-block" v-if="has_error && errors.name">{{ errors.name }}</span>
              </div>

              <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                  <label for="student_number">Leerling number</label>
                  <input type="text" id="student_number" class="form-control" placeholder="123456" v-model="student_number">
                  <span class="help-block" v-if="has_error && errors.student_number">{{ errors.student_number }}</span>
              </div>

              <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                  <label for="email">E-mail</label>
                  <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email">
                  <span class="help-block" v-if="has_error && errors.email">{{ errors.email }}</span>
              </div>

              <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                  <label for="password">Wachtwoord</label>
                  <input type="password" id="password" class="form-control" v-model="password">
                  <span class="help-block" v-if="has_error && errors.password">{{ errors.password }}</span>
              </div>

              <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                  <label for="password_confirmation">Bevestig wachtwoord</label>
                  <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation">
              </div>

              <button type="submit" class="button button-primary">Registreren</button>
          </form>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        has_error: false,
        error: '',
        errors: {},
        success: false
      }
    },

    methods: {
      register() {
        var app = this

        this.$auth.register({
          data: {
            name: app.name,
            student_number: app.student_number,
            email: app.email,
            password: app.password,
            password_confirmation: app.password_confirmation
          },
          success: function () {
            app.success = true
            this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
          },
          error: function (res) {
            console.log(res.response.data.errors)
            app.has_error = true
            app.error = res.response.data.error
            app.errors = res.response.data.errors || {}
          }
        })
      }
    }
  }
</script>