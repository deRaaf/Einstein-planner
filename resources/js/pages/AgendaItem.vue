<template>
<div class="newitem">
    <div class="newitem__inner">
        <div class="newitem__header">
            <h1>Taak bewerken</h1> 

            <button v-if="form.type !== 'les'" @click="completeItem" class="button button-primary">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.48145 6.23462L5.66252 10.4916L14.5185 1.50836" stroke="#333333" stroke-opacity="0.5" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Taak afvinken
            </button>
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
                </div>

                <div class="right">
                    <textarea name="name" id="name" v-model="form.title" rows="3"></textarea>
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
                <a @click="deleteItem" class="button delete">Verwijderen</a>
                <button class="button button-primary">Opslaan</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

export default {
data() {
    return {
        form: {},
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
    this.fetchPost();
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
            type: this.form.type,
            class: this.form.class,
            completed: false
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

        this.form = [];
    },
    fetchPost() {
        var id = this.$attrs.id;

        axios.get('/agenda_items/' + id).then(response => {
            this.form = response.data[0];

            if (this.form.start) {
                this.form.date = this.form.start.slice(0, 10)
            }

            if (this.form.start && this.form.end) {
                this.form.from = this.form.start.slice(11, 16)
                this.form.till = this.form.end.slice(11, 16)
                this.form.allDay = 0;
            } else if (this.form.start && this.form.end == null) {
                var start = this.form.start

                this.form.from = start.slice(11, 16)
                // this.form.till = end
                this.form.allDay = 0;
            }
        })
        .catch(error => console.log(error))
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
    deleteItem() {
        var self = this

        Swal.fire({
            title: '',
            text: "Weet je zeker dat je deze taak wilt verwijderen?",
            type: 'error',
            showCancelButton: true,
            confirmButtonColor: '#B3ECFF',
            cancelButtonColor: '#EBEBE',
            confirmButtonText: 'Ja, verwijderen'
            }).then((result) => {
                if (result.value) {
                    
                    axios.delete('/agenda_items/'+ self.form.id)

                    self.$router.push({ path: '/' });

                    Swal.fire(
                    'Verwijderd!',
                    'De afspraak is verwijderd.',
                    'success'
                    )
                }
            })
        },
        completeItem() {
            var self = this
            var date = new Date()
            var month = date.getMonth() + 1; //months from 1-12
            var day = date.getDate();
            var year = date.getFullYear();

            if (month <= 10 ) {
                month = "0" + month
            }

            if (day <= 10 ) {
                day = "0" + day
            }

            var today = year + '-' + month + '-' + day

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

            if (this.form.date > today ){
               
                Swal.fire({
                    title: '',
                    text: "Volgens de planning heb je deze taak nog niet uitgevoerd. Weet je zeker dat je deze taak af wilt vinken?",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#B3ECFF',
                    cancelButtonColor: '#EBEBE',
                    cancelButtonText: 'Nee, taak houden.',
                    confirmButtonText: 'Ja, afvinken'
                    }).then((result) => {
                        if (result.value) {
                            // This should be going differently -> only completed
                            axios.put('/agenda_items/' + self.$attrs.id, {
                                title: this.form.title,
                                start: start,
                                end: end,
                                allDay: this.form.allDay,
                                description: this.form.description,
                                type: this.form.type,
                                class: this.form.class,
                                completed: true
                            })
                            .then(function(response) {
                                if ( response.status == '201') {
                                    Swal.fire(
                                        'Goedzo',
                                        'Je hebt de taak afgerond!',
                                        'success'
                                    )
                                    self.$router.push({ path : '/' });
                                }
                            })
                            .catch(function (error) {

                                console.log(error);

                            });
                        }
                    })
            } else {
                Swal.fire({
                    title: 'Goedzo',
                    text: "Je hebt de taak afgerond!",
                    type: 'success',
                    confirmButtonColor: '#B3ECFF',
                    }).then((result) => {
                        if (result.value) {
                            axios.put('/agenda_items/' + self.$attrs.id, {
                                title: this.form.title,
                                start: start,
                                end: end,
                                allDay: this.form.allDay,
                                description: this.form.description,
                                type: this.form.type,
                                class: this.form.class,
                                completed: true
                            })
                            .then(function(response) {
                                self.$router.push({ path : '/' });
                            })
                            .catch(function (error) {

                                console.log(error);

                            });
                        }
                    })
            }
        }
    }
}
</script>
