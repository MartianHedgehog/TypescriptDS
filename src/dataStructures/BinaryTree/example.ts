import { BinaryThree } from "./BinaryThree";

const binaryThree = new BinaryThree<number>();

binaryThree.insert(5);
binaryThree.insert(9);
binaryThree.insert(2);
binaryThree.insert(4);
binaryThree.insert(7);
binaryThree.insert(8);
binaryThree.insert(10);
binaryThree.insert(150);
binaryThree.inOrder((value) => console.log(value));

export { binaryThree as exampleBinaryThree };
