<script lang="ts">
    import CardContent from "@/components/ui/card/card-content.svelte";
	import Card from "@/components/ui/card/card.svelte";
	import NotePreviewAgent from "@/components/app/note-preview/NotePreviewAgent.svelte";
	import CardHeader from "@/components/ui/card/card-header.svelte";
	import NotePreviewColorIdBar from "@/components/app/note-preview/NotePreviewColorIdBar.svelte";
	import { onMount } from "svelte";
	import { MenuLayers, registerMenu, unregisterMenu } from "@/shared/menu_manager.svelte";
	import NotePreviewTitleMenu from "./menus/titles/NotePreviewTitleMenu.svelte";
	import NotePreviewHighlightMenu from "./menus/highlights/NotePreviewHighlightMenu.svelte";
	import NotePreviewColorIdMenu from "./menus/color-ids/NotePreviewColorIdMenu.svelte";

    const Menus = Object.freeze({
        ColorId: "ColorId",
        Highlight: "Highlight",
        Title: "Title",
    });
    type Menus = (typeof Menus)[keyof typeof Menus];

    const props = $props();

    let titleMenu: HTMLElement, titleMenuAgent: HTMLElement;
    let highlightMenu: HTMLElement, highlightMenuAgent: HTMLElement;
    let colorIdMenu: HTMLElement, colorIdMenuAgent: HTMLElement;
    onMount(() => {
        titleMenu = document.getElementById(`${props.id}-title-menu`)!;
        titleMenuAgent = document.getElementById(`${props.id}-title-menuagent`)!;

        highlightMenu = document.getElementById(`${props.id}-highlight-menu`)!;
        highlightMenuAgent = document.getElementById(`${props.id}-highlight-menuagent`)!;

        colorIdMenu = document.getElementById(`${props.id}-colorid-menu`)!;
        colorIdMenuAgent = document.getElementById(`${props.id}-colorid-menuagent`)!;
    })

    function onClickMenu(e: Event, type: Menus) {
        e.stopPropagation();

        let menu: HTMLElement, menuAgent: HTMLElement;
        switch (type) {
            case Menus.ColorId:
                menu = colorIdMenu;
                menuAgent = colorIdMenuAgent;
                break;
            case Menus.Highlight:
                menu = highlightMenu;
                menuAgent = highlightMenuAgent;
                break;
            case Menus.Title:
                menu = titleMenu;
                menuAgent = titleMenuAgent;
                break;
        }

        const menuAgentBounds = menuAgent.getBoundingClientRect();
        unregisterMenu(MenuLayers.NoteMenu);
        menu.style.left = `${menuAgentBounds.left + menuAgentBounds.width}px`;
        menu.style.top = `${menuAgentBounds.top}px`;
        registerMenu(MenuLayers.NoteMenu, menu.id);
    }
</script>


<div class="flex">
    <aside class="mr-1.5 w-max flex flex-col gap-y-2">
        <NotePreviewAgent id="{props.id}-colorid-menuagent" onclick={(e: Event) => onClickMenu(e, Menus.ColorId)} type="squareOff" />
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
        <NotePreviewAgent id="{props.id}-title-menuagent" onclick={(e: Event) => onClickMenu(e, Menus.Title)} type="type" />
        <NotePreviewAgent id="{props.id}-highlight-menuagent" onclick={(e: Event) => onClickMenu(e, Menus.Highlight)} type="textCursor" />
        <NotePreviewAgent type="search" />
        <NotePreviewAgent type="network" />
    </aside>
    <NotePreviewTitleMenu id='{props.id}-title-menu' titles={props.titles}></NotePreviewTitleMenu>
    <NotePreviewHighlightMenu id='{props.id}-highlight-menu' highlights={props.highlights}></NotePreviewHighlightMenu>
    <NotePreviewColorIdMenu id='{props.id}-colorid-menu' colors={props.colors}></NotePreviewColorIdMenu>
</div>