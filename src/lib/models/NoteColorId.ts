import type { UUID } from "crypto";
import type ColorHex from "./ColorHex";

export default class NoteColorId {
    id: UUID;
    hex: ColorHex;

    constructor(id: UUID, hex: ColorHex) {
        this.id = id;
        this.hex = hex;
    }
}