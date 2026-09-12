import ColorHex from "@/models/ColorHex";
import NotePreview from "@/models/NotePreview";
import NoteColorId from "@/models/NoteColorId";
import NoteHighlight from "@/models/NoteHighlight";
import NoteTitle from "@/models/NoteTitle";
import NotesStore from "@/stores/NotesStore";

export async function load() {
    const notes = [];
    notes.push(new NotePreview(
        '04bcf5bd-14ab-490e-813e-891961153a1e',
        [new NoteColorId(new ColorHex("403D88")), new NoteColorId(new ColorHex("ff00ff"))],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "RomeoSierra TangoUniformVictor"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    notes.push(new NotePreview(
        'f992aaf1-9e09-4aa1-8c36-c053d7b7d8d0',
        [new NoteColorId(new ColorHex("403D88")), new NoteColorId(new ColorHex("ff00ff"))],
        [new NoteTitle(0, "Oscar"), new NoteTitle(1024, "Romeo"), new NoteTitle(2048, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform"));
    notes.push(new NotePreview(
        '40402e14-7fde-4600-8cc3-9a9f78de6cdd',
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(384, "Romeo"), new NoteTitle(2565458, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia")],
        "India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform"));
    notes.push(new NotePreview(
        '2f2a8e65-e103-4476-9cfc-ee08395e1a5c',
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "Romeo"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    notes.push(new NotePreview(
        '96fa3e23-643d-46ee-92b6-444bd30e30be',
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "Romeo"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    notes.push(new NotePreview(
        '57cc5e62-5d51-43f0-a827-f78037aa2596',
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "Romeo"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));

    NotesStore.set(notes);
    return { notes };
}