/* 

    - Promise 的 .then 方法返回一个新的 Promise 对象，因此 then 方法可以链式调用，如 p.then().then() 这样的形式
    - 我们可以通过 then 方法的链式调用串联多个同步/异步任务

*/

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});

promise.then(value => {
    console.log('第一个 then');
    console.log('value=' + value); // value=OK
    return new Promise((resolve, reject) => {
        resolve('success');
    });
}).then(value => {
    console.log('第二个 then');
    console.log('value=' + value); // value=success
}).then(value => {
    console.log('第三个 then');
    console.log('value=' + value); // value=undefined
}).then(value => {
    console.log('第四个 then');
    console.log('value=' + value); // value=undefined
})