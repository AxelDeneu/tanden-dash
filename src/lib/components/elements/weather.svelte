<script>
	import Weather from '$lib/utils/weather.js';
	import WeatherIcon from '$lib/components/weather-icon.svelte';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	let weather;
	let size = 112;

	onMount(() => {
		(new Weather()).getWeather(47.685850, 0.423760)
			.then(data => {
				weather = data;
				console.log(weather);
			})
			.catch(error => {
				console.error(error);
			});
	});
</script>


{#if weather}
	<div class="flex items-center justify-center space-x-4">
		<WeatherIcon weatherCode={weather.current.weather_code} />
		<div class="text-7xl leading-[1] text-foreground">
			{weather.current.temperature_2m}°C
		</div>
	</div>
{:else}
	<div class="flex items-center justify-center space-x-4">
		<Skeleton class="w-[112px] h-[112px] rounded-full" />
		<Skeleton class="w-[214px] h-[72px] rounded-md" />
	</div>
{/if}

