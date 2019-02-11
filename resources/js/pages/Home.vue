<template>
  <div class="home">
    <div class="page-header">
        <h1>Einstein planner</h1>
    </div>

    <div class="grid-container">
        <!-- <a class="button" @click="popup('#modalNewItem')">Nieuw item</a> -->
        <h2>Nieuw agenda item</h2>
        <p>Voeg een nieuw item toe</p>

        <form @submit.prevent="formSubmit">
            <label for="name">Naam</label>
            <input type="text" name="name" id="name" v-model="form.name">
            <label for="date">Datum</label>
            <input type="date" name="date" id="date" v-model="form.date">

            <label for="allDay">Hele dag</label>
            <input type="checkbox" name="allDay" id="allDay" v-model="form.allDay">

            <span>{{ form.allDay }}</span>

            <label for="type">Type</label>
            <select name="type" id="type" v-model="form.type">
                <option disabled>Kies een type</option>
                <option>SO</option>
                <option>REP</option>
            </select>
            
            <label for="description">Beschrijving</label>
            <textarea id="description" v-model="form.description"></textarea>

            <div class="from">
                <label for="from">Van</label>
                <input type="time" name="from" id="from" v-model="form.from">
            </div>

            <div class="till">
                <label for="till">Tot</label>
                <input type="time" name="till" id="till" v-model="form.till">
            </div>

            <button class="button button-primary">Toevoegen</button>
        </form>
    </div>

    <full-calendar :config="config" :events="agenda_items"/>

  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/nl'
import 'axios/dist/axios'

export default {
    components: {
        FullCalendar,
    },
    data() {
        return {
            agenda_items: [],
            config: {
                locale: 'nl',
                minTime: "08:00:00",
                maxTime: "22:00:00",
                editable: "true",
                allDaySlot: false,
                views: {
                    week: {
                        columnHeaderFormat: "dddd D",
                    },
                    month: {
                        columnHeaderFormat: "dddd",
                    }
                }
            },
            form: [{
                name: '',
                date: '',
                allDay: '',
                description: '',
                type: '',
                from:'',
                till: '',
            }]

        }
    },
    created() {
        this.get_agenda_items();
    },
    methods: {
        popup: function (id) {
            var popup = new Foundation.Reveal($(id));
            popup.open();
        },
        get_agenda_items: function() {
            window.axios.get('api/agenda_items?api_token=123').then(({ data }) => {
                console.log(data);

                this.agenda_items = data;
            });
        },
        formSubmit() {

            if (this.form.allDay == 0 || this.form.allDay == "") {
                this.form.allDay = false
            } else {
                this.form.allDay = true;
            }

            axios.post('api/agenda_items?api_token=123', {

                title: this.form.name,
                start: this.form.date,
                allDay: this.form.allDay,
                description: this.form.description,
                type: this.form.type,
                // from: this.form.from,
                // till: this.form.till,
            })
            .catch(function (error) {

                console.log(error);

            });
        }
    },
  }
</script>