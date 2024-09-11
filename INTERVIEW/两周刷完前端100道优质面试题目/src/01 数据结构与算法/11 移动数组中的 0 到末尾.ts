/**
 * @description 移动数组中的 0 到末尾，要求只移动 0，其他元素相对顺序不变，同时必须在原数组进行操作。
 * @example Input [1, 0, 3, 0, 11, 0] ; Output [1, 3, 11, 0, 0, 0]
 */

/* 问题实现 */
/* 思路一：遍历数组，遇见 0 就 push 到末尾，并使用 splice 删除当前元素。
由于 splice 删除元素后需要移动剩余元素，其时间复杂度是 O(n)。
再加上遍历数组，因此该算法的时间复杂度是 O(n^2)，不推荐使用。 */
function moveZeroToEnd(arr: number[]): void {
  if (arr.length === 0) return;

  let zeroLength = 0; // 表示移动 0 的个数，用于修正合理的循环长度，避免遍历到 push 到数组末尾的 0

  for (let i = 0; i < arr.length - zeroLength; i++) {
    if (arr[i] === 0) {
      arr.push(0);
      arr.splice(i, 1);
      zeroLength++;
      i--; // 用于避免连续 0 带来的错误
    }
  }
}
/* 思路二：双指针。定义两个指针用于遍历整个数组，指针 i 指向第一个 0，指针 j 指向 i 后边的第一个非 0。
交换 i 和 j 指向的值，i，j 继续向前移动，直到满足 i 指向 0，j 指向非 0，再进行继续交换。
如果 i 或 j 超过数组的合法索引，那么就停止继续遍历，也就是算法的终止条件。
由于只进行了一次遍历，算法的时间复杂度为 O(n)。 */
function moveZeroToEnd2Pointer(arr: number[]): void {
  if (arr.length === 0) return;

  let i = arr.findIndex((ele) => ele === 0); // 使得 i 指向第一个 0
  let j = arr.findIndex((ele, index) => index > i && ele !== 0); // 使得 j 指向 i 后的第一个非 0

  if (i === -1 || j === -1) return; // 数组没有 0 或 数组只有最后一个元素是 0 时，直接返回

  while (true) {
    /* 终止条件：i 与 j 交叉 or j 是非法的 */
    if (j >= arr.length || i >= j) break;

    if (arr[i] !== 0) i++; // i 不等于 0，则不满足交换条件，需要继续移动
    else if (arr[j] === 0) j++; // j 等于 0，则不满足交换条件，需要继续移动
    else {
      // 此时必定 i === 0 && j !== 1，满足交换条件，进行交换
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j++;
    }
  }
}

/* 复杂度分析：思路一 push & splice 的时间复杂度是 O(n^2)；思路二 双指针的时间复杂度是 O(n) */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  /*   const arr1 = [1, 0, 3, 0, 11, 0];
  moveZeroToEnd(arr1);
  console.log(`push & splice => 移动之后的数组为 ${arr1}`);

  const arr2 = [1, 0, 3, 0, 11, 0];
  moveZeroToEnd2Pointer(arr2);
  console.log(`双指针 => 移动之后的数组为 ${arr2}`); */
  const arr = [];
  for (let i = 0; i < 20 * 10000; i++) {
    if (i % 10 === 0) arr.push(0);
    else arr.push(1);
  }

  console.time("push & splice");
  moveZeroToEnd(arr.slice());
  console.timeEnd("push & splice"); // 435.977ms

  console.time("双指针");
  moveZeroToEnd2Pointer(arr.slice());
  console.timeEnd("双指针"); // 2.147ms
}

/* 单元测试 */
export function unitTest() {
  describe("push & splice 实现移动数组中的 0 到末尾", () => {
    it("normal", () => {
      const arr = [1, 0, 3, 0, 11, 0];
      moveZeroToEnd(arr);
      expect(arr).toEqual([1, 3, 11, 0, 0, 0]);
    });
    it("no zero", () => {
      const arr = [1, 3, 6, 7, 2, 8, 3];
      moveZeroToEnd(arr);
      expect(arr).toEqual([1, 3, 6, 7, 2, 8, 3]);
    });
    it("all be zero", () => {
      const arr = [0, 0, 0, 0, 0];
      moveZeroToEnd(arr);
      expect(arr).toEqual([0, 0, 0, 0, 0]);
    });
  });
  describe("双指针 实现移动数组中的 0 到末尾", () => {
    it("normal", () => {
      const arr = [1, 0, 3, 0, 11, 0];
      moveZeroToEnd2Pointer(arr);
      expect(arr).toEqual([1, 3, 11, 0, 0, 0]);
    });
    it("no zero", () => {
      const arr = [1, 3, 6, 7, 2, 8, 3];
      moveZeroToEnd2Pointer(arr);
      expect(arr).toEqual([1, 3, 6, 7, 2, 8, 3]);
    });
    it("all be zero", () => {
      const arr = [0, 0, 0, 0, 0];
      moveZeroToEnd2Pointer(arr);
      expect(arr).toEqual([0, 0, 0, 0, 0]);
    });
  });
}

/* 知识补充
  - 数组是连续存储，写算法题时要慎用 splice、unshift 等 API
  - 嵌套循环问题可以采取双指针思路优化 */
