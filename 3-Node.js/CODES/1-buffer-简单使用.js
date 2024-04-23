/* 
    1. Buffer 对象的创建
        - Buffer.alloc(n)：创建一个长度为 n 个字节的 Buffer，相当于申请 n 字节的内存空间，其中每个字节的值为 0
        - Buffer.allocUnsafe(n)：创建一个长度为 n 个字节的 Buffer，相当于申请 n 字节的内存空间，其中每个字节的值不一定为 0（存在旧值）
        - Buffer.from(obj)：通过字符串或数组对象创建一个 Buffer
            - 传入字符串对象：将字符串中的每个字符转换为 Buffer 中的若干个元素（英文是 1 个字符对应 1 个字节；中文是 1 个字符对应 3 个字节）
            - 传入数组对象：将数组中每个元素转换为 Buffer 中的一个元素
*/
// Buffer.alloc(n)
let bufSafe = Buffer.alloc(10);
console.log(bufSafe); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Buffer.allocUnsafe(n)
let bufUnsafe = Buffer.allocUnsafe(10);
console.log(bufUnsafe);

// Buffer.from(obj)
let bufStr = Buffer.from('hello');
console.log(bufStr); // <Buffer 68 65 6c 6c 6f>
let bufStrZh = Buffer.from('你好');
console.log(bufStrZh); // <Buffer e4 bd a0 e5 a5 bd>
let bufArr = Buffer.from([123, 34, 67, 79, 222, 3]);
console.log(bufArr); // <Buffer 7b 22 43 4f de 03>

/* 
    2. Buffer <==> String
        - Buffer => String: bufObj.toString()
        - String => Buffer: Buffer.from(strObj)
        - 注：Buffer 对象的 toString 方法默认是按照 utf-8 的编码方式进行转换的
*/
// Buffer => String
let bufObj = Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]);
console.log(bufObj.toString()); // 你好
// String =>Buffer
let strObj = "欢迎你";
console.log(Buffer.from(strObj)); // <Buffer e6 ac a2 e8 bf 8e e4 bd a0>

/* 
    3. Buffer 的读写
        - 读：bufObj[index]
        - 写：bufObj[index] = newValue
        - 注
            - 修改元素时的溢出现象：因为 Buffer 元素是一个字节大小，最大可表示数值不能超过 255，如果 newValue > 255，此时就会溢出
            - 溢出处理策略：高位截断抛弃，直接取 newValue 二进制后八位的值作为 Buffer 中的元素取值
            - 对于某一个元素，可以通过 bufObj[index].toString(2) 获取其二进制表示
*/
// Write
let buf = Buffer.from([0xe4, 0xbd, 0xa0, 0xe5, 0xa5, 0xbd]);
console.log(buf.toString()); // 你好
buf[0] = 66;
console.log(buf.toString()); // B��好
// Read
console.log(buf[4]); // 165
console.log(buf[4].toString(2)); // 10100101
