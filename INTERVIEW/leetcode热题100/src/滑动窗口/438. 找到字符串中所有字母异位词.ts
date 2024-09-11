/** 问题描述
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。
 * 不考虑答案输出的顺序。异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。s 和 p 仅包含小写字母。
 * @param s
 * @param p
 * @example
 * Input s = "cbaebabacd", p = "abc" Output [0, 6]
 * Input s = "abab", p = "ab" Output [0,1,2]
 */

/**
 * 暴力求解 -> 时间复杂度巨高，因此不可用
 */
function findAnagrams_invalid(s: string, p: string): number[] {
  /* 思路：求解 p 对应的所有全排列构成的数组，然后按照长度为 p 的区间遍历 s */
  /* 警告：不可用，时间复杂度极高
    - 由于时间复杂度的极高（O(n * m!)），这个算法在处理较大字符串时几乎不可用。
    - 滑动窗口结合字符频次的方式是该问题的更优解法，能将时间复杂度降到 O(n)。 */
  const indexArr: Array<number> = []; // s 中 p 的异位词子串索引构成的数组
  // PART 1 => 假设 p 的长度为 m，则该部分的时间复杂度为 O(m!)
  const generatePermutations = (input: string): string[] => {
    const result: string[] = []; // 存放所有全排列结果
    const currentPermutation: string[] = []; // 存放当前的排列路径
    const isUsed: boolean[] = new Array(input.length).fill(false); // 标记字符是否已被使用

    const backtrack = () => {
      if (currentPermutation.length === input.length) {
        result.push(currentPermutation.join("")); // 当路径长度与输入长度相同时，记录当前路径
        return;
      }

      for (let i = 0; i < input.length; i++) {
        if (isUsed[i]) continue; // 跳过已被使用的字符

        isUsed[i] = true; // 标记当前字符为已使用
        currentPermutation.push(input[i]); // 将当前字符添加到排列路径中

        backtrack(); // 递归继续生成排列

        isUsed[i] = false; // 回溯，恢复状态
        currentPermutation.pop(); // 移除当前字符
      }
    };

    backtrack(); // 开始生成全排列
    return result;
  };
  const permutations = generatePermutations(p); // 获取所有全排列
  // PART 2 => 假设 s 的长度为 n，p 的长度为 m，则该部分的时间复杂度为 O((n-m)*m!)
  for (let i = 0; i < s.length - p.length + 1; i++) {
    const curSubStr = s.slice(i, i + p.length);
    if (permutations.includes(curSubStr)) indexArr.push(i);
  }
  return indexArr;
}

/**
 * 滑动窗口求解
 */
function findAnagrams(s: string, p: string): number[] {
  /* 思路：维护一个大小为 p 的窗口，在字符串 s 中滑动这个窗口，并检查窗口内的子串是否为 p 的异位词。 */
  /* 如何判断滑动窗口中的字符串是不是字符串 p 的 异位词 ==> 通过字符频率统计对比实现 */
  /* 由于题目给出字符仅包含小写字母，因此建立的字符频率统计对象的 
    - key 是（字符的 ascii - 'a' 的 ascii），
    - value 是字符的出现频数
    - 进一步的，可以抽象为数组，index + 'a' 的 ascii = 对应字符的 ascii，元素值就是出现频数 */
  if (s.length < p.length) return [];

  const res: number[] = []; // 结果数组
  const windowCounter: number[] = new Array(26).fill(0); // 窗口频率统计数组
  const pCounter: number[] = new Array(26).fill(0); // 字符串 p 的频率统计数组
  const aAsciiCode = "a".charCodeAt(0);
  for (const char of p) pCounter[char.charCodeAt(0) - aAsciiCode]++; // 初始化字符串 p 的频率统计，此后不再更改

  // 滑动窗口，每次滑动后，计算窗口对应字符串的频率统计数组 windowCounter，然后对比 windowCounter 和 pCounter
  // 如果相等，则窗口对应字符串是 p 的异位词；否则不是。
  // 注意：这里随着滑动更新 windowCounter
  // 假设 s 的长度是 n，p 的长度是 m，那么这里的时间复杂度为 O(n)，时间复杂度由阶乘级别降低为线性
  for (let i = 0; i < s.length; i++) {
    const charIndex = s[i].charCodeAt(0) - aAsciiCode; // 计算当前字符在窗口频率统计数组中的索引
    // 初始化第一个滑动窗口，i === p.length - 1 时则完毕；i >= p.length 时就要进行窗口移动啦
    // 注意：i >= p.length 后，i 就是滑动窗口的右边界
    windowCounter[charIndex]++;

    if (i >= p.length) {
      /* 此时窗口的长度比 p 的长度大 1，因此需要移左边界（for 循环在移动右边界，这里在移动左边界） */
      /* i >= p.length 确保已经存在了初始化了的滑动窗口 */
      const leftCharIndex = s[i - p.length].charCodeAt(0) - aAsciiCode; // 计算出左边界
      windowCounter[leftCharIndex]--; // 移动左边界
    }

    // 比较两个频率统计数组，从而判断是不是异位词
    const isMatch = pCounter.every(
      (_, index) => pCounter[index] === windowCounter[index]
    );
    if (isMatch) res.push(i - p.length + 1); // 计算窗口的左边界
  }

  return res;
}

/**
 * 性能测试
 */
export const performanceTest = () => {
  console.time("找异位词 - 暴力求解");
  console.log(findAnagrams_invalid("cbaebabacd", "abc")); // [0, 6]
  console.log(findAnagrams_invalid("abab", "ab")); // [0,1,2]
  console.timeEnd("找异位词 - 暴力求解"); // 3.627ms
  console.time("找异位词 - 滑动窗口");
  console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
  console.log(findAnagrams("abab", "ab")); // [0,1,2]
  console.timeEnd("找异位词 - 滑动窗口"); // 0.659ms
};

/** 知识补充 - 滑动窗口
 * 1. 概述：滑动窗口主要用于处理连续子数组或子字符串的问题，能够显著提高效率，将时间复杂度从 O(n^2) 降到 O(n)。
 * 2. 类别：固定长度的滑动窗口 or 可变长度的滑动窗口
 * 3. 算法步骤：初始化窗口边界 -> 扩展窗口（移动右指针） -> 缩小窗口（移动左指针） -> 在窗口满足条件时记录当前窗口的结果
 * 4. 优势：降低时间复杂度；减少空间开销
 */
