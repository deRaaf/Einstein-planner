<template>
  <div class="home">
            <div class="top-bar">

          <div class="top-bar-left">
            <router-link to="/">
                <img class="logo" src="/../img/logo_einsteinclass.png" alt="Logo Einstein planner">
            </router-link>
          </div>

          <div class="top-bar-right">
            <ul class="menu">
                    <li v-if="!authenticated && !user"><router-link to="/login">Login</router-link></li>
                    <li v-if="!authenticated && !user"><router-link to="/register">Register</router-link></li>
                    <ul v-if="authenticated && user" class="dropdown menu" data-dropdown-menu>
                        <li>
                            <!-- <a href="#">{{ Auth::user()->name }}</a> -->
                            <ul class="menu">
                                <li>
                                    <router-link to="/logout" @click="Auth.logout()">
                                        Logout
                                    </router-link>

                                    <!-- <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        {{ csrf_field() }}
                                    </form> -->
                                </li>
                            </ul>
                        </li>
                    </ul>
                <!-- @endif -->
            </ul>
          </div>

        </div>
    <router-link class="button primary" to="/newitem">Nieuw agenda item</router-link>
    <full-calendar :config="config" :events="agenda_items"/>
  </div>
</template>

<script>
import { FullCalendar } from 'vue-full-calendar'
import 'fullcalendar/dist/locale/nl'
import 'axios/dist/axios'
import Swal from 'sweetalert2'

export default {
    components: {
        FullCalendar,
    },
    data() {
        return {
            authenticated: auth.check(),
            user: auth.user,
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
    mounted() {
        Event.$on('userLoggedIn', () => {
            this.authenticated = true;
            this.user = auth.user;
        }); 
    },
    methods: {
        get_agenda_items: function() {
            window.axios.get('api/agenda_items').then(({ data }) => {
                console.log(data);

                this.agenda_items = data;
            });
        },  
    },
  }
</script>