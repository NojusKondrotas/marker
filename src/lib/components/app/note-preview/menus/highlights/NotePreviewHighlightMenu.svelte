<script lang="ts">
	import { onMount } from "svelte";
	import { isMenuRegistered, MenuLayers } from "@/shared/menu_manager.svelte";
	import NotePreviewHighlightAgent from "./NotePreviewHighlightAgent.svelte";
	import type NotePreview from "@/models/NotePreview";

    interface Props {
        id: string;
        highlights: InstanceType<typeof NotePreview>['highlights'];
    }
    const props: Props = $props();

    let currentHighlightAgent = 0;

    let highlightMenu: HTMLElement;

    onMount(() => {
        const highlightAgents: HTMLElement[] = Array.from(highlightMenu.querySelectorAll(':scope > *'));

        highlightMenu.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY < 0) {
                --currentHighlightAgent;
                if (currentHighlightAgent < 0) {
                    currentHighlightAgent = 0;
                }
            } else if (e.deltaY > 0) {
                ++currentHighlightAgent;
                if (currentHighlightAgent >= highlightAgents.length) {
                    currentHighlightAgent = highlightAgents.length - 1;
                }
            }

            highlightMenu.scrollTo({ left: highlightAgents[currentHighlightAgent].offsetLeft, behavior: 'smooth' });
        });
    });
</script>


<menu id={props.id} bind:this={highlightMenu} class:invisible={!isMenuRegistered(MenuLayers.NoteMenu, props.id)} class="absolute invisible h-fit flex flex-row ms-1.5 gap-x-3.5 w-50 bg-white overflow-x-hidden border shadow-sm">
    {#each props.highlights as highlights (highlights.offset)}
        <li class="p-1.5">
            <NotePreviewHighlightAgent {...highlights}></NotePreviewHighlightAgent>
        </li>
    {/each}
</menu>