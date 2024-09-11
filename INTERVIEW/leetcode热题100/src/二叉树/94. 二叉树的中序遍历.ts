import { TreeNode } from "./types";
import { complexTree } from "./data";

/** 问题描述
 * 给定一个二叉树的根节点 root ，返回它的中序遍历 (左子树 -> 根节点 -> 右子树)。
 * @param {TreeNode} root
 * @return {number[]}
 * @example
 * Input [1, null, 2, 3] Output [1,3,2]
 * Input [] Output []
 * Input [1] Output [1]
 */

/**
 * 递归实现中序遍历
 */
function inorderTraversal1(root: TreeNode | null): number[] {
  /* 递归实现 */
  if (!root) return [];
  const res: number[] = [];

  var traverse = function (node: TreeNode) {
    if (node.left) traverse(node.left); // 中序遍历左子树
    if (node.val || node.val === 0) res.push(node.val); // 访问根节点
    if (node.right) traverse(node.right); // 中序遍历右子树
  };

  traverse(root);
  return res;
}

/**
 * 迭代实现中序遍历
 */
function inorderTraversal2(root: TreeNode | null): number[] {
  /* 迭代实现 */
  /* 思路解析：使用栈模拟递归
      - (1) 由于中序遍历是 左子树 -> 根节点 -> 右子树，因此可以
      - (2) 从根节点开始，向左子树方向进行遍历，将所有的节点加入栈中，直到尽头
      - (3) 此时从堆栈中弹出一个节点并 “访问”，然后检查其右子树的节点，如果存在，则重复 (1)(2) */
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let currentNode: TreeNode | null = root;

  while (
    currentNode || // 该条件意味着还有未处理的子树
    stack.length > 0 // 该条件意味着栈中仍然有节点待处理
  ) {
    // *(1)(2) 从 currentNode 开始迭代访问栈顶元素，并将其左子树依次入栈
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }

    // *(3) 从栈顶弹出一个节点并 “访问”
    currentNode = stack.pop()!; // 访问栈顶元素
    res.push(currentNode.val);

    // 如果弹出的栈顶节点没有右子树 -> 则继续从栈顶弹出节点并访问
    // 否则，继续 (1)(2)
    currentNode = currentNode.right;
  }

  return res;
}

/**
 * 性能测试
 */
export const performanceTest = () => {
  console.time("二叉树中序遍历 - 递归实现");
  console.log(inorderTraversal1(complexTree));
  console.timeEnd("二叉树中序遍历 - 递归实现"); // 3.373ms

  console.time("二叉树中序遍历 - 迭代实现");
  console.log(inorderTraversal2(complexTree));
  console.timeEnd("二叉树中序遍历 - 迭代实现"); // 0.797ms
};

/** 知识补充
 * 1. 前序遍历 Pre-order Traversal：访问根节点 -> 前序遍历左子树 -> 前序遍历右子树 (根节点 -> 左子树 -> 右子树)
 * 2. 中序遍历 In-order Traversal：中序遍历左子树 -> 访问根节点 -> 中序遍历右子树 (左子树 -> 根节点 -> 右子树)
 * 3. 后序遍历 Post-order Traversal：后序遍历左子树 -> 后序遍历右子树 -> 访问根节点 (左子树 -> 右子树 -> 根节点)
 *     1
 *    / \
 *   2   3
 *  / \
 * 4   5
 * 上述二叉树的
 *    (1) 前序遍历为 1* -> 2 -> 4 -> 5 -> 3
 *    (2) 中序遍历为 4 -> 2-> 5 -> 1* -> 3
 *    (3) 后序遍历为 4 -> 5 -> 2 -> 3 -> 1*
 */