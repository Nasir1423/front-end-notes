/* 

    async 和 await 是 ES7 提出的基于 Promise 的异步解决终极方案

    1. async
        - async 是一个函数修饰符，被修饰的函数默认会返回一个 Promise 对象
        - async 修饰的函数返回的 Promise 对象的状态和结果由函数中通过 return 关键字返回的内容决定
            - return 非 Promise 对象 => 函数返回的 Promise 对象的状态为 fulfilled，结果为 return 的内容
            - return Promise 对象 => 函数返回的 Promise 对象的状态和结果和 return 的 Promise 相同
            - 函数体中报错（throw）=> 函数返回的 Promise 对象的状态为 rejected，结果为错误对象
    2. await
        - await 是一个修饰符，且只能在 async 修饰的函数中使用，可理解为等待
        - await 根据修饰的是否为 Promise 对象，返回不同的结果
            - 修饰的是 Promise 对象：如果 Promise 对象成功了，则返回成功的值（value）；失败则会抛出异常，需要通过 try-catch 捕获异常处理
            - 修饰的不是 Promise 对象：返回的就是这个值，一般不用，没什么意义
        - 注意事项
            - await 必须在 async 修饰的函数中使用，但，async 修饰的函数中可以不使用 await
            - await 修饰的 Promise 对象如果失败则会抛出异常，需要通过 try-catch 捕获处理
    3. async 和 await 作用的进一步讨论
        - 「async」关键字用于声明一个异步函数，这个函数会返回一个 Promise 对象。在函数中，可以使用「await」关键字来暂停函数执行，
        等待一个 Promise 对象 resolve 或 reject，然后再继续执行函数。
        - 如果在等待过程中发生错误，「await」关键字会抛出一个错误，我们可以使用 try...catch 块来捕获并处理这个错误。
        - 使用「async」和「await」可以使得异步代码更加易读和易于理解，也可以避免回调地狱的出现。

*/

// async 的使用
// async function main() {
//     console.log('Happy Birthday');
//     // 情况一：return 非 Promise 对象
//     // return 'have a good time';
//     // 情况二：return Promise 对象
//     // return Promise.reject('Not That Bad');
//     // 情况三：抛出异常
//     throw 'some error occurs';
// }

// main().then(value => {
//     console.log(`{PromiseState: fulfilled, PromiseResult: ${value}}`)
// }).catch(reason => {
//     console.log(`{PromiseState: rejected, PromiseResult: ${reason}}`)
// });

// await 的使用
async function main() {
    let a = await 1;
    let b = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('setTimeout');
        }, 2000);
    });
    let c = await function () {
        return 'function';
    }();
    console.log(a, b, c);
}
main(); // 1 setTimeout function