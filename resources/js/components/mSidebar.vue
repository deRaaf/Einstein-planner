<template>
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

                    <button class="refresh" @click="refresh">
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

                    <button class="refresh" @click="refresh">
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

                    <div class="fc-event">
                        <div class="type">HW</div>
                        <div class="class">Engels</div>
                        <div class="date"> 
                            <span class="date__day">3</span>
                            <span class="date__month">mei</span>
                        </div>
                    </div>
                    <div class="fc-event">
                        <div class="type">HW</div>
                        <div class="class">Aardrijkskunde</div>
                        <div class="date"> 
                            <span class="date__day">5</span>
                            <span class="date__month">aug</span>
                        </div>
                    </div>
                    <div class="fc-event">
                        <div class="type">HW</div>
                        <div class="class">Engels</div>
                        <div class="date"> 
                            <span class="date__day">3</span>
                            <span class="date__month">mei</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {

}
</script>

