import type ColorHex from "./ColorHex";

export default class NoteColorId {
    id: number;
    hex: ColorHex;

    constructor(id: number, hex: ColorHex) {
        this.id = id;
        this.hex = hex;
    }
}