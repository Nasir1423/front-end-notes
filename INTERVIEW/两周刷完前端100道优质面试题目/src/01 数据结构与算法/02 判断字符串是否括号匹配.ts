/**
 * @description 判断字符串是否括号匹配。
 * @example 假设一个字符串 s 可能包含 {}、()、[] 三种括号，判断 s 是否是括号匹配的。如 (a{b}c) 是匹配的，{a(b 或 {a(b}c) 是不匹配的。
 */

/* 问题实现-栈：遇见左括号就入栈，遇见右括号且与栈顶匹配就出栈，最后判断 length 是否为 0，true 则表示字符串是括号匹配的，否则是不匹配的。这里使用数组模拟栈。 */
function isBracketMatch(s: string): boolean {
  if (!s.length) return true; // 如果字符串为空串，则直接认为是匹配的

  const stack: string[] = [];
  const leftBrackets = "{([";
  const rightBrackets = "})]";

  for (let char of s) {
    if (leftBrackets.includes(char)) {
      stack.push(char);
    } else if (rightBrackets.includes(char)) {
      const topChar = stack[stack.length - 1];

      if (isBracket(topChar, char)) stack.pop();
      else return false;
    }
  }
  return stack.length === 0;
}
/**
 * @description 辅助函数：判断两个字符是否可以构成一个括号，即 () 或 {} 或 []
 */
function isBracket(left: string, right: string): boolean {
  if (left.length !== 1 || right.length !== 1) return false; // 必须满足 left、right 都是单个字符才能进行比较，否则直接返回 false

  if (left === "[" && right === "]") return true;
  if (left === "{" && right === "}") return true;
  if (left === "(" && right === ")") return true;
  return false;
}

/* 复杂度分析
    时间复杂度 O(n) ==> 虽然字符串的 includes API 的时间复杂度是 O(n)，但是这里并没有对输入 s 使用 includes，而是对 leftBrackets、rightBrackets 使用，对应的时间复杂度只有 O(1)。
    空间复杂度 O(n) */

/* 性能测试 */
export function performanceTest() {
  console.log(`(a{b}c) 是否匹配？${isBracketMatch("(a{b}c)")}`);
  console.log(`{a(b 是否匹配？${isBracketMatch("{a(b")}`);
  console.log(`{a(b}c) 是否匹配？${isBracketMatch("{a(b}c)")}`);
}

/* 单元测试 空字符串你 */
export function unitTest() {
  describe("判断字符串是否括号匹配", () => {
    it("match", () => {
      const s = "{a(b[c]d)e}f";
      const res = isBracketMatch(s);
      expect(res).toBe(true);
    });

    it("not match", () => {
      const s = "{a(b[c)]d)e}f";
      const res = isBracketMatch(s);
      expect(res).toBe(false);
    });

    it("disordered brackets", () => {
      const s = "{a(b[c)d]e}f";
      const res = isBracketMatch(s);
      expect(res).toBe(false);
    });

    it("empty string", () => {
      const s = "";
      const res = isBracketMatch(s);
      expect(res).toBe(true);
    });
  });
}

/* 知识补充
  1. 栈：(1)先进后出 (2)只有 push、pop、length 三个 API (3)包含栈底、栈顶、压栈、出栈四个相关概念
  2. 栈 Vs. 数组
    - 栈是逻辑结构，是一种抽象的理论模型，可以有多种实现方式。
    - 数组是物理结构，是真实的功能实现，受限于编程语言。 */
