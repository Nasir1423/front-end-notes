class Promise {
    constructor(executor) {

        this.PromiseState = 'pending';
        this.PromiseResult = null;
        this.callbacks = [];

        const self = this;

        function resolve(value) {
            if (self.PromiseState !== 'pending') return;
            self.PromiseState = 'fulfilled';
            self.PromiseResult = value;
            self.callbacks.forEach(item => item.onResolved());
        }

        function reject(reason) {
            if (self.PromiseState !== 'pending') return;
            self.PromiseState = 'rejected';
            self.PromiseResult = reason;
            self.callbacks.forEach(item => item.onRejected());
        }

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    static resolve(value) {
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
        });
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }

    static all(promises) {
        return new Promise((resolve, reject) => {
            let resolvedCounter = 0;
            let resolvedValues = new Array(promises.length);
            for (let i = 0; i < promises.length; i++) {
                promises[i]
                    .then(value => {
                        resolvedValues[i] = value;
                        resolvedCounter++;
                        if (resolvedCounter === promises.length) {
                            resolve(resolvedValues);
                        }
                    }).catch(reason => {
                        reject(reason);
                    });
            }
        });
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i]
                    .then(value => resolve(value))
                    .catch(reason => reject(reason));
            }
        });
    }

    then(onResolved, onRejected) {
        const self = this;

        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason;
            };
        }

        if (typeof onResolved !== 'function') {
            onResolved = value => value;
        }

        return new Promise((resolve, reject) => {
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
                        reject(e);
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
        });
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }
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