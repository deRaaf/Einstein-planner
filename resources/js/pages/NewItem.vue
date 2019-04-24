<template>
    <div class="newitem">
        <h2>Nieuw agenda item</h2>
        <p>Voeg een nieuw item toe</p>

        <form @submit.prevent="formSubmit">
            
            <div class="left">
                <select name="type" id="type" v-model="form.type" v-select2>
                    <option value="soort taak" selected disabled>Soort taak</option>
                    <option value="so">SO</option>
                    <option value="rep">REP</option>
                    <option value="hw">HW</option>
                    <option value="vrij">Vrij</option>
                </select>

                <select name="subject" id="subject">
                    <option value="vak" selected disabled>Vak</option>
                    <option value="en">ENG</option>
                    <option value="ned">NED</option>
                    <option value="wis">WIS</option>
                    <option value="bio">BIO</option>
                </select>
            </div>

            <textarea name="name" id="name" v-model="form.name" cols="30" rows="10"></textarea>

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
        },
        initSelect() {
            $('#type').select2();
            
            $('#type').on('select2:select', function(e) {
                var data = e.params.data;
                CheckValues(data.element.value)
            });

            function CheckValues(value) {
                switch (value) {
                    case "hw":
                        $(".select2-selection").css( "background-color", "blue");
                        break;
                    case "rep":
                        $(".select2-selection").css( "background-color", "red");
                        break;
                    case "vrij":
                        $(".select2-selection").css( "background-color", "yellow");
                        break;
                    case "so":
                        $(".select2-selection").css( "background-color", "green");
                        break;
                }
            }

            CheckValues($("#type").val());
        }
    }
}
</script>
