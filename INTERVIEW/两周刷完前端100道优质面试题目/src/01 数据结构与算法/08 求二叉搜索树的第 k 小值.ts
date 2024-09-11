/**
 * @description 求二叉搜索树的第 k 小值
 * @example Input 二叉搜索树 k ; Output 二叉搜索树的第 k 小值
 */

/* 问题实现-考虑到二叉搜索树的中序遍历得到的结果是升序的，因此可以直接获取到第 k 小值 */
function getKthValue(tree: TreeNode, k: number): number {
  return inOrderTraverse(tree)[k - 1] || -1;
}
interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}
/* 补充-二叉树的遍历 */
/* 二叉树的前序遍历 */
function preOrderTraverse(root: TreeNode): number[] {
  const preOrderRes: number[] = [];
  const traverse = (root: TreeNode) => {
    const { value, left, right } = root;
    preOrderRes.push(value);
    left && traverse(left);
    right && traverse(right);
  };
  traverse(root);
  return preOrderRes;
}
/* 二叉树的中序遍历 */
function inOrderTraverse(root: TreeNode): number[] {
  const preOrderRes: number[] = [];
  const traverse = (root: TreeNode) => {
    const { value, left, right } = root;
    left && traverse(left);
    preOrderRes.push(value);
    right && traverse(right);
  };
  traverse(root);
  return preOrderRes;
}
/* 二叉树的后序遍历 */
function postOrderTraverse(root: TreeNode): number[] {
  const preOrderRes: number[] = [];
  const traverse = (root: TreeNode) => {
    const { value, left, right } = root;
    left && traverse(left);
    right && traverse(right);
    preOrderRes.push(value);
  };
  traverse(root);
  return preOrderRes;
}

/* 复杂度分析 */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  /*    5
      3   7
     2 4 6 8 */
  const tree: TreeNode = {
    value: 5,
    left: {
      value: 3,
      left: { value: 2, left: null, right: null },
      right: { value: 4, left: null, right: null },
    },
    right: {
      value: 7,
      left: { value: 6, left: null, right: null },
      right: { value: 8, left: null, right: null },
    },
  };
  /* 5, 3, 2, 4, 7, 6, 8 */
  console.log(`preOrder: ${preOrderTraverse(tree)}`);
  /* 2, 3, 4, 5, 6, 7, 8 */
  console.log(`inOrder: ${inOrderTraverse(tree)}`);
  /* 2, 4, 3, 6, 8, 7, 5 */
  console.log(`postOrder: ${postOrderTraverse(tree)}`);

  console.log(`3thValue: ${getKthValue(tree, 3)}`);
}

/* 单元测试 */
export function unitTest() {
  describe("二叉搜索树的第 k 小值", () => {
    it("normal", () => {
      const tree: TreeNode = {
        value: 5,
        left: {
          value: 3,
          left: { value: 2, left: null, right: null },
          right: { value: 4, left: null, right: null },
        },
        right: {
          value: 7,
          left: { value: 6, left: null, right: null },
          right: { value: 8, left: null, right: null },
        },
      };
      const res = getKthValue(tree, 3);
      expect(res).toBe(4);
    });
    it("invalid k", () => {
      const tree: TreeNode = {
        value: 5,
        left: {
          value: 3,
          left: { value: 2, left: null, right: null },
          right: { value: 4, left: null, right: null },
        },
        right: {
          value: 7,
          left: { value: 6, left: null, right: null },
          right: { value: 8, left: null, right: null },
        },
      };
      const res1 = getKthValue(tree, 0);
      expect(res1).toBe(-1);

      const res2 = getKthValue(tree, 1000);
      expect(res2).toBe(-1);
    });
  });
}

/* 知识补充
    1. 二叉树 Binary Tree
      - 树形数据结构
      - 每个节点最多只能有两个子节点
      - 树节点的数据结构为 { value, left, right }
    2. 二叉树的遍历（前中后序指的是 root 的打印顺序）
      - 前序遍历 root -> left -> right
      - 中序遍历 left -> root -> right
      - 后序遍历 left -> right -> root
    3. 二叉搜索树 BST Binary Search Tree
      - 每个节点的值大于其左子树全部节点的值
      - 每个节点的值小于其右子树全部节点的值
      - 这样的设计符合二分思想，可以基于二分法实现快速查找
    4. 为什么就二叉树？而不是三叉树、四叉树？
      - 数组查找快 O(1) 增删满 O(n)，而链表查找慢 O(n) 增删快 O(1)，但是二叉搜索树查找快、增删快，是一个性能上的更优选！
      - 但是注意，如果 BST 不平衡则退化为链表，因此要尽量保持 BST 的平衡，也就是平衡二叉搜索树 BBST！
      - BBST 的增删查的时间复杂度都是 O(logn)，logn 也是 BBST 的高度！
    5. 其他二叉树
      - 平衡二叉搜索树 BBST：树的高度为 log_2(节点数量)
      - 红黑树：自平衡二叉树，分为红黑两种颜色，通过颜色转换来维持树的平衡。相对于普通平衡二叉树，它维持平衡的效率更高。
      - B 树：物理上是多叉树，逻辑上是二叉树，一般用于高效 I/O，关系数据库也用 B 树组织数据 */
