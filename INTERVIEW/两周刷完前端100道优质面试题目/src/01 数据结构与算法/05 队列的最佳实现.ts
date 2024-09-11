/**
 * @description 队列的最佳实现
 */

/* 问题实现 */
/* 思路一：数组实现队列 */
class MyArrQueue {
  private queue: number[];

  constructor(arr: number[]) {
    this.queue = arr;
  }

  add(n: number) {
    this.queue.push(n);
  }

  delete(): number | undefined {
    return this.queue.shift();
  }

  get length() {
    return this.queue.length;
  }
}
/* 思路二：链表实现队列 */
interface LinkNode {
  value: number;
  next: LinkNode | null;
}
class MyLinkQueue {
  private head: LinkNode | null;
  private tail: LinkNode | null;
  private _length: number = 0;

  /**
   * @description 根据 number[] 类型的数组 arr 创建单向链表，并初始化 head、tail 指针
   */
  constructor(arr: number[]) {
    const head = this.createLinkList(arr);
    if (!head) {
      // 空链表
      this.head = this.tail = null;
      this.length = 0;
    } else {
      // 不是空链表
      this.head = this.tail = head;
      while (this.tail.next) this.tail = this.tail.next;
      this.length = arr.length;
    }
  }

  add(n: number) {
    const newNode: LinkNode = { value: n, next: null };
    if (!(this.head && this.tail)) {
      // 空链表
      this.head = this.tail = newNode;
    } else {
      // 非空链表
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
    this.length++;
  }

  delete(): number | null {
    if (!(this.head && this.tail)) {
      // 空链表
      return null;
    } else {
      // 非空链表
      const delNode: LinkNode = this.head;
      this.head = this.head.next;
      this.length--;
      return delNode.value;
    }
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
    if (this.length <= 0) this.head = this.tail = null;
  }

  /**
   * @description 根据 number[] 类型的数组 arr 创建单向链表，如果返回 null，则表示当前链表为空链表。
   */
  private createLinkList(arr: number[]): LinkNode | null {
    const length = arr.length;
    if (!length) return null;

    /* 考虑到前边的节点需要指向后边的节点，因此从后向前创建链表节点 */
    let curNode: LinkNode = { value: arr[arr.length - 1], next: null };

    for (let i = arr.length - 2; i >= 0; i--) {
      curNode = {
        value: arr[i],
        next: curNode,
      };
    }

    return curNode;
  }
}

/* 复杂度分析
    空间复杂度：都是 O(n)
    时间复杂度：add 都是 O(1)；delete 数组实现是 O(n)，链表实现是 O(1)*/

/* 性能测试（时间复杂度） */
export function performanceTest() {
  const arrQueue = new MyArrQueue([]);
  const linkQueue = new MyLinkQueue([]);

  console.time("arrQueue");
  for (let i = 0; i < 10 * 10000; i++) arrQueue.add(Math.random() * 100);
  for (let i = 0; i < 10 * 10000; i++) arrQueue.delete();
  console.log("arrQueue", arrQueue);
  console.timeEnd("arrQueue"); // 257.034 ms

  console.time("listQueue");
  for (let i = 0; i < 10 * 10000; i++) linkQueue.add(Math.random() * 100);
  for (let i = 0; i < 10 * 10000; i++) linkQueue.delete();
  console.log("linkQueue", linkQueue);
  console.timeEnd("listQueue"); // 4.502 ms
}

/* 单元测试 */
export function unitTest() {
  describe("数组实现队列", () => {
    it("add & length", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const arrQueue = new MyArrQueue(arr);
      expect(arrQueue.length).toBe(arr.length);

      arrQueue.add(100);
      arrQueue.add(200);
      arrQueue.add(300);
      expect(arrQueue.length).toBe(13);
    });
    it("delete & length", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const arrQueue = new MyArrQueue(arr);

      arrQueue.delete();
      arrQueue.delete();
      arrQueue.delete();
      expect(arrQueue.length).toBe(7);
    });
    it("empty arr", () => {
      const arr: number[] = [];
      const arrQueue = new MyArrQueue(arr);
      expect(arrQueue.length).toBe(0);
    });
  });
  describe("链表实现队列", () => {
    it("add & length", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const linkQueue = new MyLinkQueue(arr);
      expect(linkQueue.length).toBe(arr.length);

      linkQueue.add(100);
      linkQueue.add(200);
      linkQueue.add(300);

      expect(linkQueue.length).toBe(arr.length + 3);
    });
    it("delete & length", () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const linkQueue = new MyLinkQueue(arr);

      linkQueue.delete();
      linkQueue.delete();
      linkQueue.delete();
      expect(linkQueue.length).toBe(arr.length - 3);
    });
    it("empty arr", () => {
      const arr: number[] = [];
      const linkQueue = new MyLinkQueue(arr);
      expect(linkQueue.length).toBe(0);
    });
  });
}

/* 知识补充
    1. 队列实现之链表实现 Vs. 数组实现
        - 数组连续存储，push 快，shift 慢
        - 链表非连续存储，add、delete 快
        - 因此，链表实现队列更快
    2. 链表实现队列的注意事项
        - 使用单向链表，同时记录表头 head 和表尾 tail
        - 表头 head 出队，表尾 tail 入队
        - length 必须实时记录，否则需要遍历链表增加时间复杂度！不能遍历查找
*/
