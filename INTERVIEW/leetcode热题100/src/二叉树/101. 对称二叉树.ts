import { TreeNode } from "./types";
import { complexTree, symmetricTree } from "./data";

/** 问题描述
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * @param {TreeNode} root
 * @return {number[]}
 * @example
 * Input [1, 2, 2, 3, 4, 4, 3] Output true
 * Input [1, 2, 2, null, 3, null, 3] Output false
 */

/**
 * 递归实现
 */
function isSymmetric1(root: TreeNode | null): boolean {
  /* 思路解析
    - 如果二叉树为空，则必对称，否则二叉树的对称问题可以分解为其左子树与右子树的对称问题
    - 如果两个子树不为空且节点值相等，那么子树的对称问题可以分解为
      第一个子树的左子树与第二个子树的右子树 && 第一个子树的右子树与第二个子树的左子树的对称问题 */
  if (!root) return true; // 二叉树为空，则对称

  const isMirror = (left: TreeNode | null, right: TreeNode | null): boolean => {
    if (!left && !right) return true; // 两个二叉树都为 null，则对称
    if (!left || !right) return false; // 两个二叉树有一个为 null，则不对称
    if (left.val !== right.val) return false; // 两个二叉树的节点值不想等，则不对称
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
  };

  return isMirror(root.left, root.right);
}

/**
 * 迭代实现
 */
function isSymmetric2(root: TreeNode | null): boolean {
  /* 思路解析：使用队列模拟递归
    - 如果二叉树为空，则必对称，否则二叉树的对称问题可以分解为其左子树与右子树的对称问题
    - 如果两个子树不为空且节点值相等，那么参考递归，可以这样做
      > (1)将第一个子树的左子树和第二个子树的右子树入队
      > (2)将第二个子树的右子树和第一个子树的左子树入队
      > (3)从队列中取出队头的两个子树进行比较，如果节点值不等则二叉树必不对称，否则可以重复 (1)(2)
      > end: 知道队列为空，此时二叉树一定是对称的 */
  if (!root) return true; // 二叉树为空，则对称

  const queue: Array<TreeNode | null> = [root.left, root.right]; // 初始队列有二叉树的左右子树

  while (queue.length > 0) {
    /* 取出队头的两个子树进行比较 */
    const left = queue.shift();
    const right = queue.shift();

    /* 可以直接比较两个子树是否对称 */
    if (!left && !right) continue; // 两个二叉树都为 null，则对称，比较下两个子树
    if (!left || !right) return false; // 两个二叉树有一个为 null，因此必不对称
    if (left.val !== right.val) return false; // 两个二叉树的节点值不想等，因此必不对称

    /* 无法直接比较两个子树是否对称，因此
      将第一个子树的左子树和第二个子树的右子树入队
      将第二个子树的右子树和第一个子树的左子树入队
      继续比较 */
    queue.push(left.left, right.right);
    queue.push(left.right, right.left);
  }

  return true;
}

/**
 * 性能测试
 */
export const performanceTest = () => {
  console.time("对称二叉树 - 递归实现");
  console.log(isSymmetric1(complexTree));
  console.log(isSymmetric1(symmetricTree));
  console.timeEnd("对称二叉树 - 递归实现"); // 2.399ms

  console.time("对称二叉树 - 迭代实现");
  console.log(isSymmetric2(complexTree));
  console.log(isSymmetric2(symmetricTree));
  console.timeEnd("对称二叉树 - 迭代实现"); // 0.727ms
};
