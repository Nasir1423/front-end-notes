/* 
    Promise.Prototype.finally 方法
    - 语法：.finally(callback)
    - 参数：callback 回调函数，不接受任何参数
    - 说明：调用 finally 方法的 Promise 对象的结果无论如何（fulfilled/rejected），该函数最终都会被执行
*/
let promise = new Promise((resolve, reject) => {
    reject('ERROR');
});

promise
    .then(value => console.log(value))
    .catch(reason => console.log(reason))
    .finally(() => console.log('finally here'));