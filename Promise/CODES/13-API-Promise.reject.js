/* 

    Promise.resolve(value)
    - 功能：将传入的参数转换为 Promise 对象，返回的 Promise 对象的状态始终为 rejected，结果为传入的参数

*/
let promise;

// 传入的参数是普通值/非 Promise 对象
// promise = Promise.reject(123);
// getPromiseStatusAndResult(promise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // rejected
//     console.log('Promise Result is ' + stateAndResult.result); // 123
// });
// 
// promise = Promise.reject();
// getPromiseStatusAndResult(promise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // rejected
//     console.log('Promise Result is ' + stateAndResult.result); // undefined
// });

// 传入的参数是 Promise 对象
// promise = Promise.reject(new Promise((resolve, reject) => {
//     resolve('OK');
// }));
// getPromiseStatusAndResult(promise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // rejected
//     console.log('Promise Result is ' + stateAndResult.result); // [object Promise]
// });

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