<script>
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	let time = new Date();

	$: formattedTime = time.toLocaleTimeString('fr-FR');
	$: formattedDate = time.toLocaleDateString('fr-FR', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if formattedTime}
	<div class="font-clock text-7xl">
		{formattedTime}
		<div class="text-2xl font-sans text-stone-400 text-center mt-1">
			{formattedDate}
		</div>
	</div>
{:else}
	<div class="">
		<Skeleton class="w-[345px] h-[95px] rounded-md" />
		<Skeleton class="w-[345px] h-[32px] rounded-md mt-1" />
	</div>
{/if}