/* 

    改变 Promise 对象状态（PromiseState）的三种方式

    1. resolve(value)：pending => fulfilled
    2. reject(reason)：pending => rejected
    3. throw 异常对象：pending => rejected

*/

// 改变对象状态的三种方式
let p1, p2, p3;
p1 = new Promise((resolve, reject) => resolve('OK'));
p2 = new Promise((resolve, reject) => reject('ERROR'));
p3 = new Promise((resolve, reject) => { throw 'not right' });

p1.then(value => console.log(p1)).catch(reason => console.log(p1)); // Promise { 'OK' }
p2.then(value => console.log(p2)).catch(reason => console.log(p2)); // Promise { <rejected> 'ERROR' }
p3.then(value => console.log(p3)).catch(reason => console.log(p3)); // Promise { <rejected> 'not right' }