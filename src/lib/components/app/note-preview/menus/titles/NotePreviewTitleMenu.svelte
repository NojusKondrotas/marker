<script lang="ts">
	import { onMount } from "svelte";
	import NotePreviewTitleAgent from "./NotePreviewTitleAgent.svelte";
	import { isMenuRegistered, MenuLayers } from "@/shared/menu_manager.svelte";
	import type NotePreview from "@/models/NotePreview";

    interface Props {
        id: string;
        titles: InstanceType<typeof NotePreview>['titles'];
    }
    const props: Props = $props();

    let currentTitleAgent = 0;

    let titleMenu: HTMLElement, verticalScrollZone: HTMLElement;
    let itemEls: HTMLElement[] = [];

    onMount(() => {
        const titleAgents: HTMLElement[] = Array.from(titleMenu.querySelectorAll(':scope > *'));

        verticalScrollZone.addEventListener('wheel', (e: WheelEvent) => {
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

            titleMenu.scrollTo({ top: titleAgents[currentTitleAgent].offsetTop, behavior: 'smooth' });
        });

        itemEls.forEach((el) => {
            el.addEventListener('wheel', (e: WheelEvent) => {
                e.preventDefault();
                e.stopPropagation();

                el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
            });
        });
    });
</script>


<menu id={props.id} class:invisible={!isMenuRegistered(MenuLayers.NoteMenu, props.id)} class="absolute invisible w-fit max-w-50 h-fit max-h-50 flex flex-row ms-1.5 bg-white overflow-hidden border shadow-sm">
    <div class="w-5 shrink-0 border-r" bind:this={verticalScrollZone}>
    </div>
    <div class="relative flex flex-col gap-x-3.5 overflow-hidden" bind:this={titleMenu}>
        {#each props.titles as title, i (title.offset)}
            <li class="overflow-x-hidden shrink-0 text-nowrap" bind:this={itemEls[i]}>
                <NotePreviewTitleAgent {...title} class="p-1.5 w-fit"></NotePreviewTitleAgent>
            </li>
        {/each}
    </div>
</menu>