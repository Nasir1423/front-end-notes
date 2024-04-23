/* 
    相对路径与绝对路径
        - 相对路径
            - 当前路径
                - ./xxx.txt 当前目录下的 xxx.txt 文件
                - xxx.txt 当前目录下的 xxx.txt 文件
            - 上一级路径
                - ../xxx.txt 当前目录下的上一级目录中的 xxx.txt 文件
        - 绝对路径
            - D:/xxx.txt windows 系统下的绝对路径，表示 D 盘根路径下的 xxx.txt 文件
            - /xxx.txt Linux 系统下的绝对路径，表示当前根目录下的 xxx.txt 文件
        - 相对路径的不稳定性：因为 fs 的相对路径中的当前目录，参考的不是文件所在的目录，而是命令行的工作目录，因此当命令行的工作目
        录 != 文件所在目录时，会因为路径不一而出现 bug
        - 解决相对路径的不稳定的两种策略（当前 demo 中使用策略 1 解决相对路径不稳定的问题）
            - 切换命令行的工作目录到文件所在目录，再执行代码，如
                cd ./CODES/ && node "d:\Nasir\FrontEnd\3-Node.js\CODES\17-fs-相对路径与绝对路径.js"
            - 通过 __dirname + 相对路径 = 绝对路径 的方式将相对路径修正为绝对路径，如
                __dirname + '../Node.js.md'

*/

const fs = require('fs');

// 1. 相对路径-1
// 相对路径的修正：cd ./CODES/ && node "d:\Nasir\FrontEnd\3-Node.js\CODES\17-fs-相对路径与绝对路径.js"
let data1;
fs.readFile('../Node.js.md', (err, data) => {
    if (err) {
        console.log("资源信息异步查看失败1");
        console.log(err.message);
        return;
    }
    console.log("资源信息异步查看成功1");
    data1 = data;
    console.log(data);
});

// 1. 相对路径-2
let data2;
fs.readFile('FSData/HelloWorld.txt', (err, data) => {
    if (err) {
        console.log("资源信息异步查看失败2");
        console.log(err.message);
        return;
    }
    console.log("资源信息异步查看成功2");
    data2 = data;
    console.log(data);
});

// 1. 相对路径-3
let data3;
fs.readFile('./FSData/HelloWorld.txt', (err, data) => {
    if (err) {
        console.log("资源信息异步查看失败3");
        console.log(err.message);
        return;
    }
    console.log("资源信息异步查看成功3");
    data3 = data;
    console.log(data);
});


// 2. 绝对路径-1
let data4;
fs.readFile('D:\\Nasir\\FrontEnd\\3-Node.js\\Node.js.md', (err, data) => {
    if (err) {
        console.log("资源信息异步查看失败4");
        console.log(err.message);
        return;
    }
    console.log("资源信息异步查看成功4");
    data3 = data4;
    console.log(data);
});

// 2. 绝对路径-2
let data5;
fs.readFile('\\Nasir\\FrontEnd\\3-Node.js\\Node.js.md', (err, data) => {
    if (err) {
        console.log("资源信息异步查看失败5");
        console.log(err.message);
        return;
    }
    console.log("资源信息异步查看成功5");
    data3 = data5;
    console.log(data);
});