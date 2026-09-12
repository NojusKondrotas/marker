import { error } from '@sveltejs/kit';

export async function load( { params, parent } ) {
    const { note, mark } = params;

    const { notes } = await parent();
    const linkedNote = notes.find((curr) => curr.id === note);

    if (!linkedNote) throw error(404);

    return {
        note: linkedNote.id,
        mark
    };
}