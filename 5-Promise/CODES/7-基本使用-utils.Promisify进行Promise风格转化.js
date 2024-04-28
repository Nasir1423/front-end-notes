/* 
    util.promisify(original)
    - 解释：Takes a function following the common error-first callback style, i.e. taking a (err, value) => ... callback 
    as the last argument, and returns a version that returns promises.
        - 参数 original 需要是一个错误优先的回调风格的函数（即以回调 (err, value) => {} 作为最后一个参数）
        - 返回值则是一个返回 Promise 对象的函数
    - 注意
        - promisify 是 util 模块的一个方法，其中 util 是 Node.js 的内置模块，可以通过 require('util') 导入
        - promisify 方法的作用是返回一个新的函数，这个函数是 promise 风格的
*/

const util = require('util');
const fs = require('fs');

// 封装了 fs.readFile 的函数
// 该函数返回一个 Promise 对象，可以使用 then 方法对成功或失败进行处理
const ReadFile = util.promisify(fs.readFile);

ReadFile(__dirname + '\\resources\\宣州謝脁樓餞別校書叔雲.txt')
    .then(value => {
        console.log(value.toString());
    }, reason => {
        console.log(reason.message);
    })
