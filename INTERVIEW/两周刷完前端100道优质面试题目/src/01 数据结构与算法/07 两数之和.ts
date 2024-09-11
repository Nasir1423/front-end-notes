/**
 * @description 给定一个递增的数组和一个数 n，找到数组中和为 n 的两个元素
 * @example Input [1,2,4,7,11,15] 15 ; Output [4,11]（找不到则返回 null）
 */

/* 问题实现 */
/* 思路一：嵌套循环，即找到一个数，然后去遍历下一个数，再进行求和、判断 => 时间复杂度为 O(n^2)，太大因此不可用 */
/* 思路二：双指针，二分思想。考虑到数组是递增的，那么如何才能有效利用数组的递增特性优化算法的时间复杂度呢？这里就涉及到了二分查找的思想。
对于数组中随便两个元素 a、b（a < b），如果 a + b > n，则说明应该想办法将 a，b 向左移动，使二者之和变小；如果 a + b < n，则说明应该想办法将 a，b 向右移动，使二者之和变大.
因此这里要考虑的就是，移动谁？怎么移动？的问题。这里采取的方式是，首先让 a 指向数组第一个元素，让 b 指向数组最后一个元素，如果和大，则左移 b，和小，则右移 a，这样所有情况都能考虑到。
=> 由于没有了嵌套循环，时间复杂度优化为 O(n) */
function findTwoNumbers(arr: number[], target: number): number[] | null {
  if (arr.length === 0) return null;

  let [leftPointer, rightPointer] = [0, arr.length - 1];
  while (leftPointer < rightPointer) {
    const [leftValue, rightValue] = [arr[leftPointer], arr[rightPointer]];
    const sum = leftValue + rightValue;
    if (sum < target) leftPointer++; // 和太小，左指针右移
    else if (sum > target) rightPointer--; // 和太大，右指针左移
    else return [leftValue, rightValue]; // 找到
  }

  return null;
}

/* 复杂度分析：O(n) */

/* 性能测试（时间复杂度） */
export function performanceTest() {}

/* 单元测试 */
export function unitTest() {
  describe("两数之和", () => {
    it("normal", () => {
      const arr = [1, 2, 4, 7, 11, 15];
      const res = findTwoNumbers(arr, 15);
      expect(res).toEqual([4, 11]);
    });
    it("empty array", () => {
      const res = findTwoNumbers([], 15);
      expect(res).toBeNull();
    });
    it("no result", () => {
      const arr = [1, 2, 4, 7, 11, 15];
      const res = findTwoNumbers(arr, 105);
      expect(res).toEqual(null);
    });
  });
}

/* 知识补充：凡有序，必二分；时间复杂度为 O(n^2) 的算法是不可用的算法；优化嵌套循环，可以考虑使用双指针 */
