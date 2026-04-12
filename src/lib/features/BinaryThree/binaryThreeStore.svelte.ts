import { BinaryThree } from "../../../dataStructures/BinaryThree/BinaryThree";
import type { Node } from "../../../dataStructures/BinaryThree/Node";

export interface VisualNode {
	value: number;
	x: number;
	y: number;
	parentX: number | null;
	parentY: number | null;
}

const LEVEL_HEIGHT = 80;

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

class BinaryThreeStore {
	private tree = new BinaryThree<number>();
	private canvasWidth = $state(800);
	nodes = $state<VisualNode[]>([]);

	insert(value: number) {
		this.tree.insert(value);
		this.#recompute();
	}

	resize(width: number) {
		this.canvasWidth = width;
		this.#recompute();
	}

	#recompute() {
		const result: VisualNode[] = [];
		computeLayout(this.tree.getRoot(), 0, 0, this.canvasWidth, null, result);
		this.nodes = result;
	}
}

export const binaryThreeStore = new BinaryThreeStore();
