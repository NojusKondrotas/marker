<script lang="ts">
	import { onMount } from "svelte";
	import { isMenuRegistered, MenuLayers } from "@/shared/menu_manager.svelte";
	import NotePreviewHighlightAgent from "./NotePreviewHighlightAgent.svelte";
	import type NotePreview from "@/models/NotePreview";
	import NotePreviewHighlightAgentOffset from "./NotePreviewHighlightAgentOffset.svelte";

    interface Props {
        id: string;
        highlights: InstanceType<typeof NotePreview>['highlights'];
    }
    const props: Props = $props();

    let currentExtendedHighlightAgent = 0, currentMinifiedHighlightAgent = 0;

    let extendedMenu: HTMLElement, minifiedMenu: HTMLElement;

    onMount(() => {
        const extendedAgents: HTMLElement[] = Array.from(extendedMenu.querySelectorAll(':scope > *'));
        const minifiedAgents: HTMLElement[] = Array.from(minifiedMenu.querySelectorAll(':scope > *'));

        extendedMenu.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY < 0) {
                --currentExtendedHighlightAgent;
                if (currentExtendedHighlightAgent < 0) {
                    currentExtendedHighlightAgent = 0;
                }
            } else if (e.deltaY > 0) {
                ++currentExtendedHighlightAgent;
                if (currentExtendedHighlightAgent >= extendedAgents.length) {
                    currentExtendedHighlightAgent = extendedAgents.length - 1;
                }
            }

            extendedMenu.scrollTo({ left: extendedAgents[currentExtendedHighlightAgent].offsetLeft, behavior: 'smooth' });
        });
        minifiedMenu.addEventListener('wheel', (e: WheelEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.deltaY < 0) {
                --currentMinifiedHighlightAgent;
                if (currentMinifiedHighlightAgent < 0) {
                    currentMinifiedHighlightAgent = 0;
                }
            } else if (e.deltaY > 0) {
                ++currentMinifiedHighlightAgent;
                if (currentMinifiedHighlightAgent >= minifiedAgents.length) {
                    currentMinifiedHighlightAgent = minifiedAgents.length - 1;
                }
            }

            minifiedMenu.scrollTo({ top: minifiedAgents[currentMinifiedHighlightAgent].offsetTop, behavior: 'smooth' });
        });
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events,a11y_no_static_element_interactions -->
<menu
    id={props.id}
    class="absolute invisible flex flex-col w-auto gap-y-2 ms-1.5"
    class:invisible={!isMenuRegistered(MenuLayers.NoteMenu, props.id)}
>
    <div
        id="{props.id}-extended"
        bind:this={extendedMenu}
        class="relative w-fit max-w-50 h-fit flex flex-row gap-x-3.5 bg-white overflow-x-hidden border shadow-sm"
        onclick={(e) => e.stopPropagation()}
    >
        {#each props.highlights as highlight (highlight.offset)}
            <li class="p-1.5">
                <NotePreviewHighlightAgent {...highlight}></NotePreviewHighlightAgent>
            </li>
        {/each}
    </div>
    <div
        id="{props.id}-minified"
        bind:this={minifiedMenu}
        class="relative w-fit h-fit max-h-50 flex flex-col bg-white overflow-y-hidden border shadow-sm"
        onclick={(e) => e.stopPropagation()}
    >
        {#each props.highlights as highlight (highlight.offset)}
            <li class="p-1.5">
                <NotePreviewHighlightAgentOffset offset={highlight.offset}></NotePreviewHighlightAgentOffset>
            </li>
        {/each}
    </div>
</menu>