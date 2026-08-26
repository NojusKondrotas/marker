<script lang="ts">
	import { onMount, tick } from "svelte";
	import NotePreviewColorIdAgent from "./NotePreviewColorIdAgent.svelte";
	import { getMenu, MenuLayers } from "@/shared/menu_manager.svelte";
	import Button from "@/components/ui/button/button.svelte";
    import Plus from '@lucide/svelte/icons/plus';
	import Item from "@/components/ui/item/item.svelte";
	import ItemContent from "@/components/ui/item/item-content.svelte";
	import { ItemDescription } from "@/components/ui/item";
	import { addColor } from "@/shared/note_preview_updater.svelte";

    const props = $props();

    let currentColorIdAgent = 0;

    let colorIdMenu: HTMLElement;
    let addButton: HTMLElement;

    onMount(() => {
        const wheelHandler = (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const colorIdAgents = Array.from(colorIdMenu.querySelectorAll(':scope > *')) as HTMLElement[];

            if (e.deltaY < 0)
                currentColorIdAgent = Math.max(0, currentColorIdAgent - 1);
            else if (e.deltaY > 0)
                currentColorIdAgent = Math.min(colorIdAgents.length - 1, currentColorIdAgent + 1);

            colorIdMenu.scrollTo({ left: colorIdAgents[currentColorIdAgent].offsetLeft, behavior: 'smooth' });
        };

        colorIdMenu.addEventListener('wheel', wheelHandler);
        return () => colorIdMenu.removeEventListener('wheel', wheelHandler);
    });

    async function handleColorAdd(e: MouseEvent) {
        addColor(e, props.noteId);
        await tick();
        colorIdMenu.scrollTo({ left: addButton.offsetLeft, behavior: 'smooth' });
    }

    function onMove(idx: number) {
        currentColorIdAgent = idx;
        const colorIdAgents = Array.from(colorIdMenu.querySelectorAll(':scope > *')) as HTMLElement[];
        colorIdMenu.scrollTo({ left: colorIdAgents[idx].offsetLeft, behavior: 'smooth' });
    }

    async function onRemove(idx: number) {
        await tick();
        if (currentColorIdAgent === idx) {
            if (idx > 0 && idx < colorIdMenu.childElementCount - 1) {
                --currentColorIdAgent;
            }
        }
        const colorIdAgents = Array.from(colorIdMenu.querySelectorAll(':scope > *')) as HTMLElement[];
        colorIdMenu.scrollTo({ left: colorIdAgents[idx].offsetLeft, behavior: 'smooth' });
    }
</script>


<menu id={props.id} bind:this={colorIdMenu} class:invisible={getMenu(MenuLayers.NoteMenu) !== props.id} class="absolute invisible h-fit flex flex-row ms-1.5 p-1.5 gap-x-5 w-50 bg-white overflow-x-hidden border shadow-sm">
    {#each props.colors as color, idx (color.id)}
        <li>
            <NotePreviewColorIdAgent {...color} {idx} noteId={props.noteId} {onMove} {onRemove}></NotePreviewColorIdAgent>
        </li>
    {/each}
    <li bind:this={addButton}>
        <div class="flex flex-col justify-between h-full">
            <div class="flex flex-col gap-y-1">
                <span class="flex h-4 gap-x-1">
                    <Button onclick={(e) => handleColorAdd(e)} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><Plus strokeWidth={1.5}/></Button>
                </span>
                <span class="flex h-4 gap-x-1">
                </span>
            </div>
            <Item class="p-0">
                <ItemContent>
                    <ItemDescription class="text-[0.65rem] invisible">
                        stretch
                    </ItemDescription>
                </ItemContent>
            </Item>
        </div>
    </li>
</menu>