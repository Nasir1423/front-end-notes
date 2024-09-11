/* 

    Promise.all(promises)
    - 参数：Promise 对象构成的数组
    - 返回：Promise 对象，其状态和结果由 Promise 数组中的 Promise 对象决定
        - 如果 Promise 数组中的每个 Promise 对象的状态都为 fulfilled，则
            - 返回的 Promise 对象的状态为 fulfilled
            - 返回的 Promise 对象的结果为 Promise 数组中每个 Promise 对象成功结果构成的数组
        - 如果 Promise 数组中至少一个 Promise 对象的状态为 rejected，则
            - 返回的 Promise 对象的状态为 rejected
            - 返回的 Promise 对象的结果为 Promise 数组中第一个失败的 Promise 对象的结果

*/

let p1, p2, p3, result;

// Promise 对象数组中的所有 Promise 对象状态都是成功
// p1 = new Promise((resolve, reject) => {
//     resolve('ok');
// })
// p2 = Promise.resolve('hello');
// p3 = Promise.resolve('oh yeah');
// result = Promise.all([p1, p2, p3])
// getPromiseStatusAndResult(result).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // fulfilled
//     console.log('Promise Result is ' + stateAndResult.result); // ok,hello,oh yeah
// });

// Promise 对象数组中的所有 Promise 对象状态都是成功
// p1 = new Promise((resolve, reject) => {
//     reject('ok');
// })
// p2 = Promise.resolve('hello');
// p3 = Promise.reject('oh yeah');
// result = Promise.all([p1, p2, p3])
// getPromiseStatusAndResult(result).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // rejected
//     console.log('Promise Result is ' + stateAndResult.result); // ok
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