<template>
    <div class="login">

        <div class="login__inner">

            <div class="form-container">

                <div class="form-title text-center">
                    <h1>Login</h1>
                </div>
                <label for="username">Email</label>
                <input type="text" name="username" v-model="username">

                <label for="password">Password</label>
                <input type="password" name="password" v-model="password">


                <button class="button primary" @click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },

    methods: {
        login() {
            var self = this;
            let data = {
                username: this.username,
                password: this.password
            };

            axios.post('/api/login', data)
                .then(({data}) => {
                    auth.login(data.token, data.user);

                    self.$router.push({ path : '/' });
                })  
                .catch(({response}) => {                    
                    alert(response.data.message);
                });
        }
    }
}
</script>