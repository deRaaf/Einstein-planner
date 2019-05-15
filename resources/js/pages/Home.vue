<template ref="foo">
    <div class="home">
        <div class="calendar_wrap">
            <full-calendar :config="config" :events="agenda_items"  @event-selected="eventClick" @event-receive="eventReceive"/>
        </div>
        
        <div class="sidebar">

            <div class="sidebar__header">
                <button @click="collapse" class="close" aria-label="Close menu" type="button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.66666 4L13.3333 10.6667L6.66666 17.3333" stroke="#B3ECFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <h2>Taken</h2>

                <div class="right">
                    <router-link to="/stappenplan" class="info">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#B3ECFF"/>
                            <path d="M7.50839 12.072C7.24439 12.072 7.02439 12 6.84839 11.856C6.68039 11.712 6.59639 11.5 6.59639 11.22V6.84C6.59639 6.56 6.68439 6.348 6.86039 6.204C7.03639 6.06 7.25239 5.988 7.50839 5.988C7.76439 5.988 7.97639 6.06 8.14439 6.204C8.32039 6.348 8.40839 6.56 8.40839 6.84V11.22C8.40839 11.5 8.32039 11.712 8.14439 11.856C7.97639 12 7.76439 12.072 7.50839 12.072ZM7.50839 5.028C7.18839 5.028 6.93639 4.948 6.75239 4.788C6.56839 4.62 6.47639 4.396 6.47639 4.116C6.47639 3.836 6.56839 3.616 6.75239 3.456C6.93639 3.296 7.18839 3.216 7.50839 3.216C7.82039 3.216 8.06839 3.3 8.25239 3.468C8.44439 3.628 8.54039 3.844 8.54039 4.116C8.54039 4.396 8.44839 4.62 8.26439 4.788C8.08039 4.948 7.82839 5.028 7.50839 5.028Z" fill="white"/>
                        </svg>
                    </router-link>

                    <button class="refresh" @click="get_agenda_items">
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.46343 5.65018C2.92992 7.61243 3.43178 9.79171 4.97355 11.3335C7.14754 13.5075 10.6035 13.6156 12.9011 11.6579" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.43711 7.31577L3.46046 4.94736L1.48975 7.31577" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.4363 8.39914C14.9698 6.43688 14.4679 4.25761 12.9262 2.71584C10.6384 0.428053 6.93091 0.428053 4.64764 2.71584" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.5424 7.3158L14.519 9.68421L16.4897 7.3158" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="sidebar__content">
                <h2>Taken 
                    <router-link to="/stappenplan" class="info">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="7.5" fill="#B3ECFF"/>
                            <path d="M7.50839 12.072C7.24439 12.072 7.02439 12 6.84839 11.856C6.68039 11.712 6.59639 11.5 6.59639 11.22V6.84C6.59639 6.56 6.68439 6.348 6.86039 6.204C7.03639 6.06 7.25239 5.988 7.50839 5.988C7.76439 5.988 7.97639 6.06 8.14439 6.204C8.32039 6.348 8.40839 6.56 8.40839 6.84V11.22C8.40839 11.5 8.32039 11.712 8.14439 11.856C7.97639 12 7.76439 12.072 7.50839 12.072ZM7.50839 5.028C7.18839 5.028 6.93639 4.948 6.75239 4.788C6.56839 4.62 6.47639 4.396 6.47639 4.116C6.47639 3.836 6.56839 3.616 6.75239 3.456C6.93639 3.296 7.18839 3.216 7.50839 3.216C7.82039 3.216 8.06839 3.3 8.25239 3.468C8.44439 3.628 8.54039 3.844 8.54039 4.116C8.54039 4.396 8.44839 4.62 8.26439 4.788C8.08039 4.948 7.82839 5.028 7.50839 5.028Z" fill="white"/>
                        </svg>
                    </router-link>

                    <button class="refresh" @click="get_agenda_items">
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.46343 5.65018C2.92992 7.61243 3.43178 9.79171 4.97355 11.3335C7.14754 13.5075 10.6035 13.6156 12.9011 11.6579" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.43711 7.31577L3.46046 4.94736L1.48975 7.31577" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.4363 8.39914C14.9698 6.43688 14.4679 4.25761 12.9262 2.71584C10.6384 0.428053 6.93091 0.428053 4.64764 2.71584" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.5424 7.3158L14.519 9.68421L16.4897 7.3158" stroke="#B3ECFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </h2>
                <p>In dit venster vind je het huiswerk dat de docent heeft ingevoerd. Zet de taken op volgorde en plan ze in.</p>

                <router-link class="button primary expanded" to="/newitem">Nieuw agenda item</router-link>

                <div id="external_events">

                    <div class="fc-event" :key="magister_item.id" v-for="magister_item in magister_items">
                        <div class="type" :style="'background:' + magister_item.color">{{ magister_item.type }}</div>
                        <div class="class">{{ magister_item.exc }}</div>
                        <div class="date"> 
                            <span class="date__day">{{ magister_item.deadlineDay }}</span>
                            <span class="date__month">{{ magister_item.deadlineMonth }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            magister_items: [
                {id: 1, type: 'HW', exc: 'EN: H5 opdr 21', deadlineDay: 7, deadlineMonth: 'mei'},
                {id: 2, type: 'SO', exc: 'BIO: H2 opdr 4', deadlineDay: 9, deadlineMonth: 'mei'},
                {id: 3, type: 'REP', exc: 'EN: H4', deadlineDay: 7, deadlineMonth: 'mei'},
                {id: 4, type: 'HW', exc: 'WIS: H3 opdr 4/5/6', deadlineDay: 10, deadlineMonth: 'mei'},
                {id: 5, type: 'SO', exc: 'WIS: H2', deadlineDay: 8, deadlineMonth: 'mei'},
            ],
            agenda_items: [],
            notHome: true,
            config: {
                locale: 'nl',
                // minTime: "06:00:00",
                // maxTime: "22:00:00",
                timeFormat: "H:mm",
                displayEventTime: false,
                droppable: true,
                eventStartEditable: false,
                dragRevertDuration: 0,
                defaultTimedEventDuration: '01:00:00',
                eventDurationEditable: false,
                nowIndicator: true,
                height: 'parent',
                allDaySlot: false,
                header: {
                    left: 'menu title',
                    center: '',
                    right: 'prev next today month,agendaWeek,agendaDay'
                },
                customButtons: {
                    menu: {
                        text: ' ',
                        click: function() {
                            $( ".off-canvas" ).addClass("active");
                            $( ".overlay" ).addClass("active");
                        }
                    }
                },
                views: {
                    week: {
                        columnHeaderFormat: "dddd D",
                        slotLabelFormat: [
                            'H:mm',
                        ],
                        titleFormat: "MMMM YYYY",
                    },
                    day: {
                        slotLabelFormat: [
                            'H:mm',
                        ],
                    },
                    month: {
                        columnHeaderFormat: "dddd",
                    }
                },
                drop(e) {
                    // remove the element from the "External Events" list
                    $(this).remove();
                },
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
            },
        }
    },
    mounted() {
        this.get_agenda_items();
        this.makeDraggable();
    },
    methods: {
        get_agenda_items() {
            axios.get('/agenda_items').then(({ data }) => {

                // Populate the agenda_items array in data()
                this.agenda_items = data;

                // Set user colors
                this.setColors();
            });
        },
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
        setColors() {
            var self = this

            // Get the colors from the database
            var input = self.$auth.user().colors

            // Set the color for each agenda item, if they are of a specific type
            this.agenda_items.forEach(agenda_item => {

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
            
            // Set the color for each magister(sidebar) item, if they are of a specific type
            this.magister_items.forEach(magister_item => {

                if(input !== null) {

                    var colors = input.split(',')

                    if (magister_item.type == "HW") {
                        magister_item.color = colors[0];
                    } else if (magister_item.type == "REP") {
                        magister_item.color = colors[1];
                    } else if (magister_item.type == "SO") {
                        magister_item.color = colors[2];
                    } else if (magister_item.type == "Vrij") {
                        magister_item.color = colors[3];
                    } else if (magister_item.type == "Les") {
                        magister_item.color = colors[4];
                    }
                }
            });
        },
        eventClick(item) {
            var data = item.id
            this.$router.push({ path: '/agendaitem/' + data });
        },
        collapse() {
            $(".calendar_wrap").toggleClass("collapsed");
            $(".sidebar").toggleClass("collapsed");
        },
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
    },
  }
</script>