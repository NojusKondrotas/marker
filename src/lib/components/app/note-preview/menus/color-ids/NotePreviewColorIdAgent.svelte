<script>
	import Button from "@/components/ui/button/button.svelte";
    import ChevronLeft from '@lucide/svelte/icons/chevron-left';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ItemContent from "@/components/ui/item/item-content.svelte";
	import ItemDescription from "@/components/ui/item/item-description.svelte";
	import Item from "@/components/ui/item/item.svelte";
    import Minus from '@lucide/svelte/icons/minus';
	import { moveColorLeft, moveColorRight, removeColor } from "@/shared/note_preview_updater.svelte";

    const props = $props();
</script>

<div class="flex flex-col justify-between h-full">
    <div class="flex flex-col gap-y-1">
        <span class="flex h-4 gap-x-1">
            <Button onclick={(e) => moveColorLeft(e, props.noteId, props.idx)} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><ChevronLeft strokeWidth={1.5}/></Button>
            <Button onclick={(e) => moveColorRight(e, props.noteId, props.idx)} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><ChevronRight strokeWidth={1.5}/></Button>
        </span>
        <span class="flex h-4 gap-x-1">
            <Button style="background-color: {props.hex.toString()};" class="w-4 h-4 cursor-pointer transition-none" size="icon" variant="outline"></Button>
            <Button onclick={(e) => removeColor(e, props.noteId, props.idx)} class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><Minus strokeWidth={1.5}/></Button>
        </span>
    </div>
    <Item class="p-0">
        <ItemContent>
            <ItemDescription class="text-[0.65rem]">
                {props.hex.toString()}
            </ItemDescription>
        </ItemContent>
    </Item>
</div>