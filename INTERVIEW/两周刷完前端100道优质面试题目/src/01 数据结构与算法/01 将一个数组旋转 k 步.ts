/**
 * @description 将一个数组旋转 k 步
 * @example Input [1,2,3,4,5,6,7] k=3; Output [5,6,7,1,2,3,4]
 */

/* 问题实现-思路1：把末尾元素挨个 pop，然后 unshift 到数组前边 */
function rotateArrKSteps_1(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!(k && length)) return arr; // 如果输入的 k 为 0，或者数组为空，则直接返回
  const steps = Math.abs(k % length); // 计算实际上要旋转的步数，考虑到 k < 0 和 k >= length 的情况

  for (let i = 0; i < steps; i++) {
    const n = arr.pop() as number;
    arr.unshift(n);
  }
  return arr;
}

/* 问题实现-思路2：把数组拆分，最后使用 concat 拼接到一起 */
function rotateArrKSteps_2(arr: number[], k: number): number[] {
  const length = arr.length;
  if (!(k && length)) return arr; // 如果输入的 k 为 0，或者数组为空，则直接返回
  const steps = Math.abs(k % length); // 计算实际上要旋转的步数，考虑到 k < 0 和 k >= length 的情况

  const kBefore = arr.slice(0, length - steps);
  const kAfter = arr.slice(-steps);
  return kAfter.concat(kBefore);
}

/* 复杂度分析（前端重时间，轻空间！）
  - 思路1
    时间复杂度 O(n^2) ==> 数组是一个有序结构，因此像 unshift、shift、splice 等内置 API 的时间复杂度为 O(n)，再结合外层循环，思路 1 的时间复杂度为 O(n^2)
    空间复杂度 O(1)
  - 思路2（更好！）
    时间复杂度 O(1)
    空间复杂度 O(n) */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  const bigArr = [];
  for (let i = 0; i < 10 * 10000; i++) {
    bigArr.push(i);
  }
  console.time("idea-1");
  rotateArrKSteps_1(bigArr, 9 * 10000); // 1.752s
  console.timeEnd("idea-1");
  console.time("idea-2");
  rotateArrKSteps_2(bigArr, 9 * 10000); // 0.546ms
  console.timeEnd("idea-2");
}

/* 单元测试 */
export function unitTest() {
  describe("将一个数组旋转 k 步-1", () => {
    it("normal", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = 3;
      const res = rotateArrKSteps_1(arr, k);
      expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]); // 断言
    });
    it("arr is empty", () => {
      const arr: number[] = [];
      const k = 3;
      const res = rotateArrKSteps_1(arr, k);
      expect(res).toEqual([]);
    });
    it("k < 0", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = -3;
      const res = rotateArrKSteps_1(arr, k);
      expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });
    it("k = 0", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = 0;
      const res = rotateArrKSteps_1(arr, k);
      expect(res).toEqual(arr);
    });
    it("k = NaN", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = NaN;
      const res = rotateArrKSteps_1(arr, k);
      expect(res).toEqual(arr);
    });
  });

  describe("将一个数组旋转 k 步-2", () => {
    it("normal", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = 3;
      const res = rotateArrKSteps_2(arr, k);
      expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]); // 断言
    });
    it("arr is empty", () => {
      const arr: number[] = [];
      const k = 3;
      const res = rotateArrKSteps_2(arr, k);
      expect(res).toEqual([]);
    });
    it("k < 0", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = -3;
      const res = rotateArrKSteps_2(arr, k);
      expect(res).toEqual([5, 6, 7, 1, 2, 3, 4]);
    });
    it("k = 0", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = 0;
      const res = rotateArrKSteps_2(arr, k);
      expect(res).toEqual(arr);
    });
    it("k = NaN", () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      const k = NaN;
      const res = rotateArrKSteps_2(arr, k);
      expect(res).toEqual(arr);
    });
  });
}

/* 知识补充
1. unshift() 方法将指定元素添加到数组的开头，并返回数组的新长度。
2. concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
3. slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。 */
