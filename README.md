# Einstein planner
The Einstein planner is a plan-learn-tool. The tool’s design is tailored to the needs of the target audience, students with ASS. The tool provides overview, both functionally and visually. The user gets an overview over their tasks and agenda at the same time. This way users can see their tasks, prioritize them and schedule them. The user can get support with the use of a step-by-step plan which can help them learn to schedule their tasks.

**Note: This is a proof of concept, the Einstein planner was designed to work with the [Magister][1] API in mind, which we unfortunately could not implement.**

![Screenshot Einstein Planner][screen]

## Demo
If you want to see the Einstein planner in action, you can access the demo [here][2]

Username: demo@demo.nl

Password: demo

## Requirements
Einstein planner uses Laravel as it's backend, see the [docs][3] for the server requirements. [Vue][4] is used for the front-end.

Laravel uses [composer][5] for dependency management, so make sure you have it installed.

JavaScript dependencies are installed with npm (or [yarn][6]). You'll need to have [node.js][7] installed.

Einstein planner uses Sass for all styling. (Sass is a CSS pre-processor that allows you to write styles more effectively and tidy.)

Zurb's [Foundation framework][zurb] is used instead of Bootstrap.

## External components
The Einstein planner uses a few external components to add certain functionalities.

For the calendar [vue-fullcalendar][full] is used.

Selectboxes are [vue-select][select].

Color preferences are set with [vue-swatches][swatch]

Login and register auth is done with [vue-auth][auth]

[SweetAlert2][sweet] is used to convey messages.

## Quickstart

Install composer dependencies
```
composer install
```

Set up database tables
```
php artisan migrate
```

If you want the demo account use --seed
```
php artisan migrate --seed
```

Generate the JWT secret
``` 
php artisan jwt:secret
```

Install node dependencies
```
npm install / yarn install
```

## Configuration
Before you can run the Einstein planner, you'll need the set up an env file with the domain and database info.

Example generated by Laragon:
```
APP_URL=http://einstein-planner.test

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=Einstein-planner
DB_USERNAME=root
DB_PASSWORD=
```
Add the following to at the bottom of the env file (this is used to register the baseURL for Axios in app.js)
```
MIX_APP_URL="${APP_URL}"
```
After this do a build so the above is registered in app.js
```
npm run dev / yarn run dev
```

## Project structure
Controllers are found in
```
app/Http/Controllers
```
AgendaController is used to perform CRUD functions for the agenda items.
AuthController contains everything for login and register.

The routes can be found in:
```
routes/api.php
```

JavaScript files can be found in:
```
resources/js
```
All pages can be found in their respectable Vue components in:
```
resources/js/pages
```
Components like the header and Offcanvas can be found in:
```
resources/js/components
```
Routes are located in (Vue-router):
```
resources/js/routes.js
```
Auth config for vue-auth can be found in:
```
resources/js/auth.js
```


Sass files ar located in:
```
resources/sass
```
Settings (colors, fonts etc.) can be edited in:
```
resources/_settings.scss
```
Same as the js files, all page styling can be found in:
```
resources/sass/pages
```
And components in:
```
resources/sass/components
```


Views aren't really used, but if you want to make changes to for example the head, the layout file can be found in:
```
resources/views/layouts/app.blade.php
```

## Functions per page
### Home.vue
Home is the page where the user will spend most of their time, itcontains the calendar component and the sidebar which contains their tasks.

The calendar component has a config and a few functions attached to it. For an explaination of the config properties see the [Fullcalendar documentation][8].

Translation (Dutch) is imported by ```import 'fullcalendar/dist/locale/nl'```
```
<full-calendar :config="config" :events="agenda_items" @event-selected="eventClick" @event-receive="eventReceive"/>
```

Events are loaded by an array in ```data()```, like this:
```
data() {
    return {
        events: [
            {
                title  : 'event1',
                start  : '2010-01-01',
            },
            {
                title  : 'event2',
                start  : '2019-01-05',
                end    : '2019-01-07',
            },
            {
                allDay:"false"
                class:null
                completed:0
                created_at:"2019-05-06 09:15:33"
                description:""
                end:"2019-05-06T11:00"
                id:1
                start:"2019-05-06T10:00"
                student_number:12345
                title:"Les: EN"
                type:"les"
                updated_at:"2019-05-06 09:18:06"
            },
        ]
    }
}
```

When a user clicks on an event ```eventClick``` is triggered, and the user is sent to the AgendaItem page.
```
eventClick(item) {
    var data = item.id
    this.$router.push({ path: '/agendaitem/' + data });
}
```

When a task is dragged in the calendar ```eventRecieve()``` is triggered, and the event will first be formatted and then sent to the database.
```
eventReceive(e) {
    var self = this

    // Determine the type
    var type2 = e.title.slice(0, 2)

    var type3 = e.title.slice(0, 3)

    var type4 = e.title.slice(0, 4)

    if (type2 == "HW" || type2 == "SO") {
        type = type2
    } else if (type3 == "REP"){
        type = type3
    } else {
        var type = type4
    }

    var start = e.start.toISOString() //Format to readable date

    var desc = "Om je goed voor te bereiden kun je antwoord geven op de volgende vragen:\nWat ga je doen?\nHoe ga je dit doen?\nWanneer ga je dit doen?\nWaar ga je dit doen?\nMet wie ga je dit doen?\n\nOok kun je hier een notitie schrijven:"

    axios.post('/agenda_items', {

        title: e.title,
        start: start,
        // end: end,
        allDay: false,
        description: desc,
        type: type
    })
    .then(function(response) {

        self.get_agenda_items();

    })
    .catch(function (error) {

        console.log(error);

    });
},
```

```get_agenda_items()``` gets all the events from the database and after that calls setColors()
```
get_agenda_items() {
    axios.get('/agenda_items').then(({ data }) => {

        // Populate the agenda_items array in data()
        this.agenda_items = data;

        // Set user colors
        this.setColors();
    });
}
```
This function can also be triggered with the refresh button in the sidebar. 
```
<button class="refresh" @click="get_agenda_items">
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.46343 5.65018C2.92992 7.61243 3.43178 9.79171 4.97355 11.3335C7.14754 13.5075 10.6035 13.6156 12.9011 11.6579" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.43711 7.31577L3.46046 4.94736L1.48975 7.31577" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.4363 8.39914C14.9698 6.43688 14.4679 4.25761 12.9262 2.71584C10.6384 0.428053 6.93091 0.428053 4.64764 2.71584" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5424 7.3158L14.519 9.68421L16.4897 7.3158" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</button>
```

```setColors()``` sets the colors the user has selected in their profile or when a task is completed.
```
setColors() {
    var self = this
    
    // Set the color for each agenda item, if they are of a specific type
    this.agenda_items.forEach(agenda_item => {

        // Get the colors from the database
        var input = self.$auth.user().colors

        if(input !== null) {

            var colors = input.split(',')

            if (agenda_item.type == "HW") {
                agenda_item.color = colors[0];
            } else if (agenda_item.type == "REP") {
                agenda_item.color = colors[1];
            } else if (agenda_item.type == "SO") {
                agenda_item.color = colors[2];
            } else if (agenda_item.type == "Vrij") {
                agenda_item.color = colors[3];
            } else if (agenda_item.type == "Les") {
                agenda_item.color = colors[4];
            } 

            // If a task is completed, change to color + opacity
            if (agenda_item.completed == 1) {
                agenda_item.color = "rgba(63, 195, 128, 0.1)";
            }
        }
    });
},
```

```makeDraggable()``` makes the tasks sortable/draggable via Jquery sortable
```
makeDraggable() {
    // initialize the external events

    $('#external_events').sortable()

    var elements = $('#external_events .fc-event')

    elements.each(function() {

        // store data so the calendar knows to render an event upon drop
        $(this).data('event', {
            title: $.trim($(this).text()), // use the element's text as the event title
            stick: true // maintain when user navigates (see docs on the renderEvent method)
        });

    });
},
```
```collapse()``` collapses the tasklist by toggling the class ```.collapse``` to the ```.sidebar``` and ```.calendar_wrap```.
```
collapse() {
    $(".calendar_wrap").toggleClass("collapsed");
    $(".sidebar").toggleClass("collapsed");
}
```

Two functions reside in the fullcalendar config as there are no props for the component as there are for ```eventRecieve()``` and ```eventClick()```. These are fullCalendar functions. Docs: [eventDragstop][9], [drop][10].

```eventDragStop()``` is triggered when dragging of an event stops. ```isEventOverDiv``` determines if the event left the external event list.
The event is put back in the list if the dragging stops.
```
eventDragStop: function( event, jsEvent, ui, view ) {

    var isEventOverDiv = function(x, y) {

        var external_events = $( '#external_events' );
        var offset = external_events.offset();
        offset.right = external_events.width() + offset.left;
        offset.bottom = external_events.height() + offset.top;

        // Compare
        if (x >= offset.left
            && y >= offset.top
            && x <= offset.right
            && y <= offset .bottom) { return true; }
        return false;
    }
    
    if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        $('#calendar').fullCalendar('removeEvents', event._id);
        var el = $( "<div class='fc-event'>" ).appendTo( '#external_events_listing' ).text( event.title );
        el.draggable({
            zIndex: 999,
            revert: true, 
            revertDuration: 0 
        });
        el.data('event', { title: event.title, id :event.id, stick: true });
    }
},
```
```drop()``` is triggered when an event is dropped in the calendar. The event is removed from the external events list.
```
drop(e) {
    // remove the element from the "External Events" list
    $(this).remove();
},
```

### NewItem.vue/AgendaItem.vue
NewItem is used to create new agenda items by the user.
AgendaItem is used to display and/or edit existing agenda items.

These pages contain one external component, select-vue. This is so we can style the background dynamically which can't be done with normal select inputs.
```
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
```

```data()``` has three objects.
```form``` contains the event form data, ```errors``` contains the validation errors and ```has_errors``` is true or false depending if there is a validation error.
```
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
```

```formsubmit()``` sends the new agenda item or the edited item to the database.
```
formSubmit() {
    var self = this;

    // Determine if the event is the whole day or has a time
    if (this.form.allDay == 0 || this.form.allDay == "" || this.form.allDay == null) {
        this.form.allDay = "false";
    } else {
        this.form.allDay = "true";
    }

    // Put date + time together so fullcalendar can read it.
    if (this.form.from && this.form.date) {
        var start = this.form.date + 'T' + this.form.from;
    }

    if (this.form.till && this.form.date) {
        var end = this.form.date + 'T' + this.form.till;
    }

    axios.post('/agenda_items', { //AgendaItem uses PUT as it edits the event

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
```
```initselect()``` is used for setting the background color of the type of event based on the user's preferences. It also sets the arrow icon.
```
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
```

AgendaItem has three extra functions ```fetchPost()```, ```deleteItem()``` and ```completeItem```.

```fetchPost()``` fetches the current agenda_item based on the ```event.id``` which it gets from the router prop in ```this.$attrs.id```.
```
fetchPost() {
    var id = this.$attrs.id;

    axios.get('/agenda_items/' + id).then(response => {
        this.form = response.data[0];

        // Format the starting date
        if (this.form.start) {
            this.form.date = this.form.start.slice(0, 10)
        }

        // Format the start and/or end times
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
```

```deleteItem()``` deletes the current item if the user presses the corresponding button. A sweetAlert is fired which asks the user if they are sure they want to delete this item. A second sweetAlert is fired when the item is succesfully deleted.
```
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
```
The delete button is located in the form footer.
```
<a @click="deleteItem" class="button delete">Verwijderen</a>
```

```completeItem()``` completes the current item if the user presses the corresponding button. A SweetAlert is fired if the completion was succesfull. And the user is rederected to the home page.

If an event is later than the current date a SweetAlert is fired which asks the user if they are sure they want to complete this item. If so a second SweetAlert is fired when the item is succesfully completed.
```
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
```
### Login.vue
The page used to login to the Einstein planner. If a user is not logged in and they try to access the application, they will be redirected to this page. Auth is done with vue-auth.

```login()``` determines if the login info is correct. If so the user get's redirected to their homepage. If not, validation errors are displayed under the inputs.
```
login() {
    // get the redirect object
    var redirect = this.$auth.redirect()
    var app = this

    this.$auth.login({
        data: {
            email: app.email,
            password: app.password
        },
        success: function() {
            // handle redirection
            const redirectTo = redirect ? redirect.from.name : this.$auth.user().role === 2 ? 'admin.dashboard' : 'home'

            this.$router.push({name: redirectTo})
        },
        error: function(res) {
            // Login failed, display errors
            app.has_error = true
            app.errors = error.response.data.errors
        },
        rememberMe: true,
        fetchUser: true
    })
}
```
### Register.vue
On this page users register their account. Form data is saved in the ```data()``` object. This is also handled with vue-auth.

The ```register()``` function gets the form data and sends it to the user controller. If all data is correct the user is redirected to the login page.

```
register() {
    var self = this

    this.$auth.register({
        data: {
            first_name: self.firstname,
            last_name: self.lastname,
            student_number: self.student_number,
            email: self.email,
            password: self.password,
            password_confirmation: self.password_confirmation
        },
        success: function () {
            // Redirect to home
            self.success = true
            this.$router.push({name: 'login', params: {successRegistrationRedirect: true}})
        },
        error: function (res) {
            // Registration failed, display errors
            self.has_error = true
            self.error = res.response.data.error
            self.errors = res.response.data.errors || {}
        }
    })
}
```
### Profile.vue
The user profile. This page has three sections where the user can change their info. Personal info, agenda colors and their password.

External component vue-swatches is used to set these colors.

Profile has three items in ```data()```. ```user``` is used to save the user data in. ```color``` is for saving the selected colors by the user. And ```colors``` is the color preset for vue-swatches.
```
data() {
    return {
        user: {},
        color: {hw: '', rep: '', so: '', ft: '', cl: ''},
        colors: [
            ['#FF0000' , '#FF7900', '#FFE600', '#00FF0A', '#00FFD1', '#00BFFF', '#000000', '#8F00FF', '#FF00A6'],
            ['#FF7E7E', '#FFB47E', '#FFEA7E', '#AFFF7E', '#7EFFD8', '#7EE8FF', '#818181', '#BC87FF', '#FF7EE3'],
            ['#FEB8B8', '#FFD7B3', '#FFF5D1', '#CDFFCF', '#CDFFF6', '#B3ECFF', '#E9E9E9', '#E9E2FF', '#FFD1EF'],
            ['#FFD1D1', '#FFF0E2', '#FFFCEA', '#E4FFE2', '#E2FFF6', '#E2FAFF', '#F4F4F4', '#F2EEFF', '#FFE2FE'],
        ]
    }
},
```

```submitInfo()``` is the function used for saving the edited user info to the database. A sweetAlert is fired when it's succesfull.
```
submitInfo() {
    var self = this

    axios.put('/auth/update/', {
        
        first_name: self.user.firstname,
        last_name: self.user.lastname,
        student_number: self.user.student_number,
        email: self.user.email,
        class: self.user.class,

    })
    .then(function(response) {
        Swal.fire(
            'Opgeslagen!',
            'Je gegevens zijn opgeslagen',
            'success'
        )
    })
    .catch(function (error) {

        console.log(error);

    });
},
```

```submitColors()``` is the function used for saving the selected colors to the database. First all colors are comma seperated in a single string to make it easier to access the data. Again a sweetAlert is fired when it's succesfull.
```
submitColors() {
    var colors = this.color.hw + ',' + this.color.so + ',' + this.color.rep + ',' + this.color.ft + ',' + this.color.cl
    var self = this

    axios.put('/auth/edit/', {
        
        colors: colors

    })
    .then(function(response) {

        Swal.fire(
            'Opgeslagen!',
            'Je kleuren zijn veranderd (Misschien moet je nog refreshen om ze te tonen)',
            'success'
        )

    })
    .catch(function (error) {

        console.log(error);

    });
},
```

```getUser()``` fetches the current user data from corresponding vue-auth variables and displays the data in the top section, ready to be edited.
```
getUser() {
    // Fetch user data from vue-auth
    this.user.email = this.$auth.user().email
    this.user.firstname = this.$auth.user().first_name
    this.user.lastname = this.$auth.user().last_name
    this.user.student_number = this.$auth.user().student_number
    this.user.class = this.$auth.user().class
    
    var input = this.$auth.user().colors

    // Split colors from eachother
    if (input !== null) {
        var colors = input.split(',')
    }

    // Assign colors to data
    if (colors){
        this.color.hw = colors[0]
        this.color.so = colors[1]
        this.color.rep = colors[2]
        this.color.ft = colors[3]
        this.color.cl = colors[4]
    }
},
```

To display the name of the event type colors ```appendLabels``` is used, as there is no title prop for vue-swatches.
```
$( ".color:first-child .vue-swatches__trigger" ).append("Huiswerk");
$( ".color:nth-child(2) .vue-swatches__trigger" ).append("SO");
$( ".color:nth-child(3) .vue-swatches__trigger" ).append("Repetitie");
$( ".color:nth-child(4) .vue-swatches__trigger" ).append("Vrije tijd");
$( ".color:last-child .vue-swatches__trigger" ).append("Les rooster");
```

## Known issues
There are some issues which need te be fixed before the tool is implemented.
* The Magister API is not (yet) implemented because of budgetary reasons
* Arrows on the select on newItem and AgendaItem are not clickable
* 

## Potential functionalities
Functionalities which can strengthen the product, but could not (yet) be implemented.

* Moment of reflection
* Repeated tasks
* Print functionality
* Year view
* Reminders
* Offline mode
* Connection to parent agenda
* Connection to teacher agenda
* Contact possibility with teachers

[screen]: https://i.imgur.com/TDX41v6.png
[1]: https://magister.nl/
[2]: http://timdeis37.thirtyseven.axc.nl/
[3]: https://laravel.com/docs/5.8
[4]: https://vuejs.org/
[5]: https://getcomposer.org/
[6]: https://yarnpkg.com/en/
[7]: https://nodejs.org/en/download/
[8]: https://fullcalendar.io/docs
[9]: https://fullcalendar.io/docs/eventDragStop
[10]: https://fullcalendar.io/docs/drop
[swatch]: https://saintplay.github.io/vue-swatches/
[auth]: https://github.com/websanova/vue-auth
[zurb]: https://foundation.zurb.com/sites/docs/
[select]: https://vue-select.org/
[full]: https://github.com/CroudTech/vue-fullcalendar#readme
[sweet]: https://sweetalert2.github.io/