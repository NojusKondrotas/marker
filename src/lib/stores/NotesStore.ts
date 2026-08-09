import type Note from "@/models/Note";
import { writable } from "svelte/store";

const NotesStore = writable([] as Note[]);

export default NotesStore;