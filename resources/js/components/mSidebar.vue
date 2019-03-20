<template>
    <div class="sidebar">
        <button class="close-button" aria-label="Close menu" type="button">
            <span aria-hidden="true">&times;</span>
        </button>

        <div id="external_events">
            <ul>
                <li class="fc-event">TEST</li>
                <li class="fc-event">TEST</li>
                <li class="fc-event">TEST</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.saveSidebarItems();
    },
    methods: {
        saveSidebarItems: function() {
            
            $('#external_events .fc-event').each(function() {

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
        }
    }
}
</script>

