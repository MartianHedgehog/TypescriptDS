<script lang="ts">
import { Arrow, Circle, Layer, Line, Stage, Text } from "svelte-konva";
import { browser } from "$app/environment";
import { useCssVar } from "$lib/theme.svelte.ts";
import AppLayout from "$lib/ui/AppLayout.svelte";
import { binaryThreeStore } from "./binaryTreeStore.svelte.js";

const RADIUS = 24;

const nodeStroke = useCssVar("--color-primary", "#4338ca");
const nodeText = useCssVar("--color-base-content", "#1f2937");
const edgeStroke = useCssVar("--color-base-300", "#94a3b8");
const traversalColor = useCssVar("--color-secondary", "#f59e0b");

let inputValue = $state("");
let traversalMode = $state<"stepByStep" | "allAtOnce">("stepByStep");
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

<AppLayout title="Binary Search Tree">
	{#snippet sidebar()}
		<div class="flex flex-col gap-4">
			<span class="font-bold">Insert</span>

			<input
				class="input input-bordered w-full"
				type="number"
				min="0"
				placeholder="Value"
				bind:value={inputValue}
				onkeydown={(e) => e.key === "Enter" && handleInsert()}
			/>

			<button class="btn btn-primary w-full" onclick={handleInsert}>Insert</button>
		</div>

		<div class="divider"></div>

		<div class="flex flex-col gap-4">
			<span class="font-bold">Traversal</span>

			<span class="text-sm text-base-content/60">In Order</span>

			<div class="flex flex-col gap-1">
				<label class="label cursor-pointer justify-start gap-3">
					<input type="radio" class="radio radio-sm" bind:group={traversalMode} value="stepByStep" />
					<span class="label-text">Step by step</span>
				</label>
				<label class="label cursor-pointer justify-start gap-3">
					<input type="radio" class="radio radio-sm" bind:group={traversalMode} value="allAtOnce" />
					<span class="label-text">All at once</span>
				</label>
			</div>

			{#if binaryThreeStore.isPlaying}
				<button class="btn btn-error w-full" onclick={() => binaryThreeStore.stopTraversal()}>Stop</button>
			{:else if binaryThreeStore.visibleTraversalEdges.length > 0}
				<button class="btn btn-error w-full" onclick={() => binaryThreeStore.stopTraversal()}>Hide</button>
			{:else}
				<button class="btn btn-outline btn-accent w-full" onclick={() => binaryThreeStore.startTraversal(traversalMode)}>
					{traversalMode === "allAtOnce" ? "Show" : "Start"}
				</button>
			{/if}
		</div>

		<div class="divider"></div>

		<button class="btn btn-outline btn-error w-full" onclick={() => binaryThreeStore.reset()}>Reset</button>
	{/snippet}

	<!-- Canvas -->
	<div class="h-full" bind:clientWidth={canvasWidth} bind:clientHeight={canvasHeight}>
		{#if browser && canvasWidth > 0}
			<Stage width={canvasWidth} height={canvasHeight}>
				<Layer>
					{#each binaryThreeStore.nodes as node}
						{#if node.parentX !== null && node.parentY !== null}
							<Line
								points={edgePoints(node.parentX, node.parentY, node.x, node.y)}
								stroke={edgeStroke.value}
								strokeWidth={2}
							/>
						{/if}
					{/each}

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
</AppLayout>
