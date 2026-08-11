import type Note from '@/models/Note.js';
import NotesStore from '@/stores/NotesStore.js';
import { error } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function load( { params } ) {
    const { note, mark } = params;

    const allNotes = get(NotesStore);
    const linkedNote = allNotes.find((curr: Note) => curr.id === Number(note));

    if (!linkedNote) throw error(404);

    return {
        note: linkedNote.id,
        mark
    };
}