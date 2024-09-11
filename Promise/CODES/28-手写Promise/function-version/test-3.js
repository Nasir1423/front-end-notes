/* 测试 resolve、reject、all 等 */
const Promise = require('./Promise');

let promise;

promise = Promise.resolve(123);
console.log(promise);

promise = Promise.resolve(new Promise((resolve, reject) => { reject('ERROR') }));
console.log(promise);

promise = Promise.reject('HH');
console.log(promise);

let p1, p2, p3, result;
p1 = Promise.resolve('OK');
p2 = Promise.resolve('SUCCESS');
p3 = Promise.resolve('HA');
result = Promise.all([p1,p2,p3]);
console.log(result);

p1 = Promise.resolve('OK');
p2 = Promise.reject('ERROR');
p3 = Promise.resolve('HA');
result = Promise.all([p1,p2,p3]);
console.log(result);