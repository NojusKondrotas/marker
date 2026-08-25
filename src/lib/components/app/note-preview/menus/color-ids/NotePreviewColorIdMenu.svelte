<script lang="ts">
	import { onMount } from "svelte";
	import NotePreviewColorIdAgent from "./NotePreviewColorIdAgent.svelte";
	import { getMenu, MenuLayers } from "@/shared/menu_manager.svelte";
	import Button from "@/components/ui/button/button.svelte";
    import Plus from '@lucide/svelte/icons/plus';
	import Item from "@/components/ui/item/item.svelte";
	import ItemContent from "@/components/ui/item/item-content.svelte";
	import { ItemDescription } from "@/components/ui/item";

    const props = $props();

    let currentColorIdAgent = 0;

    let colorIdMenu: HTMLElement;

    onMount(() => {
        const colorIdAgents: HTMLElement[] = Array.from(colorIdMenu.querySelectorAll(':scope > *'));

        colorIdMenu.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY < 0) {
                --currentColorIdAgent;
                if (currentColorIdAgent < 0) {
                    currentColorIdAgent = 0;
                }
            } else if (e.deltaY > 0) {
                ++currentColorIdAgent;
                if (currentColorIdAgent >= colorIdAgents.length) {
                    currentColorIdAgent = colorIdAgents.length - 1;
                }
            }

            colorIdMenu.scrollTo({ left: colorIdAgents[currentColorIdAgent].offsetLeft, behavior: 'smooth' });
        });
    });
</script>


<menu id={props.id} bind:this={colorIdMenu} class:invisible={getMenu(MenuLayers.NoteMenu) !== props.id} class="absolute invisible h-fit flex flex-row ms-1.5 p-1.5 gap-x-5 w-50 bg-white overflow-x-hidden border shadow-sm">
    {#each props.colors as color, idx (idx)}
        <li>
            <NotePreviewColorIdAgent {...color} idx={idx} noteId={props.noteId}></NotePreviewColorIdAgent>
        </li>
    {/each}
    <li>
        <div class="flex flex-col justify-between h-full">
            <div class="flex flex-col gap-y-1">
                <span class="flex h-4 gap-x-1">
                    <Button class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><Plus strokeWidth={1.5}/></Button>
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