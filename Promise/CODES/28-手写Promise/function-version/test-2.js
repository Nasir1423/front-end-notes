/* 测试异常穿透、值传递等 */
const Promise = require('./Promise');

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('OK');
        reject('Not Right');
    }, 1000);
});

promise.then(
    value => {
        console.log(`promise: {state: fulfilled, result: ${value}}`);
    }
).then(
    value => {
        console.log(`thenPromise-1: {state: fulfilled, result: ${value}}`);
    }
).then(
    value => {
        console.log(`thenPromise-2: {state: fulfilled, result: ${value}}`);
    }
).then(
    value => {
        console.log(`thenPromise-3: {state: fulfilled, result: ${value}}`);
    }
).catch(
    reason => {
        console.log(`reason is ${reason}`);
    }
)