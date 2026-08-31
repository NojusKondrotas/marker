<script lang="ts">
	import Input from "@/components/ui/input/input.svelte";
	import { hexToHSV, hsvToHex } from "@/shared/utils";
	import type { FormEventHandler } from "svelte/elements";

    let thumbSatVal: HTMLElement, thumbHue: HTMLElement;
    let sat = $state(0), val = $state(0), hue = $state(0);
    let hex = $state('ffffff');
    let isThumbDown = false;

    function updateHex() {
        hex = hsvToHex(hue, sat, val).toString().substring(1);
    }

    function updateHue(pos: {x: number, y: number }) {
        hue = Math.round(pos.x * 360);
        updateHex()
    }

    function updateSatVal(pos: {x: number, y: number }) {
        sat = pos.x;
        val = 1 - pos.y;
        updateHex();
    }

    function toggleThumb(e: PointerEvent, toggle: boolean) {
        isThumbDown = toggle;

        const dispatcher = (e.currentTarget as HTMLElement);
        if (toggle) {
            dispatcher.setPointerCapture(e.pointerId);
        } else {
            dispatcher.releasePointerCapture(e.pointerId);
        }
    }

    function positionThumb(e: PointerEvent, axis: 'x' | 'both') {
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

    function toggleSatValThumb(e: PointerEvent, toggle: boolean) {
        toggleThumb(e, toggle);
        positionSatValThumb(e);
    }

    function positionSatValThumb(e: PointerEvent) {
        const pos = positionThumb(e, 'both');
        if (!pos) return;
        updateSatVal(pos);
    }

    function toggleHueThumb(e: PointerEvent, toggle: boolean) {
        toggleThumb(e, toggle);
        positionHueThumb(e);
    }

    function positionHueThumb(e: PointerEvent) {
        const pos = positionThumb(e, 'x');
        if (!pos) return;
        updateHue(pos);
    }

    const inputHex: FormEventHandler<HTMLInputElement> = (e) => {
        const input = e.currentTarget.value;
        const converted = hexToHSV(input);
        if (converted.hue === -1)
            return;

        hue = Math.round(converted.hue);
        sat = converted.sat;
        val = converted.val;

        thumbSatVal.style.left = `${sat * 100}%`;
        thumbSatVal.style.top = `${(1 - val) * 100}%`;
        thumbHue.style.left = `${(hue / 360) * 100}%`;
    };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex flex-col w-[140px] border p-[10px] gap-y-[4px] box-content">
    <div
        onpointerdown={(e) => toggleSatValThumb(e, true)}
        onpointerup={(e) => toggleSatValThumb(e, false)}
        onpointermove={positionSatValThumb}
        class="w-full aspect-square border"
        style="background:
            linear-gradient(to top, black, transparent),
            linear-gradient(to right, white, transparent),
            hsl({hue}, 100%, 50%);">
        <div bind:this={thumbSatVal} class="relative w-[6px] h-[6px] outline outline-black border border-white -translate-x-1/2 -translate-y-1/2">
        </div>
    </div>
    <div
        onpointerdown={(e) => toggleHueThumb(e, true)}
        onpointerup={(e) => toggleHueThumb(e, false)}
        onpointermove={positionHueThumb}
        class="color-picker-hue w-full h-[16px] border">
        <div bind:this={thumbHue} class="relative w-[6px] h-full outline outline-black border border-white -translate-x-1/2">
        </div>
    </div>
    <div class="flex gap-x-0.5">
        <p class="h-fit text-sm">#</p>
        <Input class="p-0 h-fit" oninput={inputHex} value={hex} />
    </div>
</div>

<style>
    :global(.color-picker-hue) {
        background: linear-gradient(to right,
            hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%),
            hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%),
            hsl(360, 100%, 50%));
    }
</style>