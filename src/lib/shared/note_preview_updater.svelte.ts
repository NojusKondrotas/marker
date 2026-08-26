import NotesStore from "@/stores/NotesStore";
import { get } from "svelte/store";

export function removeColor(e: MouseEvent, id: number, colorIdx: number): boolean {
    e.preventDefault();
    e.stopPropagation();

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
    const newAllNotes = [...allNotes];
    newAllNotes[noteIdx] = newNote;

    NotesStore.set(newAllNotes);
    return true;
}

export function moveColorLeft(e: MouseEvent, id: number, colorIdx: number): boolean {
    e.preventDefault();
    e.stopPropagation();

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
    const newAllNotes = [...allNotes];
    newAllNotes[noteIdx] = newNote;

    NotesStore.set(newAllNotes);
    return true;
}

export function moveColorRight(e: MouseEvent, id: number, colorIdx: number) {
    e.preventDefault();
    e.stopPropagation();

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
    const newAllNotes = [...allNotes];
    newAllNotes[noteIdx] = newNote;

    NotesStore.set(newAllNotes);
    return true;
}