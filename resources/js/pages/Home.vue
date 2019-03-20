<template>
    <div class="home">
        <div class="calendar_wrap">
            <router-link class="button primary" to="/newitem">Nieuw agenda item</router-link>
            <full-calendar :config="config" :events="agenda_items"/>
        </div>
        <sidebar></sidebar>
    </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import navHeader from '../components/navHeader.vue'
import mSidebar from '../components/mSidebar.vue'
import 'fullcalendar/dist/locale/nl'
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
                minTime: "08:00:00",
                maxTime: "22:00:00",
                editable: true,
                nowIndicator: true,   
                // allDaySlot: false,
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
                                    $('#calendar').fullCalendar('removeEvents',event._id);
                                    
                                    axios.delete('api/agenda_items/'+ event.id + '?api_token=123')

                                    Swal.fire(
                                    'Verwijderd!',
                                    'De afspraak is verwijderd.',
                                    'success'
                                    )
                                }
                            })
                    });
                }
            },
        }
    },
    created() {
        this.get_agenda_items();
    },
    methods: {
        get_agenda_items: function() {
            window.axios.get('/agenda_items').then(({ data }) => {
                console.log(data);

                this.agenda_items = data;
            });
        },  
    },
  }
</script>