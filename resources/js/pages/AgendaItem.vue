    <template>
        <div class="newitem">
            <div class="newitem__inner">
                <h2>{{ form.title }}</h2>

                <form @submit.prevent="formSubmit">
                    <label for="name">Naam van de taak</label>
                    <input type="text" name="name" id="name" v-model="form.title">

                    <div class="date">
                        <div class="date__item allday">
                            <label for="allDay">Hele dag</label>
                            <input type="checkbox" name="allDay" id="allDay" v-model="form.allDay">
                        </div>
                    
                        <div class="date__item">
                            <label for="date">Datum wanneer je begint</label>
                            <input type="date" name="date" id="date" v-model="form.date">
                        </div>

                        <div v-if="!this.form.allDay" class="date__item">
                            <label for="from">Tijd wanneer je begint</label>
                            <input type="time" name="from" id="from" v-model="form.from">
                        </div>

                        <div v-if="!this.form.allDay" class="date__item">
                            <label for="till">Tijd wanneer je denkt klaar te zijn</label>
                            <input type="time" name="till" id="till" v-model="form.till">
                        </div>

                        <div class="date__item">
                            <label for="date">Datum wanneer denkt klaar te zijn</label>
                            <input type="date" name="date" id="date" v-model="form.date">
                        </div>

                    </div>

                    <label for="type">Type</label>
                    <select name="type" id="type" v-model="form.type">
                        <option selected disabled>Kies een type</option>
                        <option>SO</option>
                        <option>Repetitie</option>
                        <option>Leerwerk</option>
                        <option>Maakwerk</option>
                    </select>
                    
                    <label for="description">Wat ga je je maken/leren?</label>
                    <textarea id="description" v-model="form.description"></textarea>

                    <button class="button button-primary">Opslaan</button>
                </form>
            </div>
        </div>
    </template>

    <script>
    export default {
        data() {
            return {
                form: {},
            }
        },
        mounted() {
            this.fetchPost();
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

                axios.put('/agenda_items/' + self.$attrs.id, {

                    title: this.form.title,
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

                this.form = [];
            },
            fetchPost() {
                var id = this.$attrs.id;

                axios.get('/agenda_items/' + id).then(response => {
                    this.form = response.data[0];

                    if (this.form.start) {
                        this.form.date = this.form.start.slice(0, 10)
                        console.log(this.form.date)
                    }

                    if (this.form.start && this.form.end) {
                        this.form.from = this.form.start.slice(11, 16)
                        this.form.till = this.form.end.slice(11, 16)
                        this.form.allDay = 0;
                    }
                })
                .catch(error => console.log(error))
            },
        }
    }
    </script>
