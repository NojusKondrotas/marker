<script lang="ts">
	import NotePreview from "@/components/app/note-preview/NotePreview.svelte";
	import { isMenuLayerActive, MenuLayers, unregisterAllMenus, unregisterMenu } from "@/shared/menu_manager.svelte";
	import NotesStore from "@/stores/NotesStore";

    function handleStrayClick(e: MouseEvent) {
        e.stopPropagation();

        if (isMenuLayerActive(MenuLayers.NoteColorIdMenu))
            unregisterMenu(MenuLayers.NoteColorIdMenu);
        else
            unregisterAllMenus();
    }

    function handleNotesScroll(e: WheelEvent) {
        const container = e.currentTarget as HTMLElement;

        container.scrollBy({ left: e.deltaY, behavior: 'auto' });
    }
</script>

<svelte:window onclick={handleStrayClick}/>

<div class="flex flex-col p-0 m-0 w-screen h-screen">
    <main
        onwheel={handleNotesScroll}
        class="px-[10vw] py-[10vh] overflow-hidden gap-x-40 gap-y-20 flex flex-row items-center grow"
    >
        {#each $NotesStore as note (note.id)}
            <NotePreview {...note} style={4} />
        {/each}
    </main>
    <div class="h-2/10"></div>
</div>