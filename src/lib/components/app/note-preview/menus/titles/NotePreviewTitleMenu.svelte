<script lang="ts">
	import { onMount } from "svelte";
	import NotePreviewTitleAgent from "./NotePreviewTitleAgent.svelte";
	import { getMenu, MenuLayers } from "@/shared/menu_manager.svelte";

    const props = $props();

    let currentTitleAgent = 0;

    let titleMenu: HTMLElement;

    onMount(() => {
        const titleAgents: HTMLElement[] = Array.from(titleMenu.querySelectorAll(':scope > *'));

        titleMenu.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY < 0) {
                --currentTitleAgent;
                if (currentTitleAgent < 0) {
                    currentTitleAgent = 0;
                }
            } else if (e.deltaY > 0) {
                ++currentTitleAgent;
                if (currentTitleAgent >= titleAgents.length) {
                    currentTitleAgent = titleAgents.length - 1;
                }
            }

            titleMenu.scrollTo({ left: titleAgents[currentTitleAgent].offsetLeft, behavior: 'smooth' });
        });
    });
</script>


<menu id={props.id} bind:this={titleMenu} class:invisible={getMenu(MenuLayers.NoteMenu) !== props.id} class="absolute invisible h-fit flex flex-row ms-1.5 p-1.5 gap-x-5 w-50 backdrop-filter-[blur(2px)] overflow-x-hidden border shadow-sm">
    {#each props.titles as title (title.offset)}
        <li>
            <NotePreviewTitleAgent {...title}></NotePreviewTitleAgent>
        </li>
    {/each}
</menu>