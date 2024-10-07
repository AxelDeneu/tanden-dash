<script>
	import { onMount, onDestroy } from 'svelte';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid'; // For the Day Grid view
	import interactionPlugin from '@fullcalendar/interaction'; // For interactivity

	let calendar;
	let calendarEl;

	export let events;

	onMount(() => {
		calendar = new Calendar(calendarEl, {
			plugins: [dayGridPlugin, interactionPlugin],
			initialView: 'dayGridMonth',
			events: events,
			dateClick: function(info) {
				alert('Clicked on: ' + info.dateStr);
			}
		});

		calendar.render();
	});

	// Cleanup the calendar instance when the component is destroyed
	onDestroy(() => {
		if (calendar) {
			calendar.destroy();
		}
	});
</script>

<style>
    .calendar-container {
		    @apply w-full m-0;
    }
</style>

<div class="calendar-container">
	<!-- This div will host the FullCalendar instance -->
	<div bind:this={calendarEl}></div>
</div>
