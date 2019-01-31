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
                </tr>
                <tr>
                    <th>Maandag <span class="date">{{ date }}</span></th>
                    <th>Dinsdag</th>
                    <th>Woensdag</th>
                    <th>Donderdag</th>
                    <th>Vrijdag</th>
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
        }
    },
    created() {
        formatDate();
    },
    methods: {
        popup: function (id) {
            var popup = new Foundation.Reveal($(id));
            popup.open();
        },
        formatDate: function() {
            dateToday = Date();
            this.date = dateToday;
            monthToday = dateToday.getMonth();
            months = ["januari", "februari", "Maart", "april", "Mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
            this.currentMonth = months[monthToday];
            console.log( months[monthToday]);
        }
    },
  }
</script>