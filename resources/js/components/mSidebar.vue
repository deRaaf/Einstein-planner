<template>
    <div class="sidebar">
        <button class="close-button" aria-label="Close menu" type="button">
            <span aria-hidden="true">&times;</span>
        </button>

        <div class="sidebar__header">
            
        </div>

        <div class="sidebar__content">
            <h2>Taken</h2>
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
                    <div class="class">Engels</div>
                    <div class="date"> 
                        <span class="date__day">3</span>
                        <span class="date__month">mei</span>
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

