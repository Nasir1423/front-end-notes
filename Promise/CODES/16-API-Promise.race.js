/* 

    Promise.race(promises)
    - 参数：Promise 对象构成的数组
    - 返回：Promise 对象，其状态和结果由 Promise 数组中最先改变状态的 Promise 对象决定

*/

let p1, p2, p3, result;

p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 2000);
});
p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('ERROR');
    }, 1000);
});
p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('SUCCESS');
    }, 3000);
});
result = Promise.race([p1, p2, p3]);
getPromiseStatusAndResult(result).then(stateAndResult => {
    console.log('Promise State is ' + stateAndResult.state); // rejected
    console.log('Promise Result is ' + stateAndResult.result); // ERROR
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