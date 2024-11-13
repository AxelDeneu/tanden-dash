import Home from '$lib/components/pages/home.svelte';
import Calendar from '$lib/components/pages/calendar.svelte';

const slides = [
	{
		"slug": "calendar",
		"title": "Calendrier",
		"component": Calendar
	},
	{
		"slug": "home",
		"title": "Accueil",
		"component": Home
	}
];

export default slides;