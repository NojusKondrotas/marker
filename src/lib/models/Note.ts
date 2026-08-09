import type ColorHex from "./ColorHex";
import type NoteTitle from "./NoteTitle";

export default class Note {
    id: number;
    colors: ColorHex[];
    titles: NoteTitle[];
    content: string;

    constructor(id: number, colors: ColorHex[], titles: NoteTitle[], content: string) {
        this.id = id;
        this.colors = colors;
        this.titles = titles;
        this.content = content.slice(0, 300);
    }
}