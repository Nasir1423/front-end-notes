/* 

    当使用 promise 的 then 链式调用时，可以在最后通过 catch 指定失败的回调，前面任何操作出了异常，都会传到最后失败的回调中处理

*/

new Promise((resolve, reject) => {
    console.log(111);
    reject('error'); // 失败直接传递到最后的 catch 那里进行处理
}).then(value => {
    console.log(222);
}).then(value => {
    console.log(333);
}).then(value => {
    console.log(444);
}).catch(reason => {
    console.log(reason);
})