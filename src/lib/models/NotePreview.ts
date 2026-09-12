import type NoteColorId from "./NoteColorId";
import type NoteHighlight from "./NoteHighlight";
import type NoteTitle from "./NoteTitle";

export default class NotePreview {
    id: string;
    colors: NoteColorId[];
    titles: NoteTitle[];
    highlights: NoteHighlight[];
    content: string;

    constructor(id: string, colors: NoteColorId[], titles: NoteTitle[], highlights: NoteHighlight[], content: string) {
        this.id = id;
        this.colors = colors;
        this.titles = titles;
        this.highlights = highlights;
        this.content = content.slice(0, 300);
    }
}