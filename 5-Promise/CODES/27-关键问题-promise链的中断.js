/* 
    需求：当使用 promise 的 then 链式调用时，在中间中断，不再调用后面的回调函数
    方案：在回调函数中返回一个 pending 状态的 promise 对象，即 new Promise((resolve， reject) => {})
        - 因为 then 中回调函数执行的前提是，其对应 Promise 对象的状态必须是 fulfilled 或 rejected
*/
new Promise((resolve, reject) => {
    console.log(111);
    resolve('ok');
}).then(value => {
    console.log(222);
}).then(value => {
    throw 'err'
    return new Promise(() => { })
}).then(value => { // 这以后的 then 被中断，其中回调函数不会被执行
    console.log(444)
}, reason => { // 注意这个 catch 不会被中断
    console.error(reason);
});