<script lang="ts">
	import NotePreview from "@/components/app/note-preview/NotePreview.svelte";
	import { unregisterAllMenus } from "@/shared/menu_manager.svelte";
	import NotesStore from "@/stores/NotesStore";

</script>

<div onclick={unregisterAllMenus} class="p-0 m-0 w-screen h-screen">
    <main class="h-screen pl-[10vw] py-[10vh] overflow-hidden gap-x-40 gap-y-20 flex flex-col flex-wrap content-start">
        {#each $NotesStore as note (note.id)}
            <NotePreview {...note} style=4 />
        {/each}
    </main>
</div>