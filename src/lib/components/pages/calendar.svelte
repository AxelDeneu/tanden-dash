<script>
	import Date from '$lib/components/elements/date.svelte';
	import Weather from '$lib/components/elements/weather.svelte';
	import FullCalendar from '$lib/components/elements/fullcalendar.svelte';

	export let data
</script>

<div class="flex items-center justify-between p-14">
	<FullCalendar events={data.events} />
</div>