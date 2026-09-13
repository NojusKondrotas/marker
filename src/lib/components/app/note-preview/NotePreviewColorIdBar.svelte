<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";
	import Input from "@/components/ui/input/input.svelte";
	import ItemContent from "@/components/ui/item/item-content.svelte";
	import ItemDescription from "@/components/ui/item/item-description.svelte";
	import Item from "@/components/ui/item/item.svelte";
	import type NotePreview from "@/models/NotePreview";
    import Plus from '@lucide/svelte/icons/plus';

    interface Props {
        style: number;
        colors: InstanceType<typeof NotePreview>['colors'];
    }
    const props: Props = $props();
</script>

<section class="flex flex-wrap gap-y-2 gap-x-3 min-h-[36px] h-fit items-center">
    {#if props.style == 1}
        {#each props.colors as color (color.id)}
            <div class="flex flex-col justify-between h-full">
                <Button style="background-color: {color.hex.toString()};" class="w-full h-4 rounded-lg cursor-pointer" variant="outline"></Button>
                <Item class="p-0">
                    <ItemContent>
                        <ItemDescription class="text-[0.65rem]">
                            {color.hex.toString()}
                        </ItemDescription>
                    </ItemContent>
                </Item>
            </div>
        {/each}
        <Button class="w-fit h-4 rounded-lg p-1.5 cursor-pointer" variant="outline" size="icon" ><Plus strokeWidth={1.5}/></Button>
    {:else if props.style == 2}
        {#each props.colors as color (color.id)}
        <div class="flex justify-between h-full gap-x-0.5" >
            <div style="background-color: {color.hex.toString()};" class="w-4 h-4 border-2 grow-0 shrink-0"></div>
            <Item class="p-0 hover:border-b hover:border-b-border">
                <ItemContent class="flex flex-row items-center gap-x-0">
                    <ItemDescription class="text-[0.65rem] w-fit">
                        #
                    </ItemDescription>
                    <Input style="font-size: 0.65rem; color: oklch(0.556 0 0)" class="relative p-0 h-fit w-[7ch] border-0" value={color.hex.hex} />
                </ItemContent>
            </Item>
        </div>
        {/each}
        <Button class="w-4 h-4 p-1.5 cursor-pointer" variant="outline" size="icon" ><Plus strokeWidth={1.5}/></Button>
    {:else if props.style == 3}
        {#each props.colors as color (color.id)}
        <div class="flex flex-col justify-between h-full">
            <Button style="background-color: {color.hex.toString()};" class="w-full h-4 cursor-pointer border-2" variant="outline"></Button>
            <Item class="p-0">
                <ItemContent>
                    <ItemDescription class="text-[0.65rem]">
                        {color.hex.toString()}
                    </ItemDescription>
                </ItemContent>
            </Item>
        </div>
        {/each}
        <Button class="w-fit h-4 p-1.5 cursor-pointer" variant="outline" size="icon" ><Plus strokeWidth={1.5}/></Button>
    {:else if props.style == 4}
        {#each props.colors as color (color.id)}
        <div class="flex flex-col justify-between h-full">
            <Button style="background-color: {color.hex.toString()};" class="w-4 h-4 active:not-aria-[haspopup]:translate-y-0" size="icon" variant="outline"></Button>
            <Item class="p-0">
                <ItemContent>
                    <ItemDescription class="text-[0.65rem] cursor-default">
                        {color.hex.toString()}
                    </ItemDescription>
                </ItemContent>
            </Item>
        </div>
        {/each}
    {/if}
</section>