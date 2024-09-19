<script>
	import { enhance } from '$app/forms';
	import notes from '$lib/stores/notes.js';
	import * as Drawer from "$lib/components/ui/drawer";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";

	const handle = ({ formElement, formData, action, cancel }) => {
		return async ({ result }) => {
			if(result.type === "success") {
				notes.update(notes => result.data.notes);

				open = false;
			}
		};
	}

	export let open, note;
</script>

<Drawer.Root bind:open>
	<Drawer.Content>
		<form class="mx-auto w-full max-w-lg" method="POST" action="?/delete-note" use:enhance={handle}>
			<Drawer.Header>
				<Drawer.Title>Supprimer une note</Drawer.Title>
			</Drawer.Header>
			<div class="grid grid-cols-1 gap-y-2 p-4">
				Veux-tu vraiment supprimer cette note ?
				<input type="hidden" name="id" value={note.id}/>
			</div>
			<Drawer.Footer>
				<Button variant="destructive" type="submit">Oui, supprimer</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>