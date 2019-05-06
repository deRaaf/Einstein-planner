<template>
    <div class="login">
      <div class="form-container">
        <div class="form-title text-center">
            <h1>Registreren</h1>
        </div>

        <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">

            <div class="form-group" :class="{ 'has-error': has_error && errors.first_name }">
                <label for="firstname">Voornaam</label>
                <input type="text" id="firstname" class="form-control" placeholder="John" v-model="firstname">
                <span class="help-block" v-if="has_error && errors.first_name">{{ errors.first_name[0] }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': has_error && errors.last_name }">
                <label for="lastname">Achternaam</label>
                <input type="text" id="lastname" class="form-control" placeholder="doe" v-model="lastname">
                <span class="help-block" v-if="has_error && errors.last_name">{{ errors.last_name[0] }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': has_error && errors.student_number }">
                <label for="student_number">Leerling nummer</label>
                <input type="text" id="student_number" class="form-control" placeholder="123456" v-model="student_number">
                <span class="help-block" v-if="has_error && errors.student_number">{{ errors.student_number[0] }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': has_error && errors.email }">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email">
                <span class="help-block" v-if="has_error && errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': has_error && errors.password }">
                <label for="password">Wachtwoord</label>
                <input type="password" id="password" class="form-control" v-model="password">
                <span class="help-block" v-if="has_error && errors.password">{{ errors.password[0] }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': has_error && errors.password }">
                <label for="password_confirmation">Bevestig wachtwoord</label>
                <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation">
            </div>

            <div class="alert" v-if="has_error && !success">
                <p>Valideringsfout(en), raadpleeg de bovenstaande velden.</p>
            </div>


            <div class="form__footer">
              <router-link to="login">Terug naar login</router-link>

              <button type="submit" class="button button-primary">Registreren</button>
            </div>
        </form>
      </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        student_number: '',
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
        var self = this

        this.$auth.register({
          data: {
            first_name: self.firstname,
            last_name: self.lastname,
            student_number: self.student_number,
            email: self.email,
            password: self.password,
            password_confirmation: self.password_confirmation
          },
          success: function () {
            self.success = true
            this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
          },
          error: function (res) {
            console.log(res.response.data.errors)
            self.has_error = true
            self.error = res.response.data.error
            self.errors = res.response.data.errors || {}
          }
        })
      }
    }
  }
</script>