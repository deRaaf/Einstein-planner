<template>
<div class="newitem">
    <div class="newitem__inner">
        <div class="newitem__header">
            <h1>Nieuwe taak aanmaken</h1>
        </div>

        <form @submit.prevent="formSubmit">

            <div class="top">
                <div class="left">
                    
                    <v-select :class="{ 'has-error': has_error && errors.type }" v-if="form.type !== 'les'" :searchable="false" v-model="form.type" :options="['SO', 'REP', 'HW', 'Vrij', 'Les']"></v-select>

                    <v-select :searchable="false" v-model="form.class" :options="['ENG', 'NED', 'WIS', 'BIO', 'GES', 'AARD']"></v-select>
                    
                    <div class="deadline">
                        <label>Deadline:</label>
                        <input type="date" name="deadline" id="deadline" v-model="form.deadline">
                    </div>
                    <span class="help-block" v-if="has_error && errors.type">{{ errors.type[0] }}</span>
                </div>

                <div class="right">
                    <textarea :class="{ 'has-error': has_error && errors.title }" name="name" id="name" v-model="form.name" rows="3"></textarea>
                    <span class="help-block" v-if="has_error && errors.title">{{ errors.title[0] }}</span>
                </div>
            </div>

            <div class="bottom">
                <div class="date left">
                
                    <div class="date__item planned">
                        <label for="date">Ingeplande datum:</label>
                        <input :class="{ 'has-error': has_error && errors.start }" type="date" name="date" id="date" v-model="form.date">
                    </div>

                    <div v-if="!this.form.allDay" class="date__item wrap">
                        <div>
                            <label for="from">Van</label>
                            <input :class="{ 'has-error': has_error && errors.start }" type="time" name="from" id="from" v-model="form.from">
                        </div>

                        <div>
                            <label for="from">Tot</label>
                            <input type="time" name="till" id="till" v-model="form.till">
                        </div>
                    </div>

                    <div class="date__item date2">
                        <input type="date" name="date2" id="date2" v-model="form.date">
                    </div>

                    <div class="date__item allday">
                        <input type="checkbox" name="allDay" id="allDay" v-model="form.allDay">
                        <label for="allDay">Hele dag</label>
                    </div>

                    <span class="help-block" v-if="has_error && errors.start">{{ errors.start[0] }}</span>
                </div>
                
                <div class="right">
                    <label for="description">Notities</label>
                    <textarea id="description" v-model="form.description" rows="3"></textarea>
                </div>
            </div>

            <div class="form__footer">
                <router-link to="/">Terug</router-link>
                <button class="button button-primary">Opslaan</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

export default {
    data() {
        return {
            form: {
                name: '',
                date: '',
                allDay: '',
                description: "Om je goed voor te bereiden kun je antwoord geven op de volgende vragen:\nWat ga je doen?\nHoe ga je dit doen?\nWanneer ga je dit doen?\nWaar ga je dit doen?\nMet wie ga je dit doen?\n\nOok kun je hier een notitie schrijven:",
                type: 'Soort',
                from:'',
                till: '',
                class: 'Vak',
            },
            errors: {},
            has_error: false,
        }
    },
    directives: {
        select2: {
            // directive definition
            inserted: function (el) {
                $(el).on('select2:select', () => {
                    const event = new Event('change', { bubbles: true, cancelable: true });
                    el.dispatchEvent(event);
                });

                $(el).on('select2:unselect', () => {
                    const event = new Event('change', {bubbles: true, cancelable: true})
                    el.dispatchEvent(event)
                })
            }
        }
    },  
    mounted() {
        this.initSelect();
    },
    methods: {
        formSubmit() {
            var self = this;

            if (this.form.allDay == 0 || this.form.allDay == "" || this.form.allDay == null) {
                this.form.allDay = "false";
            } else {
                this.form.allDay = "true";
            }

            if (this.form.from && this.form.date) {
                var start = this.form.date + 'T' + this.form.from;
            }

            if (this.form.till && this.form.date) {
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

                self.has_error = true
                self.errors = error.response.data.errors

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
        },
        initSelect() {
            var input = this.$auth.user().colors

            $('.vs__actions').append('<svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L6.5 6L12 1" stroke="#333333"/></svg>');

            if(input !== null) {

                var colors = input.split(',')

                $('body').on('DOMSubtreeModified', ".vs__selected", function() {
                    var txt = $(".v-select:first .vs__selected").text();
                    CheckValues($.trim(txt));
                });
            
                function CheckValues(value) {
                    switch (value) {
                        case "HW":
                            $(".v-select:first .vs__dropdown-toggle").css( "background-color", colors[0]);
                            break;
                        case "REP":
                            $(".v-select:first .vs__dropdown-toggle").css( "background-color", colors[1]);
                            break;
                        case "SO":
                            $(".v-select:first .vs__dropdown-toggle").css( "background-color", colors[2]);
                            break;
                        case "Vrij":
                            $(".v-select:first .vs__dropdown-toggle").css( "background-color", colors[3]);
                            break;
                        case "Les":
                            $(".v-select:first .vs__dropdown-toggle").css( "background-color", colors[4]);
                            break;
                    }
                }

                setTimeout(function(){ 
                    var txt = $(".v-select:first .vs__selected").text();
                    CheckValues($.trim(txt));
                }, 500);
            }
        },
    }
}
</script>
