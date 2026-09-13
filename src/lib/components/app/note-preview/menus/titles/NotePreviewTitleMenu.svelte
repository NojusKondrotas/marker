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
    let titleZones: HTMLElement[] = [], titleContents: HTMLElement[] = [];

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

        titleZones.forEach((el, i) => {
            el.addEventListener('wheel', (e: WheelEvent) => {
                e.preventDefault();
                e.stopPropagation();

                titleContents[i].scrollBy({ left: e.deltaY, behavior: 'smooth' });
            });
        });
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events,a11y_no_noninteractive_element_interactions -->
<menu
    id={props.id}
    class:invisible={!isMenuRegistered(MenuLayers.NoteMenu, props.id)}
    class="absolute invisible w-fit max-w-50 h-fit max-h-50 flex flex-row ms-1.5 bg-white overflow-hidden border shadow-sm"
    onclick={(e) => e.stopPropagation()}
>
    <div class="w-5 shrink-0 border-r" bind:this={verticalScrollZone}>
    </div>
    <div class="relative flex flex-col gap-x-3.5 overflow-hidden" bind:this={titleMenu}>
        {#each props.titles as title, i (title.offset)}
            <li class="overflow-x-hidden shrink-0 text-nowrap" bind:this={titleZones[i]}>
                <NotePreviewTitleAgent {...title} class="p-1.5" bind:contentElement={titleContents[i]}></NotePreviewTitleAgent>
            </li>
        {/each}
    </div>
</menu>