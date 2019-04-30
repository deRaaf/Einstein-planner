<template>
<div class="profile">
    <h1>Profiel</h1>

    <div class="profile__info">
        <h2>Gegevens</h2>
        <form @submit.prevent="submitInfo">
            <div class="form__inner">
                <div class="left">
                    <div class="formgroup">
                        <label for="firstname">Voornaam</label>
                        <input v-model="user.firstname" type="text" name="firstname" id="firstname">
                    </div>
                    <div class="formgroup">
                        <label for="email">E-mail adres (school)</label>
                        <input v-model="user.email" type="text" name="email" id="email">
                    </div>
                </div>
                <div class="right">
                    <div class="formgroup">
                        <label for="lastname">Achternaam</label>
                        <input v-model="user.lastname" type="text" name="lastname" id="lastname">
                    </div>
                    <div class="formgroup small">
                        <label for="leerlingnummer">Leerlingnummer</label>
                        <input v-model="user.student_number" type="text" name="leerlingnummer" id="leerlingnummer">
                    </div>
                    <div class="formgroup small">
                        <label for="class">Klas</label>
                        <input v-model="user.class" type="text" name="class" id="class">
                    </div>
                </div>
            </div>
 

            <button class="button">Wijzigingen opslaan</button>
        </form>
    </div>

    <div class="profile__settings">
        <h2>Persoonlijke voorkeuren</h2>
        <p>In het rooster worden verschillende kleuren gebruikt om de taken te markeren. Hieronder kun je per taak een kleur kiezen.
        Wanneer je op de taak klikt, verschijnt er een kleurenpalet. Boven in het kleurenpalet staan opvallende 
        kleuren en onderaan rustige kleuren. Klik op een kleur om deze bij de taak te kiezen.</p>

        <div class="colorpalette">
            <swatches class="color" row-length="9" :colors="colors" v-model="color.hw"></swatches>
            <swatches class="color" row-length="9" :colors="colors" v-model="color.so"></swatches>
            <swatches class="color" row-length="9" :colors="colors" v-model="color.rep"></swatches>
            <swatches class="color" row-length="9" :colors="colors" v-model="color.ft"></swatches>
            <swatches class="color" row-length="9" :colors="colors" v-model="color.cl"></swatches>
        </div>

        <button @click="submitColors" class="button">Kleurenpalet opslaan</button>

    </div>
    
    <div class="profile__password">
        <h2>Wachtwoord wijzigingen</h2>
        <form @submit.prevent="resetPassword">
            <div class="form__inner">
                <div class="formgroup">
                    <label for="password">Wachtwoord</label>
                    <input type="password" name="password" id="password">
                </div>
                <div class="bottom">
                    <div class="formgroup">
                        <label for="password_new">Wachtwoord nieuw</label>
                        <input type="password" name="password_new" id="password_new">
                    </div>
                    <div class="formgroup">
                        <label for="password_new_rep">Nieuw wachtwoord herhalen</label>
                        <input type="password" name="password_new_rep" id="password_new_rep">
                    </div>
                </div>
            </div>

            <button class="button">Wijzigingen opslaan</button>
        </form>
    </div>
</div>
</template>

<script>
import Swatches from 'vue-swatches'

export default {
    components: { Swatches },
    data() {
        return {
            user: {},
            color: [{hw: '', rep: '', so: '', ft: '', cl: ''}],
            colors: [
                ['#FF0000' , '#FF7900', '#FFE600', '#00FF0A', '#00FFD1', '#00BFFF', '#000000', '#8F00FF', '#FF00A6'],
                ['#FF7E7E', '#FFB47E', '#FFEA7E', '#AFFF7E', '#7EFFD8', '#7EE8FF', '#818181', '#BC87FF', '#FF7EE3'],
                ['#FEB8B8', '#FFD7B3', '#FFF5D1', '#CDFFCF', '#CDFFF6', '#B3ECFF', '#E9E9E9', '#E9E2FF', '#FFD1EF'],
                ['#FFD1D1', '#FFF0E2', '#FFFCEA', '#E4FFE2', '#E2FFF6', '#E2FAFF', '#F4F4F4', '#F2EEFF', '#FFE2FE'],
            ]
        }
    },
    created() {
        this.getUser();
    },
    methods: {
        submitInfo() {

        },
        submitColors() {
            var colors = this.hw + ',' + this.rep + ',' + this.so + ',' + this.ft + ',' + this.cl
            var self = this

            axios.put('/user/' + self.$auth.user().id, {
                
                colors: colors

            })
            .then(function(response) {

                alert('gelukt')

            })
            .catch(function (error) {

                console.log(error);

            });
        },
        resetPassword() {

        },
        getUser() {
            this.user.email = this.$auth.user().email
            this.user.firstname = this.$auth.user().first_name
            this.user.lastname = this.$auth.user().last_name
            this.user.student_number = this.$auth.user().student_number
            // this.user.class = this.$auth.user().class
        }
    }
}
</script>