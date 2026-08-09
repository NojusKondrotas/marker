<script lang="ts">
	import NotePreview from "@/components/app/note-preview/NotePreview.svelte";
	import ColorHex from "@/models/ColorHex";
	import Note from "@/models/Note";
	import NoteTitle from "@/models/NoteTitle";
	import NotesStore from "@/stores/NotesStore";

    $NotesStore = [];
    $NotesStore.push(new Note(1, [new ColorHex("403D88"), new ColorHex("ff00ff")], [new NoteTitle(1, "Oscar"), new NoteTitle(2, "Romeo"), new NoteTitle(3, "Mike")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(2, [new ColorHex("403D88"), new ColorHex("ff00ff")], [new NoteTitle(1, "Oscar"), new NoteTitle(2, "Romeo"), new NoteTitle(3, "Mike")],
        "India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(3, [], [new NoteTitle(1, "Oscar"), new NoteTitle(2, "Romeo"), new NoteTitle(3, "Mike")],
        "India Lima Uniform Victor Yankee Oscar Uniform India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(4, [], [new NoteTitle(1, "Oscar"), new NoteTitle(2, "Romeo"), new NoteTitle(3, "Mike")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(5, [], [new NoteTitle(1, "Oscar"), new NoteTitle(2, "Romeo"), new NoteTitle(3, "Mike")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
    $NotesStore.push(new Note(6, [], [new NoteTitle(1, "Oscar"), new NoteTitle(2, "Romeo"), new NoteTitle(3, "Mike")],
        "India Lima Uniform Victor Yankee Oscar Uniform"));
</script>

<main class="h-screen pl-[10vw] py-[10vh] overflow-hidden gap-x-40 gap-y-20 flex flex-col flex-wrap content-start">
    {#each $NotesStore as note (note.id)}
        <NotePreview {...note} style=4 />
    {/each}
</main>