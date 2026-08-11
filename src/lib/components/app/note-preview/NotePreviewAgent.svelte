<script>
	import Button from "@/components/ui/button/button.svelte";
    import Copy from '@lucide/svelte/icons/copy';
    import Network from '@lucide/svelte/icons/network';
    import Play from '@lucide/svelte/icons/play';
    import Search from '@lucide/svelte/icons/search';
    import TextCursor from '@lucide/svelte/icons/text-cursor';
    import Trash2 from '@lucide/svelte/icons/trash-2';
    import Type from '@lucide/svelte/icons/type';

    const props = $props();

    const icons = {
        play: Play,
        type: Type,
        textCursor: TextCursor,
        search: Search,
        network: Network,
        copy: Copy,
        trash: Trash2,
    };
    
    const Icon = icons[props.type];
</script>

<Button id={props.id ?? undefined} onclick={props.onclick ?? undefined} class="shadow-sm w-2 h-2 box-content p-1.5 cursor-pointer" variant="outline" size="icon-xs" >
    {#if Icon}
        <Icon strokeWidth={1.5} />
    {/if}
</Button>