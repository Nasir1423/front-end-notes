/**
 * @description 计算斐波那契数列的第 n 个值
 * @example Input n ; Output value
 */

/* 问题实现 */
/* 思路一：递归实现，时间复杂度为 O(2^n)，比 O(n^2) 还大，不可接受也不可使用。
原因在于大量的重复的中间结果的计算，如 计算 f(8) 和 f(7) 都要计算 f(6)，更何况，
计算 f(10) 也要计算 f(8) 进而计算 f(6) => f(6) 被多余计算，且非常严重，由于一分为二，计算量指数级上升，因此容易导致程序崩溃 */
function getNthFibonacciRecursive(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return getNthFibonacciRecursive(n - 1) + getNthFibonacciRecursive(n - 2);
}
/* 思路二：循环实现：相比于递归实现，循环实现保存了中间结果，避免多余的重复计算，从而优化算法性能。时间复杂度是 O(n)。 */
function getNthFibonacciLoop(n: number): number {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let n_2 = 0; // 表示 f(n-2) 的值
  let n_1 = 1; // 表示 f(n-1) 的值
  let res = -1; // 表示最终的计算结果

  for (let i = 2; i <= n; i++) {
    res = n_2 + n_1;
    // 记录中间结果
    n_2 = n_1;
    n_1 = res;
  }

  return res;
}

/* 复杂度分析 */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  console.time("fibonacciRecursive");
  const res1 = getNthFibonacciRecursive(40);
  console.log(`20th of fibonacci is ${res1}`);
  console.timeEnd("fibonacciRecursive"); // 893.992ms

  console.time("fibonacciLoop");
  const res2 = getNthFibonacciLoop(1000000);
  console.log(`20th of fibonacci is ${res2}`);
  console.timeEnd("fibonacciLoop"); // 6.818ms
}

/* 单元测试 */
export function unitTest() {
  describe("斐波那契数列-循环实现", () => {
    it("n = 0 or 1", () => {
      const res1 = getNthFibonacciLoop(0);
      expect(res1).toBe(0);
      const res2 = getNthFibonacciLoop(1);
      expect(res2).toBe(1);
    });
    it("normal", () => {
      const res4 = getNthFibonacciLoop(2);
      expect(res4).toBe(1);
      const res5 = getNthFibonacciLoop(3);
      expect(res5).toBe(2);
      const res6 = getNthFibonacciLoop(4);
      expect(res6).toBe(3);
      const res7 = getNthFibonacciLoop(9);
      expect(res7).toBe(34);
    });
    it("n < 0", () => {
      const res8 = getNthFibonacciLoop(-1);
      expect(res8).toBe(-1);
    });
  });
}

/* 知识补充
  1. 斐波那契 fibonacci 的特点为
    - f(0) = 0, f(1) = 1, f(n) = f(n-1) + f(n-2)
  2. 动态规划：将大问题拆分为小问题，并逐级向下拆解，可以使用递归思路分析，并用循环实现。
  3. 算法的三大思维：贪心、二分、动态规划
  4. 动态规划 —— 青蛙跳台阶
    - 问题描述：假设一只青蛙一次可以跳 1 级台阶或 2 级台阶，那么请问青蛙跳到 n 级台阶总共有多少种方式？
    - 思路分析：假设青蛙第一次跳了一级台阶，那么剩下 n-1 级台阶，即还剩 f(n-1) 种方式。
      如果青蛙第一次跳了二级台阶，那么剩下 n-2 级台阶，即还剩 f(n-2) 中方式。
      因此青蛙跳 n 级台阶的可能有 f(n) = f(n-1) + f(n-2)，这与斐波那契数列是完全相同的。
      考虑边界条件，f(1) = 1，f(2) = 2。 */
