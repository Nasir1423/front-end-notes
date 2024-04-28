/* 

    Promise.resolve(value)
    - 功能：将传入的参数转换为 Promise 对象
        - 如果传入的参数为非 Promise 对象，则返回的 Promise 对象的状态为 fulfilled，结果为参数值
        - 如果传入的参数为 Promise 对象，则返回的 Promise 对象的状态和结果与传入的 Promise 对象相同

*/
let promise;

// 传入的参数是普通值/非 Promise 对象
// promise = Promise.resolve(123);
// getPromiseStatusAndResult(promise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // fulfilled
//     console.log('Promise Result is ' + stateAndResult.result); // 123
// });
// 
// promise = Promise.resolve();
// getPromiseStatusAndResult(promise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // fulfilled
//     console.log('Promise Result is ' + stateAndResult.result); // undefined
// });

// 传入的参数是 Promise 对象
// promise = Promise.resolve(new Promise((resolve, reject) => {
//     resolve('OK');
// }));
// getPromiseStatusAndResult(promise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // fulfilled
//     console.log('Promise Result is ' + stateAndResult.result); // OK
// });

promise = Promise.resolve(new Promise((resolve, reject) => {
    reject('ERROR');
}));
getPromiseStatusAndResult(promise).then(stateAndResult => {
    console.log('Promise State is ' + stateAndResult.state); // rejected
    console.log('Promise Result is ' + stateAndResult.result); // ERROR
    console.log(promise);
});

// 工具函数：获取 Promise 对象的状态和结果
function getPromiseStatusAndResult(promise) {
    return new Promise((resolve, reject) => {
        // 添加状态监视器来获取 Promise 的状态和结果
        promise.then((result) => {
            resolve({
                state: "fulfilled",
                result: result
            });
        }).catch((error) => {
            resolve({
                state: "rejected",
                result: error
            });
        });
    });
}