<template>
  <div class="home">
    <div class="page-header">
        <h1>Einstein planner</h1>
    </div>

    <div>
        <a class="button" @click="popup('#modalNewItem')">Nieuw item</a>
    </div>

    <div class="calendar">
        <table>
            <thead>
                <tr>
                   <th class="month">{{ currentMonth }}</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th :key="weekDay" v-for="weekDay in weekDays">Maandag <span class="date">{{ date }}</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Content Goes Here</td>
                    <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            date: null,
            currentMonth: null,
            currentDay: null,
            weekDays: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "vrijdag", "zaterdag"],
        }
    },
    created() {
        var self = this;
        self.formatDate();
    },
    methods: {
        popup: function (id) {
            var popup = new Foundation.Reveal($(id));
            popup.open();
        },
        formatDate: function() {
            var dateToday = new Date();

            var dayNumber = dateToday.getDay();
            // var weekDays = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "vrijdag", "zaterdag"];
            var dayName = this.weekDays[dateToday.getDay()];
            this.date = dayNumber;
            this.currentDay = dayName;

            var monthToday = dateToday.getMonth();
            var months = ["januari", "februari", "Maart", "april", "Mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
            this.currentMonth = months[monthToday];
        }
    },
  }
</script>