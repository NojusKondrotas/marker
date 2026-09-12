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
	import { isMenuRegistered, MenuLayers, registerMenu, unregisterMenu } from "@/shared/menu_manager.svelte";
	import type NoteColorId from "@/models/NoteColorId";
	import ColorPicker from "@/components/app/global/ColorPicker.svelte";
	import type { UUID } from "crypto";

    type Props = InstanceType<typeof NoteColorId> & {
        idx: number,
        noteId: UUID,
        onMove: (idx: number) => void,
        onRemove: (idx: number) => void
    };
    const props: Props = $props();

    let colorInput: HTMLElement;
    let colorPicker: HTMLElement;
    let isColorPickerVisible = $derived(isMenuRegistered(MenuLayers.NoteColorIdMenu, props.id));
    let colorPickerPos = $state({ top: 0, left: 0 });

    let rawHex = $state(props.hex.hex);
    let colorHex = $derived('#' + rawHex);

    function handleColorInput(newHex: string) {
        rawHex = newHex;
        updateColor(props.noteId, props.idx, newHex);
    }

    async function handleColorLeft(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        moveColorLeft(props.noteId, props.idx);
        await tick();
        props.onMove(props.idx);
    }

    async function handleColorRight(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        moveColorRight(props.noteId, props.idx);
        await tick();
        props.onMove(props.idx);
    }

    async function handleColorRemove(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        removeColor(props.noteId, props.idx);
        props.onRemove(props.idx);
    }

    function handleColorUpdaterClick(e: MouseEvent) {
        e.stopPropagation();
        const rect = colorInput.getBoundingClientRect();
        colorPickerPos = { top: rect.bottom, left: rect.left };

        if (isMenuRegistered(MenuLayers.NoteColorIdMenu, props.id)) {
            unregisterMenu(MenuLayers.NoteColorIdMenu);
        }
        registerMenu(MenuLayers.NoteColorIdMenu, props.id);
        isColorPickerVisible = true;
    }

    function handleOutsideClick(e: PointerEvent) {
        if (!isColorPickerVisible) return;
        const target = e.target as Node;
        if (colorPicker.contains(target) || colorInput.contains(target)) return;
        isColorPickerVisible = false;
    }
</script>

<svelte:window onpointerdown={handleOutsideClick} />

{#if isColorPickerVisible}
    <div bind:this={colorPicker} style="position: fixed; top: {colorPickerPos.top}px; left: {colorPickerPos.left}px; z-index: 50;">
        <ColorPicker bind:hex={rawHex} onInput={handleColorInput} />
    </div>
{/if}
<div id={props.id} class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-y-1">
        <span class="flex h-4 gap-x-1">
            <Button onclick={handleColorLeft} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><ChevronLeft strokeWidth={1.5}/></Button>
            <Button onclick={handleColorRight} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><ChevronRight strokeWidth={1.5}/></Button>
        </span>
        <span class="flex h-4 gap-x-1">
            <span bind:this={colorInput} class="inline-block">
                <Button
                    onclick={handleColorUpdaterClick}
                    style="background-color: {colorHex};"
                    class="w-4 h-4 cursor-pointer transition-none"
                    size="icon"
                    variant="outline"
                ></Button>
            </span>
            <Button onclick={handleColorRemove} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><Minus strokeWidth={1.5}/></Button>
        </span>
    </div>
    <Item class="p-0">
        <ItemContent>
            <ItemDescription class="text-[0.65rem] cursor-default">
                {colorHex}
            </ItemDescription>
        </ItemContent>
    </Item>
</div>