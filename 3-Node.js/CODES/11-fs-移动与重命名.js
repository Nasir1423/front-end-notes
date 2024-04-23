/* 
    Node.js 提供了异步和同步的方式实现文件或文件夹的移动或重命名

    - 异步方法：fs.rename(oldPath, newPath, err => {})
    - 同步方法：fs.renameSync(oldPath, newPath)
    - 参数
        - oldPath 文件或文件夹的当前路径
        - newPath 文件或文件夹的新的路径
        - callback 回调函数，接收一个 err 参数，当异步方法成功实现文件或文件夹的移动或重命名时，err 为 null，失败则为错误对象
    - 注
        - 两个路径要么都表示文件、要么都表示文件夹
        - 根据新路径和当前路径的不同，从而实现移动或重命名操作
*/

const fs = require('fs');

try {
    fs.renameSync('./FSData/hello.txt', './FSData/helloworld.txt');
    console.log('移动或重命名成功');
} catch (err) {
    console.log('移动或重命名失败');
    console.log(err);
    // throw err;
}

fs.rename('./FSData/helloworld.txt', './FSData/HelloWorld.txt', err => {
    if (err) {
        console.log('移动或重命名失败');
        console.log(err);
        // throw err;
    } else {
        console.log('移动或重命名成功');
    }
});