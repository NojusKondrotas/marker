<script lang="ts">
    import CardContent from "@/components/ui/card/card-content.svelte";
	import Card from "@/components/ui/card/card.svelte";
	import NotePreviewAgent from "@/components/app/note-preview/NotePreviewAgent.svelte";
	import CardHeader from "@/components/ui/card/card-header.svelte";
	import NotePreviewColorIdBar from "@/components/app/note-preview/NotePreviewColorIdBar.svelte";
	import NotePreviewTitleMenu from "./NotePreviewTitleMenu.svelte";
	import { onMount } from "svelte";
	import { MenuLayers, registerMenu, unregisterMenu } from "@/shared/menu_manager.svelte";
	import NotePreviewHighlightMenu from "./NotePreviewHighlightMenu.svelte";

    const props = $props();

    let titleMenu: HTMLElement, titleMenuAgent: HTMLElement;
    let highlightMenu: HTMLElement, highlightMenuAgent: HTMLElement;
    onMount(() => {
        titleMenu = document.getElementById(`${props.id}-title-menu`)!;
        titleMenuAgent = document.getElementById(`${props.id}-agent-title`)!;

        highlightMenu = document.getElementById(`${props.id}-highlight-menu`)!;
        highlightMenuAgent = document.getElementById(`${props.id}-agent-highlight`)!;
    })

    function onClickTitleMenu(e: Event) {
        e.stopPropagation();

        const titleMenuAgentBounds = titleMenuAgent.getBoundingClientRect();
        unregisterMenu(MenuLayers.NoteMenu);
        titleMenu.style.left = `${titleMenuAgentBounds.left + titleMenuAgentBounds.width}px`;
        titleMenu.style.top = `${titleMenuAgentBounds.top}px`;
        registerMenu(MenuLayers.NoteMenu, titleMenu.id);
    }

    function onClickHighlightMenu(e: Event) {
        e.stopPropagation();

        const highlightMenuAgentBounds = highlightMenuAgent.getBoundingClientRect();
        unregisterMenu(MenuLayers.NoteMenu);
        highlightMenu.style.left = `${highlightMenuAgentBounds.left + highlightMenuAgentBounds.width}px`;
        highlightMenu.style.top = `${highlightMenuAgentBounds.top}px`;
        registerMenu(MenuLayers.NoteMenu, highlightMenu.id);
    }
</script>


<div class="flex">
    <aside class="mr-1.5 w-max flex flex-col gap-y-2">
        <NotePreviewAgent type="squareOff" />
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
        <a href="/note/{props.id}/0" class="contents"><NotePreviewAgent type="play" /></a>
        <NotePreviewAgent id="{props.id}-agent-title" onclick={onClickTitleMenu} type="type" />
        <NotePreviewAgent id="{props.id}-agent-highlight" onclick={onClickHighlightMenu} type="textCursor" />
        <NotePreviewAgent type="search" />
        <NotePreviewAgent type="network" />
    </aside>
    <NotePreviewTitleMenu id='{props.id}-title-menu' titles={props.titles}></NotePreviewTitleMenu>
    <NotePreviewHighlightMenu id='{props.id}-highlight-menu' highlights={props.highlights}></NotePreviewHighlightMenu>
</div>