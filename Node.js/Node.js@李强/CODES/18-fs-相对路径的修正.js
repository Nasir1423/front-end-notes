/* 
    相对路径的修正
        - 为什么要修正：因为 fs 的相对路径中的当前目录，参考的不是文件所在的目录，而是命令行的工作目录，因此当命令行的工作目录 != 
        文件所在目录时，会因为路径不一而出现 bug
        - 两种方式
            - 方式一：cd 文件所在路径 && node xxx.js
            - 方式二（推荐）：通过 __dirname + 相对路径 的方式，将文件路径修正为绝对路径
                - __dirname 可以理解是 Node.js 环境中的全局变量
                - __dirname 的值是当前文件所在目录的绝对路径，因此 __dirname + 文件名 就拼接而成文件的绝对路径
        - 使用 fs 模块，尽量使用 __dirname 将路径转换为绝对路径，避免 bug 的产生
*/

const fs = require('fs');

fs.readFile(__dirname + '/../Node.js.md', (err, data)=>{
    if(err){
        console.log("文件读取失败");
        console.log(err.message);
        return;
    }
    console.log("文件读取成功");
    console.log(data);
});

console.log(__dirname); // d:\Nasir\FrontEnd\3-Node.js\CODES