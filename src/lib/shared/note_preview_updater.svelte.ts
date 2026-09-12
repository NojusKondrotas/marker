import ColorHex from "@/models/ColorHex";
import NoteColorId from "@/models/NoteColorId";
import NotesStore from "@/stores/NotesStore";
import type { UUID } from "crypto";
import { get } from "svelte/store";

export function removeColor(id: UUID, colorIdx: number): boolean {
    const allNotes = get(NotesStore);
    const noteIdx = allNotes.findIndex((note) => note.id === id);
    if (noteIdx === -1)
        return false;
    const note = allNotes[noteIdx];
    if (colorIdx < 0 || colorIdx >= note.colors.length)
        return false;

    const colors = [...note.colors];
    colors.splice(colorIdx, 1);

    const newNote = { ...note, colors };
    allNotes[noteIdx] = newNote;

    NotesStore.set(allNotes);
    return true;
}

export function addColor(id: UUID): boolean {
    const allNotes = get(NotesStore);
    const noteIdx = allNotes.findIndex((note) => note.id === id);
    if (noteIdx === -1)
        return false;
    const note = allNotes[noteIdx];

    const colors = [...note.colors];
    if (colors.length === 18)
        return false;
    colors.push(new NoteColorId(new ColorHex('f25004')));

    const newNote = { ...note, colors };
    allNotes[noteIdx] = newNote;

    NotesStore.set(allNotes);
    return true;
}

export function updateColor(id: UUID, colorIdx: number, colorHex: string): boolean {
    const allNotes = get(NotesStore);
    const noteIdx = allNotes.findIndex((note) => note.id === id);
    if (noteIdx === -1)
        return false;
    const note = allNotes[noteIdx];
    if (colorIdx < 0 || colorIdx >= note.colors.length || colorHex.length != 6)
        return false;

    const colors = note.colors.map((c, i) =>
        i === colorIdx ? new NoteColorId(new ColorHex(colorHex), c.id) : c
    );

    const newNote = { ...note, colors };
    allNotes[noteIdx] = newNote;

    NotesStore.set(allNotes);
    return true;
}

export function moveColorLeft(id: UUID, colorIdx: number): boolean {
    const allNotes = get(NotesStore);
    const noteIdx = allNotes.findIndex((note) => note.id === id);
    if (noteIdx === -1)
        return false;
    const note = allNotes[noteIdx];
    if (colorIdx < 0 || colorIdx >= note.colors.length)
        return false;

    const colors = [...note.colors];
    if (colorIdx === 0) {
        colors.push(colors.shift()!);
    } else {
        [colors[colorIdx - 1], colors[colorIdx]] = [colors[colorIdx], colors[colorIdx - 1]];
    }

    const newNote = { ...note, colors };
    allNotes[noteIdx] = newNote;

    NotesStore.set(allNotes);
    return true;
}

export function moveColorRight(id: UUID, colorIdx: number) {
    const allNotes = get(NotesStore);
    const noteIdx = allNotes.findIndex((note) => note.id === id);
    if (noteIdx === -1)
        return false;
    const note = allNotes[noteIdx];
    if (colorIdx < 0 || colorIdx >= note.colors.length)
        return false;

    const colors = [...note.colors];
    if (colorIdx === colors.length - 1) {
        colors.splice(0, 0, colors.pop()!);
    } else {
        [colors[colorIdx], colors[colorIdx + 1]] = [colors[colorIdx + 1], colors[colorIdx]];
    }

    const newNote = { ...note, colors };
    allNotes[noteIdx] = newNote;

    NotesStore.set(allNotes);
    return true;
}