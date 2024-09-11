/* 

    Promise.any(promises)
    - 参数：Promise 对象数组
    - 返回：Promise 对象
        - 只要 Promise 对象数组中任何一个 Promise 对象的状态变为成功（fulfilled），返回的 Promise 对象的状态为成功，并且结果为
        Promise 对象数组中第一个状态变为成功的 Promise 对象的结果（value）
        - 如果 Promise 对象数组中所有的 Promise 对象的状态都变为失败（rejected），返回的 Promise 对象的状态变为失败，并且结果为
        一个 AggregateError 实例，其中包含了 Promise 对象数组中所有失败的 Promise 对象的结果（reason）

*/

let promise1, promise2, promise3;

// promise1 = new Promise((resolve, reject) => setTimeout(reject, 1000, 'First'));
// promise2 = new Promise((resolve, reject) => setTimeout(reject, 2000, 'Second'));
// promise3 = new Promise((resolve, reject) => setTimeout(reject, 3000, 'Third'));

// Promise.any([promise1, promise2, promise3])
//     .then((value) => {
//         console.log(value); // 输出第一个解决的 Promise 的解决值
//     })
//     .catch((error) => {
//         console.error(error); // 在所有 Promise 都被拒绝时输出 AggregateError 实例
//         // [AggregateError: All promises were rejected] {
//         //     [errors]: ['First', 'Second', 'Third']
//         // }
//     });

// promise1 = new Promise((resolve, reject) => setTimeout(reject, 1000, 'First'));
// promise2 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Second'));
// promise3 = new Promise((resolve, reject) => setTimeout(reject, 3000, 'Third'));

// Promise.any([promise1, promise2, promise3])
//     .then((value) => {
//         console.log(value); // 输出第一个解决的 Promise 的解决值
//         // Second
//     })
//     .catch((error) => {
//         console.error(error); // 在所有 Promise 都被拒绝时输出 AggregateError 实例
//     });
