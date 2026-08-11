<script lang="ts">
	import '../../../layout.css';

	let { children } = $props();
</script>

<div class="flex flex-col items-center w-screen h-screen">
	<div class="w-full h-[min(10%,50px)] shrink-0"></div>
	<main class="w-[min(40%,600px)] text-2xl leading-[2.8] tracking-wider scrollbar-hidden overflow-y-auto">
		{@render children()}
	</main>
	<div class="w-full h-[min(10%,50px)] shrink-0"></div>
</div>