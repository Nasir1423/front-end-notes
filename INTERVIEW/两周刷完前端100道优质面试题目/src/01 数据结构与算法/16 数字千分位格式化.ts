/**
 * @description 将数字千分位格式化，并输出字符串
 * @example Input 12050100 ; Output 12,050,100
 */

/* 问题实现 */
/* 思路一：使用数组转换。
(1) 将数字转换为字符串，再拆分为数组，并逆序
(2) 遍历这个数组字符，拼接得到格式化的字符串 */
function formatWithArr(num: number): string {
  num = Math.floor(num); // 保证是对整数进行操作

  const reversedArr = num.toString().split("").reverse(); // 将数字转换为字符串，并拆分为数组，再逆序处理
  const formattedStr = reversedArr.reduce((prev, cur, index) => {
    // 如果 index % 3 === 0，说明需要在 prev 前添加一个逗号。注意 index = 0 时需要特殊处理，即直接返回当前字符。
    if (index === 0) return cur;
    else if (index % 3 === 0) return cur + "," + prev;
    else return cur + prev;
  }, "");

  return formattedStr;
}

/* 思路二：使用字符串实现。
与数组类似，不过需要从后向前遍历字符串，拼接得到格式化的字符串。 */
function formatWithStr(num: number): string {
  num = Math.floor(num);

  let formattedStr = "";
  const str = num.toString();

  for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
    if (j === 0) formattedStr = str[i];
    else if (j % 3 === 0) formattedStr = str[i] + "," + formattedStr;
    else formattedStr = str[i] + formattedStr;
  }

  return formattedStr;
}

/* 思路三：正则表达式（虽然简洁，但是速度慢） */
function formatWithRegExp(num: number) {
  // 转换数字为字符串，并使用正则表达式进行替换
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* 复杂度分析 */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  // console.log(formatWithArr(120050100));
  // console.log(formatWithStr(120050100));

  // console.log(formatWithArr(120050101));
  // console.log(formatWithStr(120050101));

  // console.log(formatWithArr(123));
  // console.log(formatWithStr(123));

  // console.log(formatWithArr(3));
  // console.log(formatWithStr(3));

  console.time("formatWithArr");
  for (let i = 1; i < 1000 * 10000; i++) formatWithArr(i);
  console.timeEnd("formatWithArr"); // 2.269s

  console.time("formatWithStr");
  for (let i = 1; i < 1000 * 10000; i++) formatWithStr(i);
  console.timeEnd("formatWithStr"); // 1.064s

  console.time("formatWithRegExp");
  for (let i = 1; i < 1000 * 10000; i++) formatWithRegExp(i);
  console.timeEnd("formatWithRegExp"); // 2.697s
}

/* 单元测试 */
export function unitTest() {
  describe("数字千分位格式化 - 数组实现", () => {
    it("normal", () => {
      expect(formatWithArr(120050100)).toBe("120,050,100");
      expect(formatWithArr(1200501001)).toBe("1,200,501,001");
      expect(formatWithArr(12005010012)).toBe("12,005,010,012");
    });
    it("number < 1000", () => {
      expect(formatWithArr(0)).toBe("0");
      expect(formatWithArr(12)).toBe("12");
      expect(formatWithArr(123)).toBe("123");
    });
  });
  describe("数字千分位格式化 - 字符串实现", () => {
    it("normal", () => {
      expect(formatWithStr(120050100)).toBe("120,050,100");
      expect(formatWithStr(1200501001)).toBe("1,200,501,001");
      expect(formatWithStr(12005010012)).toBe("12,005,010,012");
    });
    it("number < 1000", () => {
      expect(formatWithStr(0)).toBe("0");
      expect(formatWithStr(12)).toBe("12");
      expect(formatWithStr(123)).toBe("123");
    });
  });
  describe("数字千分位格式化 - 正则表达式实现", () => {
    it("normal", () => {
      expect(formatWithRegExp(120050100)).toBe("120,050,100");
      expect(formatWithRegExp(1200501001)).toBe("1,200,501,001");
      expect(formatWithRegExp(12005010012)).toBe("12,005,010,012");
    });
    it("number < 1000", () => {
      expect(formatWithRegExp(0)).toBe("0");
      expect(formatWithRegExp(12)).toBe("12");
      expect(formatWithRegExp(123)).toBe("123");
    });
  });
}

/* 知识补充
    - 操作的速度比较：数值 or 字符串（性能最好） > 数组 > 语法糖、正则表达式（性能最差）等 */
