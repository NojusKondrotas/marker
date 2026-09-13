<script lang="ts">
	import type NoteTitle from "@/models/NoteTitle";
	import NotePreviewTitleAgentOffset from "./NotePreviewTitleAgentOffset.svelte";

    type Props = InstanceType<typeof NoteTitle> & { class: string, contentElement?: HTMLElement };
    let { contentElement = $bindable(), ...props }: Props = $props();
</script>

<div class="flex flex-col {props.class}">
    <NotePreviewTitleAgentOffset offset={props.offset}></NotePreviewTitleAgentOffset>
    <p bind:this={contentElement} class="text-lg cursor-default overflow-x-hidden text-nowrap w-full min-w-0">{props.contents}</p>
</div>