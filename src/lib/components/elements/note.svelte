<script>
	import { onMount } from "svelte";
	import notes from "$lib/stores/notes";

	import { Button } from "$lib/components/ui/button";
	import DeleteNoteForm from "$lib/components/elements/delete-note-form.svelte";
	import { Trash } from 'lucide-svelte';

	let noteRef;
	let deleteRef;
	let draggableInstance;

	let deleteModal = false;

	const handleDelete = (e) => {
		deleteModal = true;
	}

	onMount(async () => {
		if (typeof window !== "undefined") {
			try {
				const { gsap } = await import ("gsap");
				const { Draggable } = await import("gsap/Draggable");

				gsap.registerPlugin(Draggable);

				gsap.set(noteRef, {
					x: note.x ?? 200,
					y: note.y ?? 200,
				});

				draggableInstance = Draggable.create(noteRef, {
					type: "x,y",
					inertia: true,
					bounds: "body",
					onPress: () => {
						gsap.to(noteRef, { scale: 1.1, duration: 0.2 });

						// show the delete button
						gsap.to(noteRef.querySelector('.trash-button'), {
							opacity: 1,
							duration: 0.2
						});
					},
					onRelease: () => {
						gsap.to(noteRef, { scale: 1, duration: 0.2 });

						// handle the position change by updating the note via api call
						// we must set the transformed x and y to the note object
						note.x = draggableInstance[0].x;
						note.y = draggableInstance[0].y;

						// call the api by posting a form-encoded data
						fetch(`?/update-note-position`, {
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
							},
							body: JSON.stringify(note),
						});

						// update the note store
						notes.update((n) => {
							const index = n.findIndex((item) => item.id === note.id);
							n[index] = note;
							return n;
						});

						gsap.to(noteRef.querySelector('.trash-button'), {
							opacity: 0,
							duration: 0.2,
							delay: 3
						});
					}
				});
			} catch (error) {
				console.error("Error loading GSAP or Draggable plugin:", error);
			}
		}
	});

	export let note;
</script>

<div class="absolute pointer-events-auto" bind:this={noteRef}>
	<div class="sticky-note">
		<div>{note.content}</div>
	</div>

	<Button variant="destructive" size="icon" class="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-0 trash-button" on:click={handleDelete}>
		<Trash class="h-4 w-4" />
	</Button>
</div>

<DeleteNoteForm open={deleteModal} {note}/>

<style>
    .sticky-note {
        position: relative;
        width: 250px;
        height: 250px;
        background:#ffa;
        overflow:hidden;
        padding:20px;
        border-radius:0 0 0 30px/45px;
        box-shadow:
                inset 0 -40px 40px rgba(0,0,0,0.2),
                inset 0 25px 10px rgba(0,0,0,0.2),
                0 5px 6px 5px rgba(0,0,0,0.2);
        font-family: 'Permanent Marker', cursive;
        line-height:1.3em;
        font-size:19px;
        word-break: break-all;
        /*-webkit-mask-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC) !important;*/

        color:#130d6b;
    }

    .sticky-note:before {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 25px;
        background: #ffa;
        box-shadow: 3px -2px 10px rgba(0, 0, 0, 0.2),
        inset 15px -15px 15px rgba(0, 0, 0, 0.3);
        left: 0;
        bottom: 0;
        z-index: 2;
        transform: skewX(25deg);
    }

    .sticky-note:after {
        content:"";
        display:block;
        position:absolute;
        width:75%;
        height:20px;
        border-top:3px solid #130d6b;
        border-radius: 50% ;
        bottom:0px;
        left:10%;
    }

    .sticky-note:active {
        cursor: grabbing;
    }
</style>