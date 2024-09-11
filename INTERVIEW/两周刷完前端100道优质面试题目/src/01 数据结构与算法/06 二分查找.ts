/**
 * @description 二分查找
 * @example Input 有序（升序）数组 要查找的元素 ; Output 返回要查找的元素的索引或 -1（表示未找到）
 */

/* 问题实现 */
/* 思路一：循环实现 => 性能更好 */
function binarySearchLoop(arr: number[], target: number) {
  if (arr.length === 0) return -1;

  let startIndex = 0;
  let endIndex = arr.length - 1;

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midValue = arr[midIndex];

    if (target < midValue) endIndex = midIndex - 1;
    else if (target > midValue) startIndex = midIndex + 1;
    else return midIndex;
  }

  return -1;
}

/* 思路二：递归实现 => 代码逻辑清晰 */
function binarySearchRecursive(
  arr: number[],
  target: number,
  startIndex?: number,
  endIndex?: number
) {
  if (arr.length === 0) return -1;

  if (startIndex === undefined) startIndex = 0;
  if (endIndex === undefined) endIndex = arr.length - 1;

  if (startIndex > endIndex) return -1;

  const midIndex = Math.floor((startIndex + endIndex) / 2);
  const midValue = arr[midIndex];

  if (target < midValue)
    return binarySearchRecursive(arr, target, startIndex, midIndex - 1);
  else if (target > midValue)
    return binarySearchRecursive(arr, target, midIndex + 1, endIndex);
  else return midIndex;
}

/* 复杂度分析：时间复杂度为 O(logn)，但是循环执行速度比递归快，因为递归需要多次调用函数，而函数的调用存在时间开销。 */

/* 性能测试 */
export function performanceTest() {
  const arr = [10, 20, 30, 40, 50];
  const target = 40;

  console.time("loop");
  for (let i = 0; i < 1000 * 10000; i++) {
    binarySearchLoop(arr, target);
  }
  console.timeEnd("loop"); // 58.386ms

  console.time("recursive");
  for (let i = 0; i < 1000 * 10000; i++) {
    binarySearchRecursive(arr, target);
  }
  console.timeEnd("recursive"); // 102.202ms
}

/* 单元测试 */
export function unitTest() {
  describe("二分查找-循环实现", () => {
    it("normal", () => {
      const arr = [10, 20, 30, 40, 50];
      const target = 40;
      const targetIndex = binarySearchLoop(arr, target);
      expect(targetIndex).toBe(3);
    });
    it("empty array", () => {
      const arr: number[] = [];
      const target = 40;
      const targetIndex = binarySearchLoop(arr, target);
      expect(targetIndex).toBe(-1);
    });
    it("empty array", () => {
      const arr = [10, 20, 30, 40, 50];
      const target = 45;
      const targetIndex = binarySearchLoop(arr, target);
      expect(targetIndex).toBe(-1);
    });
  });
  describe("二分查找-递归实现", () => {
    it("normal", () => {
      const arr = [10, 20, 30, 40, 50];
      const target = 40;
      const targetIndex = binarySearchRecursive(arr, target);
      expect(targetIndex).toBe(3);
    });
    it("empty array", () => {
      const arr: number[] = [];
      const target = 40;
      const targetIndex = binarySearchRecursive(arr, target);
      expect(targetIndex).toBe(-1);
    });
    it("empty array", () => {
      const arr = [10, 20, 30, 40, 50];
      const target = 45;
      const targetIndex = binarySearchRecursive(arr, target);
      expect(targetIndex).toBe(-1);
    });
  });
}

/* 知识补充：凡有序，必二分；凡二分，时间复杂度必包含（大于的意思） O(logn) */
