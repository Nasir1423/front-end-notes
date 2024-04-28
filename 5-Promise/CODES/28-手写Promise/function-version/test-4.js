/* 测试 then 方法中回调函数的异步执行 */
const Promise = require('./Promise');

let promise = new Promise((resolve, reject) => {
    resolve('OK');
    console.log(11111);
});

promise.then(value => { console.log('22222'); })

console.log(33333);

/* 
    控制台输出如下，说明 then 中回调函数的执行是异步的

        11111
        33333
        22222
*/