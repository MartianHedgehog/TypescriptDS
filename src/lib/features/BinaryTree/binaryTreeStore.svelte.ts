import { BinaryThree } from "../../../dataStructures/BinaryThree/BinaryThree";
import type { Node } from "../../../dataStructures/BinaryThree/Node";
export interface VisualNode {
	value: number;
	x: number;
	y: number;
	parentX: number | null;
	parentY: number | null;
}

export interface TraversalEdge {
	fromX: number;
	fromY: number;
	toX: number;
	toY: number;
}

const LEVEL_HEIGHT = 80;
const TRAVERSAL_INTERVAL_MS = 700;

function computeLayout(
	node: Node<number> | null,
	depth: number,
	minX: number,
	maxX: number,
	parent: { x: number; y: number } | null,
	result: VisualNode[],
) {
	if (!node) return;

	const x = (minX + maxX) / 2;
	const y = depth * LEVEL_HEIGHT + 50;

	result.push({
		value: node.getValue() as number,
		x,
		y,
		parentX: parent?.x ?? null,
		parentY: parent?.y ?? null,
	});

	computeLayout(node.getLeftNode(), depth + 1, minX, x, { x, y }, result);
	computeLayout(node.getRightNode(), depth + 1, x, maxX, { x, y }, result);
}

// Generic: converts an ordered list of visited values into traversal edges between their visual positions
export function buildTraversalEdges(visitOrder: number[], nodes: VisualNode[]): TraversalEdge[] {
	const edges: TraversalEdge[] = [];
	const nodeMap = new Map(nodes.map((n) => [n.value, n]));

	for (let i = 0; i < visitOrder.length - 1; i++) {
		const from = nodeMap.get(visitOrder[i]);
		const to = nodeMap.get(visitOrder[i + 1]);
		if (from && to) {
			edges.push({ fromX: from.x, fromY: from.y, toX: to.x, toY: to.y });
		}
	}

	return edges;
}

class BinaryThreeStore {
	private tree = new BinaryThree<number>();
	private canvasWidth = $state(800);
	private timer: ReturnType<typeof setInterval> | null = null;
	private allTraversalEdges: TraversalEdge[] = [];

	nodes = $state<VisualNode[]>([]);
	visibleTraversalEdges = $state<TraversalEdge[]>([]);
	isPlaying = $state(false);

	insert(value: number) {
		this.tree.insert(value);
		this.#recompute();
	}

	resize(width: number) {
		this.canvasWidth = width;
		this.#recompute();
	}

	startTraversal() {
		this.stopTraversal();

		const visitOrder: number[] = [];
		this.tree.inOrder((value) => visitOrder.push(value));

		this.allTraversalEdges = buildTraversalEdges(visitOrder, this.nodes);
		this.visibleTraversalEdges = [];
		this.isPlaying = true;

		let step = 0;
		this.timer = setInterval(() => {
			if (step >= this.allTraversalEdges.length) {
				this.stopTraversal();
				return;
			}
			this.visibleTraversalEdges = this.allTraversalEdges.slice(0, step + 1);
			step++;
		}, TRAVERSAL_INTERVAL_MS);
	}

	stopTraversal() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
		this.isPlaying = false;
		this.visibleTraversalEdges = [];
	}

	#recompute() {
		const result: VisualNode[] = [];
		computeLayout(this.tree.getRoot(), 0, 0, this.canvasWidth, null, result);
		this.nodes = result;
		this.stopTraversal();
	}
}

export const binaryThreeStore = new BinaryThreeStore();
