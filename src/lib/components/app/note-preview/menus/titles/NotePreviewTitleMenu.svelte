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


<menu id={props.id} bind:this={titleMenu} class:invisible={!isMenuRegistered(MenuLayers.NoteMenu, props.id)} class="absolute invisible h-fit flex flex-row ms-1.5 gap-x-3.5 w-50 bg-white overflow-x-hidden border shadow-sm">
    {#each props.titles as title (title.offset)}
        <li class="p-1.5">
            <NotePreviewTitleAgent {...title}></NotePreviewTitleAgent>
        </li>
    {/each}
</menu>