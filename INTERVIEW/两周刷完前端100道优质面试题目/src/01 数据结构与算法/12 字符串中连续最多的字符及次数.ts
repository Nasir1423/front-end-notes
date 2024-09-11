/**
 * @description 统计字符串中连续最多的字符及次数
 * @example Input 'abbcccddeeee1234' ; Output { char: 'e', count: 4 }
 */

/* 问题实现 */
interface ResType {
  char: string;
  count: number;
}
/* 思路一 嵌套循环，对于每个字符，向后查找得到每个字符的连续次数，以此类推，可以找到连续出现最多的字符并确定其出现次数。
需要注意的是，这种解决方式的时间复杂度并不是 O(n^2) 而是 O(n)，因为外层遍历存在跳步现象，使得总共的计算量为 O(n)。 */
function findMaxConsecutiveCharCount(str: string): ResType {
  let globalRes: ResType = { char: "", count: 0 };

  if (str.length === 0) return globalRes;
  
  for (let i = 0; i < str.length; ) {
    /* 统计：计算每个字符出现的次数 */
    const currentRes: ResType = { char: str[i], count: 1 };
    for (let j = i + 1; j < str.length; j++) {
      if (currentRes.char === str[j]) currentRes.count++;
      else break;
    }
    /* 跳步：开始遍历统计下一个字符（因为这一步的操作，虽然是嵌套循环，算法的时间复杂度仍然是 O(n)） */
    i += currentRes.count;
    /* 比较：将当前答案与全局答案比较，如果 count 更大，则替换全局答案 */
    if (currentRes.count > globalRes.count) globalRes = currentRes;
  }

  return globalRes;
}

/* 思路二 双指针。定义两个指针 i 和 j，开始都指向同一元素，然后让 j 向后移动，如果 j 指向的元素和 i 指向的元素相同，则 j 继续移动，直到不同或到达字符串边界。
当 i 和 j 指向的元素不同时，记录 j - i 作为 i 指向的字符的连续出次数，同时让 i 追上 j，继续统计下一个字符的出现频率。
以此类推，可以找到连续出现最多的字符并确定其出现次数。这种解决方式的时间复杂度为 O(n)。 */
function findMaxConsecutiveCharCount2Pointer(str: string): ResType {
  let globalRes: ResType = { char: "", count: 0 };

  if (str.length === 0) return globalRes;

  let i = 0; // 指向当前正在统计的字符
  let j = 1; // 指向 i 后边的字符，用于统计其出现次数
  let currentRes: ResType = { char: str[i], count: 1 };

  while (true) {
    if (j >= str.length) {
      /* 处理解决连续字符情况，如果不加，则会出错 */
      if (currentRes.count > globalRes.count) globalRes = currentRes;
      break;
    }

    if (str[j] === str[i]) {
      /* 统计：计算 str[i] 的出现次数 */
      currentRes.count++;
    } else {
      /* 比较：将当前答案与全局答案比较，如果 count 更大，则替换全局答案 */
      if (currentRes.count > globalRes.count) globalRes = currentRes;
      /* 跳步：更新 i，使其指向 j 所指向的新元素，表示开始遍历统计下一个字符。同时需要更新当前答案。 */
      i = j;
      currentRes = { char: str[i], count: 1 };
    }

    j++;
  }

  return globalRes;
}

/* 复杂度分析：两种实现的时间复杂度都是 O(n) */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  /* const str = "abbcccddeeee1234";

  const res1 = findMaxConsecutiveCharCount(str);
  console.log(res1);

  const res2 = findMaxConsecutiveCharCount2Pointer(str);
  console.log(res2); */

  let str = "";
  for (let i = 0; i < 1000 * 10000; i++) str += i;

  console.time("consecutiveChar-loop");
  findMaxConsecutiveCharCount(str);
  console.timeEnd("consecutiveChar-loop"); // 601.597ms

  console.time("consecutiveChar - pointer");
  findMaxConsecutiveCharCount2Pointer(str);
  console.timeEnd("consecutiveChar - pointer"); // 470.41ms
}

/* 单元测试 */
export function unitTest() {
  describe("字符串中连续最多的字符及次数-嵌套循环实现", () => {
    it("normal", () => {
      const str = "abbcccddeeee1234";
      const res = findMaxConsecutiveCharCount(str);
      expect(res).toEqual({ char: "e", count: 4 });
    });
    it("empty str", () => {
      const str = "";
      const res = findMaxConsecutiveCharCount(str);
      expect(res).toEqual({ char: "", count: 0 });
    });
    it("no continuous char", () => {
      const str = "abcdefghijk";
      const res = findMaxConsecutiveCharCount(str);
      expect(res).toEqual({ char: "a", count: 1 });
    });
    it("all be continuous chars", () => {
      const str = "aaaaaaaaaaaaaaa";
      const res = findMaxConsecutiveCharCount(str);
      expect(res).toEqual({ char: "a", count: 15 });
    });
  });
  describe("字符串中连续最多的字符及次数-双指针实现", () => {
    it("normal", () => {
      const str = "abbcccddeeee1234";
      const res = findMaxConsecutiveCharCount2Pointer(str);
      expect(res).toEqual({ char: "e", count: 4 });
    });
    it("empty str", () => {
      const str = "";
      const res = findMaxConsecutiveCharCount2Pointer(str);
      expect(res).toEqual({ char: "", count: 0 });
    });
    it("no continuous char", () => {
      const str = "abcdefghijk";
      const res = findMaxConsecutiveCharCount2Pointer(str);
      expect(res).toEqual({ char: "a", count: 1 });
    });
    it("all be continuous chars", () => {
      const str = "aaaaaaaaaaaaaaa";
      const res = findMaxConsecutiveCharCount2Pointer(str);
      expect(res).toEqual({ char: "a", count: 15 });
    });
  });
}

/* 知识补充
    1. 本题也可以使用正则表达式解决，虽然代码简单，但是不推荐！因为正则表达式的效率特别低！
    2. 算法题慎用语法糖和高级 API。
    3. 双指针常用于解决嵌套循环 */
