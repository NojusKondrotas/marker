<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";
    import ChevronLeft from '@lucide/svelte/icons/chevron-left';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ItemContent from "@/components/ui/item/item-content.svelte";
	import ItemDescription from "@/components/ui/item/item-description.svelte";
	import Item from "@/components/ui/item/item.svelte";
    import Minus from '@lucide/svelte/icons/minus';
	import { moveColorLeft, moveColorRight, removeColor, updateColor } from "@/shared/note_preview_updater.svelte";
	import { tick } from "svelte";
	import { MenuLayers, registerMenu } from "@/shared/menu_manager.svelte";
	import type NoteColorId from "@/models/NoteColorId";

    type Props = InstanceType<typeof NoteColorId> & {
        idx: number,
        noteId: number,
        onMove: (idx: number) => void,
        onRemove: (idx: number) => void
    };
    const props: Props = $props();

    let colorHex = $derived(props.hex.toString());

    async function handleColorLeft(e: MouseEvent) {
        moveColorLeft(e, props.noteId, props.idx);
        await tick();
        props.onMove(props.idx);
    }

    async function handleColorRight(e: MouseEvent) {
        moveColorRight(e, props.noteId, props.idx);
        await tick();
        props.onMove(props.idx);
    }

    async function handleColorRemove(e: MouseEvent) {
        removeColor(e, props.noteId, props.idx);
        props.onRemove(props.idx);
    }

    function handleColorUpdate(e: Event & { currentTarget: HTMLInputElement }) {
        const newHex = e.currentTarget.value;
        updateColor(e, props.noteId, props.idx, newHex);
    }

    function handleColorUpdaterClick(e: MouseEvent) {
        e.stopPropagation();

        registerMenu(MenuLayers.NoteColorIdMenu, props.id);
    }
</script>

<div id={props.id} class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-y-1">
        <span class="flex h-4 gap-x-1">
            <Button onclick={handleColorLeft} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><ChevronLeft strokeWidth={1.5}/></Button>
            <Button onclick={handleColorRight} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><ChevronRight strokeWidth={1.5}/></Button>
        </span>
        <span class="flex h-4 gap-x-1">
            <input
                style="background-color: {props.hex.toString()};"
                class="w-4 h-4 cursor-pointer border transition-none p-0 appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none [&::-moz-color-swatch]:border-none"
                type="color"
                bind:value={colorHex}
                oninput={handleColorUpdate}
                onclick={handleColorUpdaterClick}
            />
            <Button onclick={handleColorRemove} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><Minus strokeWidth={1.5}/></Button>
        </span>
    </div>
    <Item class="p-0">
        <ItemContent>
            <ItemDescription class="text-[0.65rem]">
                {props.hex.toString()}
            </ItemDescription>
        </ItemContent>
    </Item>
</div>