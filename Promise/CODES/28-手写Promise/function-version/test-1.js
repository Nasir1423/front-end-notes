/* 测试 then 方法、异步代码、then 方法返回值等 */
const Promise = require('./Promise');

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Not Right');
    }, 1000);
});

let result = promise.then(
    value => {
        console.log(`promise: {state: fulfilled, result: ${value}}`);
    },
    reason => {
        console.log(`promise: {state: rejected, result: ${reason}}`);
        throw('WORSE');
    }
);

result.then(
    value => {
        console.log(`result of then: {state: fulfilled, result: ${value}}`);
    },
    reason => {
        console.log(`result of then: {state: rejected, result: ${reason}}`);
    }
)
