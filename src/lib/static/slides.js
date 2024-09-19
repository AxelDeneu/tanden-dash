import Home from '$lib/components/pages/home.svelte';
import Calendar from '$lib/components/pages/calendar.svelte';

const slides = [
	{
		"slug": "home",
		"title": "Accueil",
		"component": Home
	},
	{
		"slug": "calendar",
		"title": "Calendrier",
		"component": Calendar
	}
];

export default slides;