<template>
<div class="newitem">
    <div class="newitem__inner">
        <div class="newitem__header">
            <h1>Nieuwe taak aanmaken</h1>
        </div>

        <form @submit.prevent="formSubmit">

            <div class="top">
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
                    
                    <div class="deadline">
                        <label>Deadline:</label>
                        <input type="date" name="deadline" id="deadline" v-model="form.deadline">
                    </div>
                </div>

                <div class="right">
                    <textarea name="name" id="name" v-model="form.name" rows="3"></textarea>
                </div>
            </div>

            <div class="bottom">
                <div class="date left">
                
                    <div class="date__item planned">
                        <label for="date">Ingeplande datum:</label>
                        <input type="date" name="date" id="date" v-model="form.date">
                    </div>

                    <div v-if="!this.form.allDay" class="date__item wrap">
                        <div>
                            <label for="from">Van</label>
                            <input type="time" name="from" id="from" v-model="form.from">
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
            var input = this.$auth.user().colors
            var colors = input.split(',')

            $('#type').select2({
                containerCssClass: "type",
            });

            $('#subject').select2();
            
            $('#type').on('select2:select', function(e) {
                var data = e.params.data;
                CheckValues(data.element.value)
            });

            function CheckValues(value) {
                switch (value) {
                    case "hw":
                        $(".type").css( "background-color", colors[0]);
                        break;
                    case "rep":
                        $(".type").css( "background-color", colors[1]);
                        break;
                    case "vrij":
                        $(".type").css( "background-color", colors[2]);
                        break;
                    case "so":
                        $(".type").css( "background-color", colors[3]);
                        break;
                }
            }

            CheckValues($("#type").val());
        },
    }
}
</script>
