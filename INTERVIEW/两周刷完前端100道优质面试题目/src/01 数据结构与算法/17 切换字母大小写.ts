/**
 * @description 输入一个字符串，切换其中字母的大小写
 * @example Input 12aBc34 ; Output 12AbC34
 */

/* 问题实现 */
/* 思路一：正则表达式 */
function switchLetterCaseWithRegExp(str: string): string {
  if (str.length === 0) return str;

  let res = "";
  const lower = /[a-z]/;
  const upper = /[A-Z]/;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (lower.test(char)) res += char.toUpperCase();
    else if (upper.test(char)) res += char.toLowerCase();
    else res += char;
  }

  return res;
}

/* 思路二：ASCII 码比较 */
function switchLetterCaseWithCode(str: string): string {
  if (str.length === 0) return str;

  let res = "";
  const [a, z] = ["a".charCodeAt(0), "z".charCodeAt(0)];
  const [A, Z] = ["A".charCodeAt(0), "Z".charCodeAt(0)];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = str[i].charCodeAt(0);
    if (code >= a || code <= z) res += char.toUpperCase();
    else if (code >= A || code <= Z) res += char.toLowerCase();
    else res += char;
  }

  return res;
}

/* 复杂度分析 */

/* 性能测试（时间复杂度） */
export function performanceTest() {
  const str = "1000asfdsidh23jqwheqc8343bjaisud823nfascmasopjc9WHf37392";

  // console.log(switchLetterCaseWithRegExp(str));
  // console.log(switchLetterCaseWithCode(str));

  console.time("switchLetterCaseWithRegExp");
  for (let i = 0; i < 10 * 10000; i++) switchLetterCaseWithRegExp(str);
  console.timeEnd("switchLetterCaseWithRegExp"); // 294.781ms

  console.time("switchLetterCaseWithCode");
  for (let i = 0; i < 10 * 10000; i++) switchLetterCaseWithCode(str);
  console.timeEnd("switchLetterCaseWithCode"); // 232.63ms
}

/* 单元测试 */
export function unitTest() {}

/* 知识补充
  1. 可以使用 String.prototype.charCodeAt(index) 的方式获取某个字符的 ASCII 码
  2. 慎用正则表达式 */
