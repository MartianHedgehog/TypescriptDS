<script lang="ts">
import { browser } from "$app/environment";
import { Arrow, Circle, Layer, Line, Stage, Text } from "svelte-konva";
import { useCssVar } from "$lib/theme.svelte.ts";
import { binaryThreeStore } from "./binaryThreeStore.svelte";

const RADIUS = 24;

const nodeStroke = useCssVar("--color-primary", "#4338ca");
const nodeText = useCssVar("--color-base-content", "#1f2937");
const edgeStroke = useCssVar("--color-base-300", "#94a3b8");
const traversalColor = useCssVar("--color-secondary", "#f59e0b");

let inputValue = $state("");
let canvasWidth = $state(0);
let canvasHeight = $state(0);

$effect(() => {
	if (canvasWidth > 0) binaryThreeStore.resize(canvasWidth);
});

function handleInsert() {
	const num = Number(inputValue);
	if (!Number.isNaN(num) && inputValue !== "") {
		binaryThreeStore.insert(num);
		inputValue = "";
	}
}

function edgePoints(px: number, py: number, cx: number, cy: number): number[] {
	const dx = cx - px;
	const dy = cy - py;
	const dist = Math.sqrt(dx * dx + dy * dy);
	const nx = dx / dist;
	const ny = dy / dist;
	return [
		px + nx * RADIUS,
		py + ny * RADIUS,
		cx - nx * RADIUS,
		cy - ny * RADIUS,
	];
}
</script>

<div class="flex flex-row h-full">
	<!-- Sidebar -->
	<aside class="flex flex-col gap-6 p-4 w-64 border-r border-base-300">
		<div class="flex flex-col gap-2">
			<h2 class="text-lg font-bold">Insert</h2>
			<input
				class="input input-bordered w-full"
				type="number"
				placeholder="Value"
				bind:value={inputValue}
				onkeydown={(e) => e.key === "Enter" && handleInsert()}
			/>
			<button class="btn btn-primary w-full" onclick={handleInsert}>Insert</button>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="text-lg font-bold">Traversal</h2>
			{#if binaryThreeStore.isPlaying}
				<button class="btn btn-error w-full" onclick={() => binaryThreeStore.stopTraversal()}>
					Stop
				</button>
			{:else}
				<button class="btn btn-outline w-full" onclick={() => binaryThreeStore.startTraversal()}>
					Start
				</button>
			{/if}
		</div>
	</aside>

	<!-- Canvas area -->
	<div class="flex-1" bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight}>
		{#if browser && canvasWidth > 0}
			<Stage width={canvasWidth} height={canvasHeight}>
				<Layer>
					<!-- Tree edges -->
					{#each binaryThreeStore.nodes as node}
						{#if node.parentX !== null && node.parentY !== null}
							<Line
								points={edgePoints(node.parentX, node.parentY, node.x, node.y)}
								stroke={edgeStroke.value}
								strokeWidth={2}
							/>
						{/if}
					{/each}

					<!-- Traversal arrows -->
					{#each binaryThreeStore.visibleTraversalEdges as edge}
						<Arrow
							points={edgePoints(edge.fromX, edge.fromY, edge.toX, edge.toY)}
							stroke={traversalColor.value}
							fill={traversalColor.value}
							strokeWidth={2}
							dash={[8, 4]}
							pointerLength={10}
							pointerWidth={8}
						/>
					{/each}

					<!-- Nodes -->
					{#each binaryThreeStore.nodes as node}
						<Circle
							x={node.x}
							y={node.y}
							radius={RADIUS}
							fill="transparent"
							stroke={nodeStroke.value}
							strokeWidth={2}
						/>
						<Text
							x={node.x - RADIUS}
							y={node.y - 8}
							width={RADIUS * 2}
							text={String(node.value)}
							fontSize={14}
							fill={nodeText.value}
							align="center"
						/>
					{/each}
				</Layer>
			</Stage>
		{/if}
	</div>
</div>
