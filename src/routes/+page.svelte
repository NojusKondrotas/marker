<script lang="ts">
	import NotePreview from "@/components/app/note-preview/NotePreview.svelte";
	import ColorHex from "@/models/ColorHex";
	import Note from "@/models/Note";
	import NoteHighlight from "@/models/NoteHighlight";
	import NoteTitle from "@/models/NoteTitle";
	import { unregisterAllMenus } from "@/shared/menu_manager.svelte";
	import NotesStore from "@/stores/NotesStore";

    $NotesStore = [];
    $NotesStore.push(new Note(1,
        [new ColorHex("403D88"), new ColorHex("ff00ff")],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "RomeoSierra TangoUniformVictor"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(2,
        [new ColorHex("403D88"), new ColorHex("ff00ff")],
        [new NoteTitle(0, "Oscar"), new NoteTitle(1024, "Romeo"), new NoteTitle(2048, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(3,
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(384, "Romeo"), new NoteTitle(2565458, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(4,
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "Romeo"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(5,
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "Romeo"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(6,
        [],
        [new NoteTitle(0, "Oscar"), new NoteTitle(256, "Romeo"), new NoteTitle(512, "Mike")],
        [new NoteHighlight(9, "PapaSierraYankee"), new NoteHighlight(18, "CharlieHotelOscar"), new NoteHighlight(630, "LimaOscar"), new NoteHighlight(752, "GolfIndia"), new NoteHighlight(800, "CharlieAlphaLima"), new NoteHighlight(1145, "DeltaIndia"), new NoteHighlight(1307, "SierraOscarRomeo"), new NoteHighlight(2041, "DeltaEchoRomeo")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
</script>

<div onclick={unregisterAllMenus} class="p-0 m-0 w-screen h-screen">
    <main class="h-screen pl-[10vw] py-[10vh] overflow-hidden gap-x-40 gap-y-20 flex flex-col flex-wrap content-start">
        {#each $NotesStore as note (note.id)}
            <NotePreview {...note} style=4 />
        {/each}
    </main>
</div>