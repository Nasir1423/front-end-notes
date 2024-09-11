/* 

    1. Promise 的构造函数
        - 语法：new Promise(executor){}
        - 参数
            - executor 函数，是一个执行器，结构为 (resolve, reject) => {}
            - resolve 函数，内部定义成功时我们调用的函数，结构为 value => {}
            - reject 函数，内部定义失败时我们调用的函数，结构为 reason => {}
        - 说明：executor 会在 Promise 内部立即同步调用，而异步操作在执行器中执行
    
    2. Promise.prototype.then 方法
        - 语法：.then((onResolved, onRejected) => {})
        - 参数
            - onResolved 函数，成功（Promise 对象状态为 fulfilled 时）的回调，结构为 value => {}
            - onRejected 函数，失败（Promise 对象状态为 rejected 时）的回调，结构为 reason => {}
        - 返回：一个新的 Promise 对象
        - 说明：如果调用 then 方法的 Promise 对象的状态为成功，则调用 onResolved，失败则调用 onRejected
        - 进一步讨论 then 方法返回的 Promise 对象的状态和结果？由 then 方法中指定的回调函数执行的结果决定
            - 如果回调函数中抛出异常，则返回的 Promise 对象 => 状态为 rejected，结果 reason 为抛出的异常
            - 如果回调函数返回非 Promise 的任意值 => 状态为 fulfilled，结果 value 为返回的值
            - 如果回调函数返回另一个新的 Promise 对象 => 状态和结果就是这个新的 Promise 对象的状态和结果
        - 注意：then 中指定的回调函数需要进队列中异步执行，可以使用定时器（setTimeout）包裹代码使其异步执行

    3. Promise.prototype.catch 方法
        - 语法：.catch(onRejected)
        - 参数：onRejected 函数，失败的回调，结构为 reason => {}
        - 说明：如果调用 catch 方法的 Promise 对象的状态为失败，则调用 onRejected
    
    4. then 和 catch 的搭配使用时，then 方法中可以只指定成功时的回调函数，此时 catch 方法可以用于指定失败的回调函数

    5. 异常/错误穿透
        - 当一个 Promise 对象被拒绝（rejected）时，如果没有在链式调用中的任何位置处理该拒绝，那么这个拒绝会一直向下传播，直到遇到
        一个 .catch() 方法或者一个 .then() 方法的第二个参数（错误处理函数）。
        - 当你有多个 .then() 方法用来处理 Promise 成功状态时，你可以只在整个链式调用的末尾添加一个 .catch() 方法来统一处理可能出
        现的拒绝。这样，如果在链式调用中的任何地方出现了拒绝，它会被传递到整个链的末尾的 .catch() 方法中进行处理，而不需要在每个 
        .then() 方法中都单独处理拒绝。
        
*/

/* 
    关于 then 方法返回的 Promise 对象的状态和结果的探讨
*/

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('OK');
    }, 1000);
});

let thenPromise;

// 1. 抛出异常
// thenPromise = promise
//     .then(value => {
//         throw 'error';
//     }, reason => {
//         console.log(reason);
//     });

// getPromiseStatusAndResult(thenPromise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // Promise State is rejected
//     console.log('Promise Result is ' + stateAndResult.result); // Promise Result is error
// });

// 2. 返回非 Promise 的任意值
// thenPromise = promise
//     .then(value => {
//         return 'All Right';
//     }, reason => {
//         console.log(reason);
//     });

// getPromiseStatusAndResult(thenPromise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // Promise State is fulfilled
//     console.log('Promise Result is ' + stateAndResult.result); // Promise Result is All Right
// });

// 3. 返回一个新的 Promise 对象
// thenPromise = promise
//     .then(value => {
//         return new Promise((resolve, reject) => {
//             reject('Not Ok');
//         });
//     }, reason => {
//         console.log(reason);
//     });

// getPromiseStatusAndResult(thenPromise).then(stateAndResult => {
//     console.log('Promise State is ' + stateAndResult.state); // Promise State is rejected
//     console.log('Promise Result is ' + stateAndResult.result); // Promise Result is Not Ok
// });

// 4. 默认情况（什么都不返回）
thenPromise = promise
    .then(value => {
        console.log(value);
    }, reason => {
        console.log(reason);
    });

getPromiseStatusAndResult(thenPromise).then(stateAndResult => {
    console.log('Promise State is ' + stateAndResult.state); // Promise State is fulfilled
    console.log('Promise Result is ' + stateAndResult.result); // Promise Result is undefined
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