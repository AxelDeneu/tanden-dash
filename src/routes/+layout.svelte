<script>
	import { gsap } from 'gsap';
	import '../app.css';
	import Command from '$lib/components/elements/command.svelte';
	import AddNoteForm from '$lib/components/elements/add-note-form.svelte';

	const handleChanged = (e) => {
		gsap.to('main', {
			duration: 0.3,
			scale: e.detail.open ? 0.9 : 1
		});
	}
</script>

<main class="bg-card min-h-screen w-screen relative select-none overflow-hidden">
	<slot></slot>

	<Command on:changed={handleChanged}/>

	<AddNoteForm/>
</main>
