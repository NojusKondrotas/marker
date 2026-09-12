import type NotePreview from "@/models/NotePreview";
import { writable } from "svelte/store";

const NotesStore = writable([] as NotePreview[]);

export default NotesStore;