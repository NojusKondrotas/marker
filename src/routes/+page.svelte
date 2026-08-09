<script>
	import NotePreview from "@/components/app/note-preview/NotePreview.svelte";

    const notes = [];
    for (let i = 1; i <= 6; ++i) {
        notes.push({id: i, content: "India Lima Uniform Victor Yankee Oscar Uniform", titles: [{title: "Mike", id: 1}, {title: "November", id: 2}, {title: "Oscar", id: 3}]});
    }
</script>

<main class="h-screen pl-[10vw] py-[10vh] overflow-hidden gap-x-40 gap-y-20 flex flex-col flex-wrap content-start">
    {#each notes as note (note.id)}
        <NotePreview {...note} style=4 />
    {/each}
</main>