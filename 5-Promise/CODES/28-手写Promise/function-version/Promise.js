function Promise(executor) {

    /* 
        实例属性
        - PromiseState 表示实例状态，可取 pending(默认)、fulfilled、rejected
        - PromiseResult 表示实例结果，默认为 null
    */
    this.PromiseState = 'pending';
    this.PromiseResult = null;

    /* 
        回调函数数组
        - 该数组保存 then 方法传入的回调函数，数组中的每个元素为 {onResolved, onRejected} 形式的对象
        - 该属性的作用在于：1. 解决异步任务回调的执行 2. 实现多个回调函数的指定 3. 解决异步任务返回值的确定
        - 关于“解决异步回调的执行”的进一步讨论
            - 如果 executor 中的是同步执行的代码，则 then 方法调用的时候（fulfilled 或 rejected）直接执行相应的回调函数
            - 如果 executor 中的是异步执行的代码，则 then 方法调用的时候（pending）先将回调函数存储在 callbacks 中，当状态改变时再执行相应的回调函数
    */
    this.callbacks = [];

    /* 
        保存实例引用
        - resolve 和 reject 在 executor 中通过函数的方式调用，因此函数体中的 this 指向 window 或 globalThis，而不是实例
        - 我们可以在 resolve、reject 函数外边保存 this 的值，这里（外边）的 this 指向的是当前实例
        - 我们可以使用保存的实例引用，在 resolve、reject 函数中访问实例属性
    */
    const self = this;

    function resolve(value) {
        if (self.PromiseState !== 'pending') return; // 确保实例状态只能修改一次
        self.PromiseState = 'fulfilled';
        self.PromiseResult = value;
        self.callbacks.forEach(item => item.onResolved());
    }

    function reject(reason) {
        if (self.PromiseState !== 'pending') return; // 确保实例状态只能修改一次
        self.PromiseState = 'rejected';
        self.PromiseResult = reason;
        self.callbacks.forEach(item => item.onRejected());
    }

    try {
        executor(resolve, reject); // 立即同步执行
    } catch (error) { // 捕获 executor 中同步代码的异常（无法捕获 executor 中异步代码的异常）
        reject(error);
    }
}

// 添加实例方法
Promise.prototype.then = function (onResolved, onRejected) {
    /* 保存实例引用 */
    const self = this;

    /* 实现异常穿透 */
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason;
        }
    }

    /* 实现值传递 */
    if (typeof onResolved !== 'function') {
        onResolved = value => value;
    }

    /* 
        then 方法返回的 Promise 对象的三种情形
        - 对应的回调函数中抛出异常 => 返回状态为 rejected、结果为 error 的 Promise 对象（对于同步代码，不需要在 then 方法中实现，构造函数中已经实现）
        - 对应的回调函数的返回值为非 Promise 对象的任意值 => 返回状态为 fulfilled、结果为回调函数返回值的 Promise 对象
        - 对应的回调函数的返回值为 Promise 对象 => 返回与回调函数返回的 Promise 对象相同的 Promise 对象
    */
    return new Promise((resolve, reject) => {
        /* 封装了回调函数返回值设置 Promise 状态和结果的代码，参数 callback 可选 onResolved 和 onRejected */
        function generateStateResult(callback) {
            setTimeout(() => {
                try {
                    let result = callback(self.PromiseResult);
                    if (result instanceof Promise) {
                        result.then(
                            value => resolve(value),
                            reason => reject(reason)
                        );
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e)
                }
            });
        }

        switch (self.PromiseState) {
            case 'fulfilled':
                generateStateResult(onResolved);
                break;
            case 'rejected':
                generateStateResult(onRejected);
                break;
            case 'pending':
                self.callbacks.push({
                    onResolved: function () {
                        generateStateResult(onResolved);
                    },
                    onRejected: function () {
                        generateStateResult(onRejected);
                    }
                });
                break;
        }
    })
}

Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
}

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(
                resolvedValue => {
                    resolve(resolvedValue);
                }, rejectedReason => {
                    reject(rejectedReason);
                });
        } else {
            resolve(value);
        }
    })
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let resolvedCounter = 0; // 记录 promises 数组中状态为成功的 Promise 对象的数量
        let resolvedValues = new Array(promises.length); // 存储成功的 Promise 对象的结果
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then(value => {
                    /* 确保即使 promise 是异步解决的，返回的数组也会按照与输入数组相同的顺序包含所有解决值 */
                    resolvedValues[i] = value;
                    resolvedCounter++;
                    if (resolvedCounter === promises.length) {
                        resolve(resolvedValues);
                    }
                }).catch(reason => {
                    reject(reason);
                })
        }
    })
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i]
                .then(value => resolve(value))
                .catch(reason => reject(reason))
        }
    })
}

module.exports = Promise;

/* 
    讨论：闭包、then 方法返回的 Promise 对象、异步操作之间的关系
    - 闭包是 JavaScript 中一个非常重要的特性，它允许一个函数访问并操作它被创建时的作用域中的变量，即使这个函数在其外部作用域被调用。
    - 在 Promise 和 then 方法的上下文中，闭包使得我们能够引用并控制 then 方法返回的新 Promise 对象，哪怕是在异步操作完成后。
    - 当 then 方法在原始 Promise 对象上被调用时：
        * then 方法返回一个新的 Promise 对象，我们称之为 thenPromise。
        * 在 then 方法中，我们定义了 generateStateResult 函数，它接受一个回调函数（onResolved 或 onRejected）作为参数。
        * 这个 generateStateResult 函数是一个闭包，因为它可以访问 then 方法作用域中的变量，包括 thenPromise 的 resolve 和 reject 函数。
        * 如果原始 Promise 的状态是 pending，then 方法会将一个包含 onResolved 和 onRejected 回调函数的对象推入 self.callbacks 数组。这些回调函数在被推入数组时，被封装成新的函数，这些新的函数也是闭包，它们将调用 generateStateResult。
        * 这些封装后的函数保留了对 thenPromise 的 resolve 和 reject 函数的引用，因此当原始 Promise 最终被 resolve 或 reject 时，这些封装函数能够通过闭包调用 thenPromise 的 resolve 或 reject 函数。
        * 当原始 Promise 的异步操作完成，resolve 或 reject 被调用，就会触发 self.callbacks 数组中相应的闭包函数执行。这些闭包函数将会调用 generateStateResult，它又会调用 onResolved 或 onRejected，并根据它们的返回值来决定如何处理 thenPromise。
        * 如果 onResolved 或 onRejected 返回一个值，generateStateResult 会使用 thenPromise 的 resolve 函数来解析它。
        * 如果 onResolved 或 onRejected 返回另一个 Promise 对象，generateStateResult 会使用 then 来连接这个返回的 Promise，并将 thenPromise 的 resolve 和 reject 函数作为新的回调，这样 thenPromise 的最终状态和结果将由返回的 Promise 决定。
    - 通过闭包，then 方法中创建的函数能够记住并访问 thenPromise 的 resolve 和 reject 函数，这使得这些函数即使在原始 Promise 解析后也能改变 thenPromise 的状态和结果，从而实现链式调用。
*/