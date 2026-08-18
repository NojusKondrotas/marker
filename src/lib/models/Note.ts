import type NoteColorId from "./NoteColorId";
import type NoteHighlight from "./NoteHighlight";
import type NoteTitle from "./NoteTitle";

export default class Note {
    id: number;
    colors: NoteColorId[];
    titles: NoteTitle[];
    highlights: NoteHighlight[];
    content: string;

    constructor(id: number, colors: NoteColorId[], titles: NoteTitle[], highlights: NoteHighlight[], content: string) {
        this.id = id;
        this.colors = colors;
        this.titles = titles;
        this.highlights = highlights;
        this.content = content.slice(0, 300);
    }
}