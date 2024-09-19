<script>
	import { gsap } from 'gsap';
	import { tick } from 'svelte';
	import * as Carousel from '$lib/components/ui/carousel';
	import Home from '$lib/components/pages/home.svelte';
	import Notes from '$lib/components/elements/notes.svelte';
	import notes from '$lib/stores/notes.js';
	import { current } from '$lib/stores/current-carousel-item.js';
	import slides from '$lib/static/slides.js';

	let api;
	let count = 0;
	let currentSlide = 0;
	let currentText = slides[0].title;
	let letters = currentText.split("");
	let animationInProgress = false; // Flag to prevent overlapping animations

	async function changeText(newString) {
		if (animationInProgress) {
			gsap.killTweensOf(".letter"); // Kill any ongoing letter animations
		}

		animationInProgress = true;
		const textElements = document.querySelectorAll(".letter");

		// Animate each letter out (fade out and move up)
		gsap.to(textElements, {
			opacity: 0,
			y: -10,
			stagger: 0.02, // Stagger the animation for each letter
			duration: 0.2,
			onComplete: async () => {
				// Once the letters are animated out, update the text
				currentText = newString;
				await tick(); // Ensure Svelte updates the DOM with the new letters
				letters = currentText.split(""); // Split the new text into letters

				await tick(); // Ensure DOM is updated with new letters

				const newTextElements = document.querySelectorAll(".letter");

				// Animate in each letter (fade in and move down)
				gsap.fromTo(
					newTextElements,
					{
						opacity: 0,
						y: 10
					},
					{
						opacity: 1,
						y: 0,
						stagger: 0.02,
						duration: 0.2,
						onComplete: () => {
							animationInProgress = false; // Reset the flag when the animation completes
						}
					}
				);
			}
		});
	}

	$: if (api) {
		count = api.scrollSnapList().length;
		currentSlide = api.selectedScrollSnap();
		api.on('select', () => {
			currentSlide = api.selectedScrollSnap();
			current.set(slides[currentSlide].slug);

			changeText(slides[currentSlide].title);
		});
	}

	export let data;
	notes.set(data.notes);
</script>

<Carousel.Root
	class="h-screen"
	opts={{
	  align: "start",
	  loop: false,
	  dots: true
	}}
	bind:api
>
	<Carousel.Content class="min-h-screen">
		{#each slides as slide}
			<Carousel.Item>
				{#if slide.component}
					<svelte:component this={slide.component} />
				{:else}
					<h1 class="text-4xl text-white">{slide.title}</h1>
				{/if}

				<Notes page={slide.slug} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
</Carousel.Root>

<div class="absolute bottom-6 left-0 w-full flex flex-col items-center justify-center space-y-3">
	<div class="current-slide font-semibold text-lg tracking-wide">
		{#each letters as letter, i (i + letter)}
			<span class="letter relative translate-y-0 inline-block">{letter}</span>
		{/each}
	</div>
	<div class="w-full flex items-center justify-center space-x-3">
		{#each { length: count } as _, i}
			<button
				class="w-4 h-4 rounded-full hover:opacity-100 transition-all"
				class:bg-foreground={i === currentSlide}
				class:bg-stone-800={i !== currentSlide}
				on:click={() => api.scrollTo(i)}
			/>
		{/each}
	</div>
</div>