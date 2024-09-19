<script>
	import { Sun } from 'lucide-svelte';

	export let weatherCode = 0;
	export let size = 112;
</script>

{#if weatherCode === 0 || weatherCode === 3}
	<Sun {size} class="text-stone-400" />
{/if}