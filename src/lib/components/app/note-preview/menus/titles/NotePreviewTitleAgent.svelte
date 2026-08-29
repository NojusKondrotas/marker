<script lang="ts">
	import Badge from "@/components/ui/badge/badge.svelte";
    import Button from "@/components/ui/button/button.svelte";
	import type NoteTitle from "@/models/NoteTitle";
    import CornerRightUp from '@lucide/svelte/icons/corner-right-up';

    type Props = InstanceType<typeof NoteTitle>;
    const props: Props = $props();
</script>

<div class="flex flex-col pl-1">
    <span class="flex items-center gap-x-0.5">
        <Badge class="min-w-[5ch] h-fit text-[0.6rem] justify-start px-1 bg-gray-100" variant="outline">{props.offset}</Badge>
        <Button class="w-2 h-0.5 box-content p-1.5 cursor-pointer transition-none" variant="link" size="icon-xs"><CornerRightUp strokeWidth={1.5} /></Button>
    </span>
    <p class="text-lg max-w-[16ch] text-ellipsis overflow-hidden whitespace-nowrap">{props.contents}</p>
</div>