<script>
	import Button from "@/components/ui/button/button.svelte";
	import ItemContent from "@/components/ui/item/item-content.svelte";
	import ItemDescription from "@/components/ui/item/item-description.svelte";
	import Item from "@/components/ui/item/item.svelte";
    import Minus from '@lucide/svelte/icons/minus';

    const props = $props();
</script>
<div class="flex flex-col justify-between h-full">
    <span>
        <Button style="background-color: {props.hex.toString()};" class="w-4 h-4 cursor-pointer transition-none" size="icon" variant="outline"></Button>
        <Button class="w-4 h-4 p-1.5 cursor-pointer transition-none" variant="outline" size="icon" ><Minus strokeWidth={1.5}/></Button>
    </span>
    <Item class="p-0">
        <ItemContent>
            <ItemDescription class="text-[0.65rem]">
                {props.hex.toString()}
            </ItemDescription>
        </ItemContent>
    </Item>
</div>