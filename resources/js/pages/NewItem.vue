<template>
    <div class="newitem">
        <h2>Nieuw agenda item</h2>
        <p>Voeg een nieuw item toe</p>

        <form @submit.prevent="formSubmit">
            <label for="name">Naam van de taak</label>
            <input type="text" name="name" id="name" v-model="form.name">

            <div class="date">
                <div class="date__item allday">
                    <label for="allDay">Hele dag</label>
                    <input type="checkbox" name="allDay" id="allDay" v-model="form.allDay">
               </div>
               
                <div class="date__item">
                    <label for="date">Datum van</label>
                    <input type="date" name="date" id="date" v-model="form.date">
                </div>

                <div v-if="!this.form.allDay" class="date__item">
                    <label for="from">Van</label>
                    <input type="time" name="from" id="from" v-model="form.from">
                </div>

                <div v-if="!this.form.allDay" class="date__item">
                    <label for="till">Tot</label>
                    <input type="time" name="till" id="till" v-model="form.till">
                </div>

                <div class="date__item">
                    <label for="date">Datum tot</label>
                    <input type="date" name="date" id="date" v-model="form.date">
                </div>

            </div>

            <label for="type">Wat ga je doen?</label>
            <select name="type" id="type" v-model="form.type">
                <option selected disabled>Kies een type</option>
                <option>SO</option>
                <option>Repetitie</option>
                <option>Leerwerk</option>
                <option>Maakwerk</option>
            </select>
            
            <label for="description">Wat ga je maken/leren?</label>
            <textarea id="description" v-model="form.description"></textarea>

            <button class="button button-primary">Toevoegen</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: [{
                name: '',
                date: '',
                allDay: '',
                description: '',
                type: '',
                from:'',
                till: '',
            }],
        }
    },
    methods: {
        formSubmit() {
            var self = this;

            if (this.form.allDay == 0 || this.form.allDay == "" || this.form.allDay == null) {
                this.form.allDay = "false";
            } else {
                this.form.allDay = "true";
            }

            if (this.form.from) {
                var start = this.form.date + 'T' + this.form.from;
            }

            if (this.form.till) {
                var end = this.form.date + 'T' + this.form.till;
            }

            axios.post('/agenda_items', {

                title: this.form.name,
                start: start,
                end: end,
                allDay: this.form.allDay,
                description: this.form.description,
                type: this.form.type
            })
            .then(function(response) {
                if ( response.status == '201') {
                   self.$router.push({ path : '/' });
                }
            })
            .catch(function (error) {

                console.log(error);

            });

            this.form = [{
                name: '',
                date: '',
                allDay: '',
                description: '',
                type: '',
                from:'',
                till: '',
            }];
        }
    }
}
</script>
