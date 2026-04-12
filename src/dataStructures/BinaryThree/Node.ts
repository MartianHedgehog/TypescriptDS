export class Node<T> {
	private value: T | null;
	private leftNode: Node<T> | null;
	private rightNode: Node<T> | null;

	constructor() {
		this.value = null;
		this.leftNode = null;
		this.rightNode = null;
	}

	public setValue(value: T): void {
		this.value = value;
	}

	public setLeftNode(value: Node<T> | null) {
		this.leftNode = value;
	}

	public setRightNode(value: Node<T> | null) {
		this.rightNode = value;
	}

	public getLeftNode() {
		return this.leftNode;
	}

	public getRightNode() {
		return this.rightNode;
	}

	public getValue() {
		return this.value;
	}
}
