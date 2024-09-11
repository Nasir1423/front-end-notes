/**
 * @description 定义一个反转单向链表的函数。n1 -> n2 -> n3 -> n4 ==> n4 -> n3 -> n2 -> n1
 */

/* 问题实现 */
// 链表节点接口
interface LinkNode {
  value: number;
  next: LinkNode | null;
}
/**
 * @description 根据数组创建一个单向链表，返回链表的头节点。如果数组为空，则返回 null。
 */
function createLinkList(arr: number[]): LinkNode {
  const length = arr.length;
  if (!length) throw new Error("arr is empty");

  /* 因为前一个链表节点需要指向后一个链表节点，因此从后向前创建链表节点，进而创建单向链表 */
  // 创建最后一个节点
  let curNode: LinkNode = {
    value: arr[length - 1],
    next: null,
  };

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }

  return curNode;
}
/**
 * @description 反转单向列表，并返回反转后的链表的头节点。
 */
function reverseLinkList(head: LinkNode): LinkNode {
  /* 使用三个指针，使得当前节点可以指向前一个节点，同时不丢失下一个节点 */
  let prevNode: LinkNode | null = null;
  let curNode: LinkNode | null = head;
  let nextNode: LinkNode | null = head.next;

  if (!nextNode) return head;

  while (nextNode) {
    curNode.next = prevNode;
    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode.next;
  }

  curNode.next = prevNode;

  return curNode;
}

/* 复杂度分析 */

/* 性能测试 */
export function performanceTest() {
  const arr = [1, 2, 3, 4, 5, 6];
  const linkList = createLinkList(arr);
  console.log(JSON.stringify(linkList));
  const reversedLinkList = reverseLinkList(linkList);
  console.log(JSON.stringify(reversedLinkList));
}

/* 单元测试 */
export function unitTest() {
  describe("反单向链表", () => {
    it("single element", () => {
      const arr = [100];
      const linkList = createLinkList(arr);
      const reversedLinkList = reverseLinkList(linkList);
      expect(reversedLinkList).toEqual({ value: 100, next: null });
    });
    it("multi elements", () => {
      const arr = [100, 200, 300];
      const linkList = createLinkList(arr);
      const reversedLinkList = reverseLinkList(linkList);
      expect(reversedLinkList).toEqual({
        value: 300,
        next: {
          value: 200,
          next: {
            value: 100,
            next: null,
          },
        },
      });
    });
    it("no elements", () => {
      const arr: number[] = [];
      expect(() => {
        createLinkList(arr);
      }).toThrow("arr is empty");
    });
  });
}

/* 知识补充
    1. 链表：物理结构，非逻辑结构，与数组类似。链表节点的数据结构为 {value, next?, prev?}
    2. 链表 Vs. 数组
      - 数组需要一段连续的内存空间，而链表的内存空间是零散的。
      - 链表和数组都是有序结构（如对象属于无序结构）
      - 链表查询慢 O(n)，新增和删除快 O(1)；数组查询快 O(1)，新增和删除慢 O(n)
    3. 补充：Object 无序，Map 有序；Set 无序，Array 有序 */
