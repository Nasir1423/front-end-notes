/**
 * @description 求 1-10000 之间的所有回文数/对称数，如 0, 1, 2, 11, 22, 101, 232, 1221 等
 */

/* 问题实现 */
/* 思路一 使用"数组"反转、比较
(1) 将数字转换为字符串，再转换为数组 
(2) 数组 reverse，再通过 join 转换为字符串 
(3) 进行前后字符串的对比 */
function isPalindromicWithArray(num: number): boolean {
  const str = num.toString();
  const reversedStr = str.split("").reverse().join("");
  return str === reversedStr;
}

/* 思路二 "字符串"头尾比较
(1) 将数字转换为字符串
(2) 字符串头尾字符比较 */
function isPalindromicWithString(num: number): boolean {
  const str = num.toString();
  if (str.length === 1) return true;

  let flag = true;
  let i = 0; // 指向字符串前半边的字符
  let j = str.length - 1; // 指向字符串右半边的字符

  while (i < j) {
    if (str[i] !== str[j]) {
      flag = false;
      break;
    } else {
      i++;
      j--;
    }
  }

  return flag;
}

/* 思路三 "栈"，与判断字符串是否括号匹配类似
(1) 将数字转换为字符串
(2) 将左半边的字符添加到栈中，并剔除最中间的元素（如果有），然后依次遍历右半边的字符
(3) 将每个右半边的字符与栈顶元素进行比较，相同则出栈，否则直接返回 false。如果最后栈空，则返回 true。
(*) 注意奇偶的问题，如果是奇数，则需要跳过最中间的数字 */
function isPalindromicWithStack(num: number): boolean {
  const str = num.toString();
  if (str.length === 1) return true;

  const stack: string[] = [];

  /* 将字符串 str 左半边的字符添加到 stack 中（如果长度为奇数，左半边不包括中间元素） */
  /* str 长度为奇数时，splitIndex 指向最中间的元素；偶数时，splitIndex 指向最中间两个元素的后者 */
  const splitIndex = Math.floor(str.length / 2);
  for (let i = 0; i < splitIndex; i++) stack.push(str[i]);

  /* 将字符串 str 右半边的字符与 stack 中的字符进行比较，只要有一个不匹配则表示不是回文数 */
  const startIndex = str.length % 2 === 0 ? splitIndex : splitIndex + 1;
  for (let i = startIndex; i < str.length; i++) {
    const topChar = stack.pop();
    if (topChar !== str[i]) return false;
  }

  return stack.length === 0;
}

/* 思路四 生成反转数：使用 % 和 Math.floor 生成反转数，前后数字再进行对比
(1) 将数字的每个位置取出来，从个位开始取，然后反转数的计算公式就是
(2) reversedNumber = reversedNumber * 10 + ( 个位 -> 十位 -> 百位 -> ... ) */
function isPalindromicWithNumber(num: number): boolean {
  const str = num.toString();
  if (str.length === 1) return true; // 单位数是回文数

  let tmp = num; // 用于计算数字的各位数
  let reversedNumber = 0; // 用于存储反转数

  while (tmp > 0) {
    let digit = tmp % 10; // 取当前数字的个位数
    reversedNumber = reversedNumber * 10 + digit; // 将当前位加入反转数
    tmp = Math.floor(tmp / 10); // 去掉当前位
  }

  return num === reversedNumber; // 比较原始数和反转数
}

function generatePalindromicNumbers(
  isPalindromic: (num: number) => boolean,
  start: number = 1,
  end: number = 10000
) {
  const res: number[] = [];

  if (start > end || end <= 0) return res;

  for (let i = start; i <= end; i++) {
    isPalindromic(i) && res.push(i);
  }

  return res;
}

/* 复杂度分析 */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  console.time("isPalindromicWithArray");
  generatePalindromicNumbers(isPalindromicWithArray, 1, 1000 * 10000);
  console.timeEnd("isPalindromicWithArray"); // 5.025s

  console.time("isPalindromicWithString");
  generatePalindromicNumbers(isPalindromicWithString, 1, 1000 * 10000);
  console.timeEnd("isPalindromicWithString"); // 311.471ms

  console.time("isPalindromicWithStack");
  generatePalindromicNumbers(isPalindromicWithStack, 1, 1000 * 10000);
  console.timeEnd("isPalindromicWithStack"); // 856.756ms

  console.time("isPalindromicWithNumber");
  generatePalindromicNumbers(isPalindromicWithNumber, 1, 1000 * 10000);
  console.timeEnd("isPalindromicWithNumber"); // 538.523ms
}

/* 单元测试 */
export function unitTest() {
  describe("回文数-数组实现", () => {
    it("normal", () => {
      const res = generatePalindromicNumbers(isPalindromicWithArray, 1, 200);
      expect(res.length).toBe(28);
    });

    it("end <= 0", () => {
      const res = generatePalindromicNumbers(isPalindromicWithArray, 1, -1);
      expect(res).toEqual([]);
    });
  });

  describe("回文数-字符串实现", () => {
    it("normal", () => {
      const res = generatePalindromicNumbers(isPalindromicWithString, 1, 200);
      expect(res.length).toBe(28);
    });

    it("end <= 0", () => {
      const res = generatePalindromicNumbers(isPalindromicWithString, 1, -1);
      expect(res).toEqual([]);
    });
  });

  describe("回文数-栈实现", () => {
    it("normal", () => {
      const res = generatePalindromicNumbers(isPalindromicWithStack, 1, 200);
      expect(res.length).toBe(28);
    });

    it("end <= 0", () => {
      const res = generatePalindromicNumbers(isPalindromicWithStack, 1, -1);
      expect(res).toEqual([]);
    });
  });

  describe("回文数-数值操作实现", () => {
    it("normal", () => {
      const res = generatePalindromicNumbers(isPalindromicWithNumber, 1, 200);
      expect(res.length).toBe(28);
    });

    it("end <= 0", () => {
      const res = generatePalindromicNumbers(isPalindromicWithNumber, 1, -1);
      expect(res).toEqual([]);
    });
  });
}

/* 知识补充
    1. 思路比较
      - 思路一时间最长最不推荐，因为数组的转换和操作需要时间，太慢
      - 思路二和思路四最快，因为计算机比较擅长操作数字
    2. 思考
      - 做算法题时，尽量不要转换数据结构，尤其数组这种有序结构
      - 尽量不要使用像 reverse 这样的内置 API，不利于复杂度的计算
      - 计算机操作数字最快，其次是字符串
*/
