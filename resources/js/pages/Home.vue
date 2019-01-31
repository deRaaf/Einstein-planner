<template>
  <div class="home">
    <div class="page-header">
        <h1>Einstein planner</h1>
    </div>

    <div>
        <a class="button" @click="popup('#modalNewItem')">Nieuw item</a>
    </div>

    <full-calendar :config="config" :events="agenda_items"/>

  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/nl'

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
            },

        }
    },
    created() {

    },
    methods: {
        popup: function (id) {
            var popup = new Foundation.Reveal($(id));
            popup.open();
        },
    },
  }
</script>