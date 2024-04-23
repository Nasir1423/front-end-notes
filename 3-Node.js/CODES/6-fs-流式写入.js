/* 
    流式写入
        1. 什么是流式写入？当我们创建写入流对象时，可以看作是开启了一个程序到磁盘之间的通道，我们可以通过这个通道随时向磁盘中写入数
        据，直到我们关闭该写入流对象。
        2. 创建写入流对象 fs.createWriteStream(file[, option])
            - 参数
                - file 文件路径
                - options 选项设置（可选）
            - 返回值
                - Object 文件流对象
        3. 关闭写入流对象（ws 表示一个写入流对象）ws.end([callback])
            - 参数
                - callback 回调函数，在调用 end 方法之后该回调函数立即执行
            - 注：虽然 end 是一个异步操作，但是其中的回调函数在调用 end 方法时立即执行，可以看作是一个同步操作
        3. 通过写入流对象写入内容：ws.write(data)
        4. 流式写入的优点：程序打开一个文件需要消耗资源，而流式写入可以减少打开关闭文件的次数，从而降低资源的消耗
            - 流式写入适用于大文件写入或频繁写入
            - writeFile/writeFileSync 则适用于写入频率较低的场景
*/

// 1. 导入 fs 对象
const fs = require('fs');

// 2. 创建流对象
const ws = fs.createWriteStream("./FSData/write-stream.txt");

// 3. 通过流写入
ws.write('半亩方塘一鉴开\r\n');
ws.write('天光云影共徘徊\r\n');
ws.write('问渠那得清如许\r\n');
ws.write('为有源头活水来\r\n');

// 3. 关闭流对象
ws.end(() => {
    console.log('关闭写入流');
})
