import { Node } from "./Node"

export class BinaryThree<T> {
    private root: Node<T> | null

    constructor() {
        this.root = null;
    }

    public insert(value: T) {
        const newNode = new Node<T>();
        newNode.setValue(value)

        if(this.isEmpty()) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root!, newNode);
    }

    public printInOrder() {
        if (!this.isEmpty()) {
            console.log("<----------PRINT_IN_ORDER---------->")
            this.inOrderTraversal(this.root!);
            console.log("<----------PRINT_IN_ORDER---------->")
        }

    }

    protected insertNode(root: Node<T>, node: Node<T>) {
        const rootRightNode = root.getRightNode();
        const rootLeftNode = root.getLeftNode();

        if(node.getValue()! > root.getValue()!) {
            if(!rootRightNode) {
                root.setRightNode(node);
                return this;
            }

            this.insertNode(rootRightNode, node);
            return;
        }

        if(!rootLeftNode) {
            root.setLeftNode(node);
            return this
        }

        this.insertNode(rootLeftNode, node);
        return;
    }

    protected isEmpty(): boolean {
        return this.root === null;
    }

    private inOrderTraversal(root: Node<T>) {
        if (root) {
            const rootLeftNode = root.getLeftNode();

            if (rootLeftNode) {
                this.inOrderTraversal(rootLeftNode);
            }

            console.log(root.getValue())

            const rootRightNode = root.getRightNode()

            if (rootRightNode) {
                this.inOrderTraversal(rootRightNode);
            }
        }
    }
}