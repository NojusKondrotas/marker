<script lang="ts">
	import type NoteHighlight from "@/models/NoteHighlight";
	import NotePreviewHighlightAgentOffset from "./NotePreviewHighlightAgentOffset.svelte";

    type Props = InstanceType<typeof NoteHighlight>;
    const props: Props = $props();
</script>

<div class="flex flex-col">
    <NotePreviewHighlightAgentOffset offset={props.offset}></NotePreviewHighlightAgentOffset>
    <p class="text-lg max-w-[16ch] cursor-default text-ellipsis overflow-hidden whitespace-nowrap">{props.contents}</p>
</div>