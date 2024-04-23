/* 
    Node.js 提供了异步和同步的方式实现文件的删除，共四个方法

    - 异步方法
        - fs.unlink(path, err => {})
        - fs.rm(path, err => {})
    - 同步方法
        - fs.unlinkSync(path)
        - fs.rmSync(path)
    - 参数
        - path 文件路径
        - callback 回调函数，接收一个 err 参数，当成功删除文件时，err 为 null，失败则为错误对象
*/

const fs = require('fs');

try {
    fs.rmSync('./FSData/delete.txt');
    console.log('删除成功');
} catch (err) {
    console.log('删除失败，错误信息为');
    console.log(err);
}