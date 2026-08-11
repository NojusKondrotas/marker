export default class NoteHighlight {
    offset: number;
    contents: string;

    constructor(offset: number, contents: string) {
        this.offset = offset;
        this.contents = contents;
    }
}