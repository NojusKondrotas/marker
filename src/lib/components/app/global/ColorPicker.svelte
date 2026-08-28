<script lang="ts">

    let thumbSatVal: HTMLElement, thumbHue: HTMLElement;
    let sat: number, val: number, hue: number;
    let isThumbDown = false;

    function toggleSatVal(e: MouseEvent, toggle: boolean, axis: 'x' | 'both') {
        isThumbDown = toggle;
        positionThumb(e, axis);
    }

    function positionThumb(e: MouseEvent, axis: 'x' | 'both') {
        if (!isThumbDown) return null;
        
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const thumb = (e.currentTarget as HTMLElement).querySelector('div')!;
        const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
        const y = Math.min(Math.max(e.clientY - rect.top, 0), rect.height);

        if (axis === 'both')
            thumb.style.top = `${y}px`;
        thumb.style.left = `${x}px`;

        return { x: x / rect.width, y: y / rect.height };
    }

    function toggleSatValThumb(e: MouseEvent, toggle: boolean) {
        toggleSatVal(e, toggle, 'both');
    }

    function positionSatValThumb(e: MouseEvent) {
        const pos = positionThumb(e, 'both');
        if (!pos) return;
        sat = pos.x;
        val = pos.y;
    }

    function toggleHueThumb(e: MouseEvent, toggle: boolean) {
        toggleSatVal(e, toggle, 'x');
    }

    function positionHueThumb(e: MouseEvent) {
        const pos = positionThumb(e, 'x');
        if (!pos) return;
        hue = Math.round(pos.x * 360);
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex flex-col w-[140px] h-[160px] border p-[10px] gap-y-[4px] box-content">
    <div
        onpointerdown={(e) => toggleSatValThumb(e, true)}
        onpointerup={(e) => toggleSatValThumb(e, false)}
        onpointerleave={(e) => toggleSatValThumb(e, false)}
        onpointermove={positionSatValThumb}
        class="color-picker-sat-val w-full aspect-square border">
        <div bind:this={thumbSatVal} class="relative w-[6px] h-[6px] outline outline-black border border-white -translate-x-1/2 -translate-y-1/2">
        </div>
    </div>
    <div
        onpointerdown={(e) => toggleHueThumb(e, true)}
        onpointerup={(e) => toggleHueThumb(e, false)}
        onpointerleave={(e) => toggleHueThumb(e, false)}
        onpointermove={positionHueThumb}
        class="color-picker-hue w-full h-[16px] border">
        <div bind:this={thumbHue} class="relative w-[6px] h-full outline outline-black border border-white -translate-x-1/2">
        </div>
    </div>
</div>

<style>
    :global(.color-picker-sat-val) {
        background:
            linear-gradient(to top, black, transparent),
            linear-gradient(to right, white, transparent),
            hsl(0, 100%, 50%);
    }

    :global(.color-picker-hue) {
        background: linear-gradient(to right,
            hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
            hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%),
            hsl(360, 100%, 50%));
    }
</style>