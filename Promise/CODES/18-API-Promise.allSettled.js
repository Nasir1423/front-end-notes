/* 
    Promise.allSettled(promises)
    - 参数：Promise 对象数组
    - 返回：Promise 对象，该对象的状态永远不可能是失败（rejected），当 Promise 对象数组中的每一个 Promise 对象的异步操作都结束
    （不论成功还是失败），这个返回的 Promise 对象的状态变为成功（fulfilled），结果为 Promise 数组中每个 Promise 对象的状态和结果
    构成的对象构成构成的数组（如果数组元素 item.status === 'fulfilled'，此时需要通过 item.value 访问结果；item.status === 'rejected',
    此时需要通过 item.reason 访问结果）
*/

let p1, p2, p3, result;

p1 = new Promise((resolve, reject) => setTimeout(reject, 1000, 'ERROR'));
p2 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'OK'));
p3 = Promise.resolve(34);
result = Promise.allSettled([p1, p2, p3]);
getPromiseStatusAndResult(result).then(stateAndResult => {
    console.log('Promise State is ' + stateAndResult.state); // fulfilled
    console.log('Promise Result is ' + stateAndResult.result); // 见下边的数组
    // [
    //     { status: 'rejected', reason: 'ERROR' },
    //     { status: 'fulfilled', value: 'OK' },
    //     { status: 'fulfilled', value: 34 }
    // ]
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