/**
 * @description 用两个栈实现一个队列
 */

/* 问题实现：入队时只需要将新的元素放在 stack1 中即可；出队时需要 (1)将 stack1 中的元素全部放到 stack2 中，
  (2)删除 stack2 中的元素，(3)将 stack2 中的剩余元素恢复到 stack1 中，最后返回在 stack2 中删除的元素 */
class MyQueue {
  private stack1: number[] = [];
  private stack2: number[] = [];

  add(n: number) {
    this.stack1.push(n);
  }

  delete(): number | null {
    if (!this.length) return null;
    const stack1 = this.stack1;
    const stack2 = this.stack2;
    // 1. 将 stack1 的内容放到 stack2 中
    while (stack1.length) {
      stack2.push(stack1.pop() as number);
    }
    // 2. 删除 stack2 的内容并返回
    const delNum = stack2.pop() as number;
    // 3. 将 stack2 中的剩余内容放到 stack1 中
    while (stack2.length) {
      stack1.push(stack2.pop() as number);
    }
    return delNum;
  }

  get length(): number {
    return this.stack1.length;
  }
}

/* 复杂度分析
  时间复杂度 add O(1) delete O(n)
  空间复杂度 整体是 O(n) */

/* 性能测试） */
export function performanceTest() {
  const queue = new MyQueue();
  queue.add(100);
  queue.add(200);
  queue.add(300);
  console.log(queue.length);
  console.log(queue.delete());
  console.log(queue.length);
}

/* 单元测试 */
export function unitTest() {
  describe("用两个栈实现一个队列", () => {
    it("length", () => {
      const q = new MyQueue();
      expect(q.length).toBe(0);

      q.add(100);
      q.add(200);
      q.add(300);
      expect(q.length).toBe(3);
    });

    it("delete", () => {
      const q = new MyQueue();
      expect(q.delete()).toBeNull();

      q.add(100);
      q.add(200);
      q.add(300);
      expect(q.delete()).toBe(100);
      expect(q.length).toBe(2);
      expect(q.delete()).toBe(200);
      expect(q.length).toBe(1);
    });
  });
}

/* 知识补充
    1. 队列：(1)先进先出 (2)只有 add delete length 三个 API (3)包含队头、队尾、出队、入队四个相关概念
    2. 队列与栈类似，也属于逻辑结构，是一种抽象的理论模型，可有多种实现方式，如数组、链表或单独设计。使用数组实现队列会存在效率问题，因为出队使用 shift API 其时间复杂度为 O(n)。 */
