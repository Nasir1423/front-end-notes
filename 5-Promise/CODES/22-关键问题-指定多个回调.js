/* 

    问题：一个 promise 指定多个成功/失败回调函数，都会调用吗？

    答：会，但是前提是当 promise 对象的状态改变(fulfilled/rejected)时才会调用

*/

// Promise 绑定多个回调函数都会执行
let promise;
promise = new Promise((resolve, reject) => resolve('RIGHT'));
promise.then(value => console.log(promise)); // Promise { 'RIGHT' }
promise.then(value => console.log(value)); // RIGHT