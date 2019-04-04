<template>
    <div class="home">
        <div class="calendar_wrap">
            <full-calendar :config="config" :events="agenda_items"  @event-selected="eventClick"/>
        </div>
        
        <sidebar />
    </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/nl'
import navHeader from '../components/navHeader.vue'
import mSidebar from '../components/mSidebar.vue'
import Swal from 'sweetalert2'

export default {
    components: {
        FullCalendar,
        navHeader,
        'sidebar': mSidebar,
    },
    data() {
        return {
            agenda_items: [],
            config: {
                locale: 'nl',
                minTime: "06:00:00",
                maxTime: "22:00:00",
                editable: true,
                dropabble: true,
                dragRevertDuration: 0,
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
                        }
                    }
                },
                views: {
                    week: {
                        columnHeaderFormat: "dddd D",
                    },
                    month: {
                        columnHeaderFormat: "dddd",
                    }
                },
                eventRender(event, element) {
                    element.find('.fc-content').append('<i class="delete fas fa-trash-alt"></i> <span class="description">' + event.description + '</span>');

                    element.find(".delete").click(function() {
                        Swal.fire({
                            title: 'Weet je het zeker?',
                            text: "Je staat op het punt dit item te verwijderen",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ja, verwijderen'
                            }).then((result) => {
                                if (result.value) {
                                    $('#calendar').fullCalendar('removeEvents', event._id);
                                    
                                    axios.delete('/agenda_items/'+ event.id)

                                    Swal.fire(
                                    'Verwijderd!',
                                    'De afspraak is verwijderd.',
                                    'success'
                                    )
                                }
                            })
                    });
                },
                drop() {
                    // remove the element from the "Draggable Events" list
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

        const that = this
        $(that.$refs.modal).on('open.zf.reveal', () => {
            that.$emit('open')
        })
        $(that.$refs.modal).on('closed.zf.reveal', () => {
            that.$emit('closed')
        })
    },
    methods: {
        get_agenda_items() {
            window.axios.get('/agenda_items').then(({ data }) => {
                // console.log(data);

                this.agenda_items = data;

                this.setColors();
            });
        },
        makeDraggable() {
            // initialize the external events

            var elements = $('#external_events .fc-event')

            elements.each(function() {

                // store data so the calendar knows to render an event upon drop
                $(this).data('event', {
                    title: $.trim($(this).text()), // use the element's text as the event title
                    stick: true // maintain when user navigates (see docs on the renderEvent method)
                });

                // make the event draggable using jQuery UI
                $(this).draggable({
                    zIndex: 999,
                    revert: true,      // will cause the event to go back to its
                    revertDuration: 0  //  original position after the drag
                });

            });
        },
        setColors() {
            this.agenda_items.forEach(agenda_item => {

                if (agenda_item.type == "REP") {
                    agenda_item.color = "#8b0000";
                }
                else if (agenda_item.type == "SO") {
                    agenda_item.color = "#ff8d00";
                }
            });
        },
        eventClick(item) {
            var data = item.id
            this.$eventBus.$emit('send-data', data);
            this.$router.push({ path: '/agendaitem/' + data });
        },
        open() {
            $(this.$refs.modal).foundation('open')
        },
        close() {
            $(this.$refs.modal).foundation('close')
        },
    },
  }
</script>