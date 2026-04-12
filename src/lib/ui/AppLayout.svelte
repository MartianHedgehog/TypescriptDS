<script lang="ts">
import type { Snippet } from "svelte";

let {
	children,
	sidebar,
	title = "",
}: {
	children: Snippet;
	sidebar: Snippet;
	title?: string;
} = $props();

let sidebarOpen = $state(true);
</script>

<div class="drawer h-full" class:drawer-open={sidebarOpen}>
	<input id="sidebar-toggle" type="checkbox" class="drawer-toggle" bind:checked={sidebarOpen} />

	<!-- Main content -->
	<div class="drawer-content flex flex-col h-full">
		<!-- Navbar -->
		<nav class="navbar bg-base-300 shrink-0">
			<label for="sidebar-toggle" aria-label="toggle sidebar" class="btn btn-square btn-ghost">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="inline-block size-5">
					<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
					<path d="M9 4v16"></path>
					<path d="M14 10l2 2l-2 2"></path>
				</svg>
			</label>
			{#if title}
				<span class="px-4 font-bold">{title}</span>
			{/if}
		</nav>

		<!-- Page content -->
		<div class="flex-1 p-6 overflow-auto">
			{@render children()}
		</div>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side h-full">
		<label for="sidebar-toggle" aria-label="close sidebar" class="drawer-overlay bg-transparent!"></label>

		<aside class="flex h-full w-64 flex-col bg-base-200 p-4">
			<a href="/" class="btn btn-ghost justify-start gap-2">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor" class="size-4">
					<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
					<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
				</svg>
				Home
			</a>

			<div class="divider my-0 mb-2"></div>

			{@render sidebar()}
		</aside>
	</div>
</div>
