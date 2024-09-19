<script lang="ts">
	import { onMount } from 'svelte';
	import { open as openNoteDrawer } from '$lib/stores/add-note-drawer.js';
	import * as Command from '$lib/components/ui/command';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let open = false;

	$: dispatch('changed', {
		open: open
	});

	const handleAddNoteButton = (e) => {
		$openNoteDrawer = true;
		open = false;
	};

	onMount(() => {
		function handleKeydown(e) {
			if ((e.key === 'k'|| e.key === 'K') && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		}

		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Command.Dialog bind:open>
	<Command.Input placeholder="Recherche une action..." />
	<Command.List>
		<Command.Empty>Aucun résultat</Command.Empty>
		<Command.Group heading="Suggestions">
			<Command.Item onSelect={handleAddNoteButton}>Ajouter une note</Command.Item>
			<Command.Item>TEST</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>