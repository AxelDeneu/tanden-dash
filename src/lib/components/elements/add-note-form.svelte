<script>
	import { enhance } from '$app/forms';
	import notes from '$lib/stores/notes.js';
	import { open } from '$lib/stores/add-note-drawer.js';
	import { current } from '$lib/stores/current-carousel-item.js';
	import * as Drawer from "$lib/components/ui/drawer";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Textarea } from "$lib/components/ui/textarea";

	const handle = ({ formElement, formData, action, cancel }) => {
		return async ({ result }) => {
			if(result.type === "success") {
				notes.update(notes => [result.data.note, ...notes]);

				open.set(false);
			}
		};
	}
</script>

<Drawer.Root bind:open={$open}>
	<Drawer.Content>
		<form class="mx-auto w-full max-w-lg" method="POST" action="?/add-note" use:enhance={handle}>
			<input type="hidden" name="page" value={$current}/>
			<Drawer.Header>
				<Drawer.Title>Ajouter une note</Drawer.Title>
			</Drawer.Header>
			<div class="grid grid-cols-1 gap-y-2 p-4">
				<Textarea placeholder="Le contenu de ta note" name="content" id="content" />
			</div>
			<Drawer.Footer>
				<Button type="submit">Ajouter</Button>
			</Drawer.Footer>
		</form>
	</Drawer.Content>
</Drawer.Root>