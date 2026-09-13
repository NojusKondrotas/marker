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
</script>

<svelte:window onclick={handleStrayClick}/>

<div class="p-0 m-0 w-screen h-screen">
    <main
        class="py-[20%] h-full overflow-y-auto scrollbar-hide gap-y-60 flex flex-col items-center"
    >
        {#each $NotesStore as note (note.id)}
            <NotePreview {...note} style={4} />
        {/each}
    </main>
</div>