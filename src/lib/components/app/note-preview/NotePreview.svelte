<script>
    import CardContent from "@/components/ui/card/card-content.svelte";
	import Card from "@/components/ui/card/card.svelte";
	import NotePreviewAgent from "@/components/app/note-preview/NotePreviewAgent.svelte";
	import CardHeader from "@/components/ui/card/card-header.svelte";
	import NotePreviewColorIdBar from "@/components/app/note-preview/NotePreviewColorIdBar.svelte";

    const props = $props();
</script>


<div class="flex">
    <aside class="mr-1.5 w-max flex flex-col gap-y-2">
        <NotePreviewAgent type="copy" />
        <NotePreviewAgent type="trash" />
    </aside>
    <Card class="note-preview w-[400px]">
        <CardHeader>
            <NotePreviewColorIdBar colors={props.colors} style={props.style} />
        </CardHeader>
        <CardContent>
            <p class="text-2xl line-clamp-3 text-ellipsis">{props.content}</p>
        </CardContent>
    </Card>
    <aside class="ml-1.5 w-max flex flex-col gap-y-2">
        <NotePreviewAgent type="play" />
        <NotePreviewAgent type="type" />
        <NotePreviewAgent type="search" />
        <NotePreviewAgent type="network" />
    </aside>
</div>