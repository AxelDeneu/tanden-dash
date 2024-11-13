<script>
	import notes from '$lib/stores/notes.js';
	import Note from '$lib/components/elements/note.svelte';
	import { onMount } from 'svelte';

	let notesRef;
	let filteredNotes;

	onMount(async () => {
		if (typeof window !== "undefined") {
			try {
				const { gsap } = await import ("gsap");

				gsap.set(notesRef, {
					opacity: 1,
					duration: 0.5,
					delay: 1,
				});
			} catch (e) {
				console.error(e);
			}
		}
	});

	export let page;

	$: if ($notes) {
		filteredNotes = $notes.filter((note) => note.page === page);

		console.log("Notes for page " + page, filteredNotes);
	}
</script>

<div class="absolute left-0 top-0 pointer-events-none w-full h-full opacity-0 transition-all" bind:this={notesRef}>
	{#each filteredNotes as note}
		{#key note.id}
			<Note {note} />
		{/key}
	{/each}
</div>