<script lang="ts">
    import CardContent from "@/components/ui/card/card-content.svelte";
	import Card from "@/components/ui/card/card.svelte";
	import NotePreviewAgent from "@/components/app/note-preview/NotePreviewAgent.svelte";
	import CardHeader from "@/components/ui/card/card-header.svelte";
	import NotePreviewColorIdBar from "@/components/app/note-preview/NotePreviewColorIdBar.svelte";
	import NotePreviewTitleMenu from "./NotePreviewTitleMenu.svelte";
	import { onMount } from "svelte";
	import { MenuLayers, registerMenu, unregisterMenu } from "@/shared/menu_manager.svelte";

    const props = $props();

    let titleMenu: HTMLElement;
    let typeAgent: HTMLElement;
    onMount(() => {
        titleMenu = document.getElementById(`${props.id}-title-menu`)!;
        typeAgent = document.getElementById(`${props.id}-agent-type`)!;
    })

    function onClickType(e: Event) {
        e.stopPropagation();
        const typeAgentBounds = typeAgent.getBoundingClientRect();
        unregisterMenu(MenuLayers.NoteTitleMenu);
        titleMenu.style.left = `${typeAgentBounds.left + typeAgentBounds.width}px`;
        titleMenu.style.top = `${typeAgentBounds.top}px`;
        registerMenu(MenuLayers.NoteTitleMenu, titleMenu.id);
    }
</script>


<div class="flex">
    <aside class="mr-1.5 w-max flex flex-col gap-y-2">
        <NotePreviewAgent type="copy" />
        <NotePreviewAgent type="trash" />
    </aside>
    <Card class="note-preview w-[400px]">
        <CardHeader>
            <NotePreviewColorIdBar colors={props.colors} style={props.style} />
        </CardHeader>
        <CardContent>
            <p class="text-2xl line-clamp-3 text-ellipsis">{props.content}</p>
        </CardContent>
    </Card>
    <aside class="ml-1.5 w-max flex flex-col gap-y-2">
        <NotePreviewAgent type="play" />
        <NotePreviewAgent id="{props.id}-agent-type" onclick={onClickType} type="type" />
        <NotePreviewAgent type="search" />
        <NotePreviewAgent type="network" />
    </aside>
    <NotePreviewTitleMenu id='{props.id}-title-menu' titles={props.titles}></NotePreviewTitleMenu>
</div>