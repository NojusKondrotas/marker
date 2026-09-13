<script lang="ts">
	import type NoteHighlight from "@/models/NoteHighlight";
	import NotePreviewHighlightAgentOffset from "./NotePreviewHighlightAgentOffset.svelte";

    type Props = InstanceType<typeof NoteHighlight>;
    const props: Props = $props();
</script>

<div class="flex flex-col">
    <NotePreviewHighlightAgentOffset offset={props.offset}></NotePreviewHighlightAgentOffset>
    <p class="text-lg cursor-default overflow-x-hidden text-nowrap w-full min-w-0">{props.contents}</p>
</div>