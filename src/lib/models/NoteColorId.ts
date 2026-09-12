import type { UUID } from "crypto";
import type ColorHex from "./ColorHex";

export default class NoteColorId {
    id: UUID;
    hex: ColorHex;

    constructor(hex: ColorHex, id?: UUID) {
        this.id = id ? id : crypto.randomUUID();
        this.hex = hex;
    }
}