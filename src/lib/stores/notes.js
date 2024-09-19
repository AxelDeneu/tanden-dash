// src/stores/notesStore.js
import { writable } from 'svelte/store';

// Initialize the store with an empty array
const notes = writable([]);

export default notes;