/* 
    文件复制
        - 思路一：整体读取、整体写入（通过同步/异步读取，同步/异步写入）
        - 思路二：部分读取、部分写入（通过读取流读取，写入流写入）
        - 思路三：建立两个流之间的管道（使用流对象的 pipe 方法）

    说明
        - 一般而言，思路二比思路一好，因为理想情况下，只需要 64KB 的内存空间，就可以完成大文件的读取和写入
        - 然而，因为文件的读取速度>写入速度，思路二实际使用的内存空间大于 64KB
        - 我们可以使用 process 模块查看不同思路对应的内存占用情况
            - 第一步：导入 process 模块
                const process = require('process');
            - 第二步：在文件复制结束后调用 process.memoryUsage() 方法并打印结果
            - 第三步：查看打印结果中的 rss 字段，单位是字节

*/

const fs = require('fs');
const process = require('process');

let method = 'third'; // method 可取 first、second、third 分别表示实现文件复制的三种方式

if (method === 'first') {
    let data;

    try {
        data = fs.readFileSync('./FSData/1316538.png');
        console.log("文件读取成功，开始写入");
    } catch (err) {
        console.log("文件读取失败，错误信息如下");
        console.log(err);
    }

    try {
        fs.writeFileSync('./FSData/1316538-method1.png', data);
        console.log("文件写入成功，完成复制");
    } catch (err) {
        console.log("文件写入失败，错误信息如下");
        console.log(err);
    }

    console.log("方法一的内存占用情况为 " + process.memoryUsage().rss / 1024 / 1024 + " MB"); // 46.24609375 MB

} else if (method === 'second') {
    // 创建读取流和写入流对象
    const readStream = fs.createReadStream('./FSData/1316538.png');
    const writeStream = fs.createWriteStream('./FSData/1316538-method2.png');

    // 读取数据并写入
    readStream.on('data', chunk => {
        writeStream.write(chunk);
    });

    // 关闭读取流和写入流
    readStream.on('end', () => {
        console.log("方法二的内存占用情况为 " + process.memoryUsage().rss / 1024 / 1024 + " MB"); // 42.390625 MB
        console.log("读取流已关闭");
        writeStream.end(() => { // 当读取流触发 end 事件（说明读取流读取结束）后，才允许关闭写入流（此时基于设计原因，也可以确保所有的数据都已经被写入流中）
            console.log("写入流已关闭");
        });
    });

    console.log("复制完成");


} else if (method === 'third') {
    // 创建读取流和写入流对象
    const readStream = fs.createReadStream('./FSData/1316538.png');
    const writeStream = fs.createWriteStream('./FSData/1316538-method3.png');

    //  建立两个流之间的管道
    readStream.pipe(writeStream);

    // 关闭读取流和写入流
    readStream.on('end', () => {
        console.log("方法三的内存占用情况为 " + process.memoryUsage().rss / 1024 / 1024 + " MB"); // 44.2109375 MB
        console.log("读取流已关闭");
        writeStream.end(() => { // 当读取流触发 end 事件（说明读取流读取结束）后，才允许关闭写入流（此时基于设计原因，也可以确保所有的数据都已经被写入流中）
            console.log('复制完成');
            console.log("写入流已关闭");
        });
    });
}
