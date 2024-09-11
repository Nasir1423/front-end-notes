/**
 * @description 快速排序
 */

/* 问题实现 */
function quickSort(arr: number[]): number[] {
  if (arr.length === 0 || arr.length === 1) return arr;

  /* 1. 选择基准 */
  const midIndex = Math.floor(arr.length / 2);
  const midValue = arr[midIndex];

  /* 2. 分区 */
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === midIndex) continue;

    if (arr[i] <= midValue) left.push(arr[i]);
    else right.push(arr[i]);
  }

  /* 3. 递归排序 + 合并 */
  const sortedLeft = quickSort(left);
  const sortedRight = quickSort(right);
  return [...sortedLeft, midValue, ...sortedRight];
}

/* 复杂度分析：快速排序有遍历有二分 => 时间复杂度为 O(nlogn) */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  const arr = [1, 6, 1, 2, 45, 9, 2, 0, -5, -6, -7, -8, -9, -10, -11];
  const sortedArr = quickSort(arr);
  console.log(JSON.stringify(sortedArr));
}

/* 单元测试 */
export function unitTest() {
  describe("快速排序", () => {
    it("normal", () => {
      const arr = [1, 6, 1, 2, 45, 9, 2, 0, -5, -6, -7, -8, -9, -10, -11];
      const sortedArr = quickSort(arr);
      expect(sortedArr).toEqual([
        -11, -10, -9, -8, -7, -6, -5, 0, 1, 1, 2, 2, 6, 9, 45,
      ]);
    });
    it("negative number", () => {
      const arr = [0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
      const sortedArr = quickSort(arr);
      expect(sortedArr).toEqual([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0]);
    });
    it("same elements", () => {
      const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      const sortedArr = quickSort(arr);
      expect(sortedArr).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
    });
    it("empty array", () => {
      const arr: number[] = [];
      const sortedArr = quickSort(arr);
      expect(sortedArr).toEqual([]);
    });
  });
}

/* 知识补充
    1. 快速排序是什么？
      - 快速排序（Quick Sort）是一种基于分治法的高效排序算法。
      - 其核心思想是通过选择一个“基准”元素，将数组划分为两个子数组，
        其中一个子数组中的所有元素都小于基准元素，另一个子数组中的所有元素都大于基准元素，
        然后递归地对这两个子数组进行排序。
    2. 快速排序的实现步骤
      - 选择基准（Pivot）
      - 分区（Partition）
      - 递归排序（Recursive Sort）
      - 合并（Combine）
    3. 获取中间值的两种方式
      - splice 不推荐，因为会修改原数组
      - slice 推荐，因为不会修改原数组 */
