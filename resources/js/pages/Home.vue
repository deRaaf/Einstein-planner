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
                    <th>Maandag</th>
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
                <tr>
                    <td>Content Goes Here</td>
                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                </tr>
                <tr>
                    <td>Content Goes Here</td>
                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                </tr>
                <tr>
                    <td>Content Goes Here</td>
                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                    <td>Content Goes Here</td>
                </tr>
                <tr>
                    <td>Content Goes Here</td>
                    <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
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
    methods: {
        popup: function (id) {
            var popup = new Foundation.Reveal($(id));
            popup.open();
        }
    },
    // directives: {
    //     freveal: {
    //         bind: function (el) {
    //             new Foundation.Reveal($(el))
    //         },
    //         unbind: function (el) {
    //             $(el).foundation.destroy()
    //         }
    //     }
    // }
  }
</script>