// src/routes/+page.server.ts
import prisma from '$lib/prisma';

export const load = (async () => {
	const response = await prisma.note.findMany()

	return { notes: response };
});

export const actions = {
	"add-note": async ({ cookies, request }) => {
		const data = await request.formData();

		try {
			const note = await prisma.note.create({
				data: {
					content: data.get("content"),
					page: data.get("page"),
					x: 400,
					y: 400,
				},
			});

			console.log(note);

			return { note, success: true };
		} catch (error) {
			return { error: error.message, success: false };
		}
	},

	"delete-note": async ({ cookies, request }) => {
		const data = await request.formData();

		console.log(data.get("id"));

		try {
			const note = await prisma.note.delete({
				where: {
					id: parseInt(data.get("id")),
				},
			});

			// get all notes
			const notes = await prisma.note.findMany();

			return { notes, success: true };
		} catch (error) {
			return { error: error.message, success: false };
		}
	},

	"update-note-position": async ({ cookies, request }) => {
		const data = await request.json();

		try {
			const note = await prisma.note.update({
				where: {
					id: data.id,
				},
				data: {
					x: data.x,
					y: data.y,
				},
			});

			return { note, success: true };
		} catch (error) {
			return { error: error.message, success: false };
		}
	}
}