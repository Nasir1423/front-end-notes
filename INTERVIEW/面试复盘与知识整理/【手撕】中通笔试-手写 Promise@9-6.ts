/* Promise 的三种状态 */
enum PromiseState {
  PENDING = "pending",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

/* resolve、reject、executor 的类型定义 */
type ResolveType = (value: any) => void; // 将 Promise 状态由 pending 变为 resolved
type RejectType = (reason: any) => void; // 将 Promise 状态由 pending 变为 rejected
type ExecutorType = (resolve: ResolveType, reject: RejectType) => void; // 执行异步操作的函数

/* onResolved、onRejected 的类型定义 */
type OnResolvedType = (value: any) => any; // 成功时的回调
type OnRejectedType = (reason: any) => any; // 失败时的回调

class MyPromise {
  /* 实例属性 */
  // Promise 的状态
  private state: PromiseState = PromiseState.PENDING;
  // Promise 的成功结果
  private value: any = undefined;
  // Promise 的失败原因
  private reason: any = undefined;
  // Promise 的成功回调（封装好的，用于改变 then 返回的 Promise 对象的状态）**
  private onResolvedCallbacks: Array<() => void> = [];
  // Promise 的失败回调（封装好的，用于改变 then 返回的 Promise 对象的状态）**
  private onRejectedCallbacks: Array<() => void> = [];

  /* 构造函数 */
  constructor(executor: ExecutorType) {
    /**
     * - 改变 Promise 的状态，pending ==> resolved
     * - 检查是否已经注册了成功回调，是则执行
     * @param value 成功结果
     */
    const resolve: ResolveType = (value) => {
      if (this.state !== PromiseState.PENDING) return;
      this.state = PromiseState.RESOLVED;
      this.value = value;
      this.onResolvedCallbacks.forEach((cb) => cb());
    };

    /**
     * - 改变 Promise 的状态，pending ==> rejected
     * - 检查是否已经注册了失败回调，是则执行
     * @param reason 失败原因
     */
    const reject: RejectType = (reason) => {
      if (this.state !== PromiseState.PENDING) return;
      this.state = PromiseState.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((cb) => cb());
    };

    // 立即同步执行 executor，捕获异常并拒绝 Promise
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /* 实例方法 */
  /**
   * - 注册 Promise 成功和失败的回调（微任务）。
   * - 根据执行的成功或失败回调的返回值返回一个新的 Promise（以实现链式调用）。
   * - 这里以 queueMicroTask(cb) 的方式模拟微任务
   * @param onResolved 成功回调。可选。默认值为 v => v，表示传递原值。
   * @param onRejected 失败回调，可选。默认值为 e => {throw e}，表示抛出错误。
   */
  public then(
    onResolved: OnResolvedType = (v) => v,
    onRejected: OnRejectedType = (e) => {
      throw e;
    }
  ): MyPromise {
    const promise = new MyPromise((resolve, reject) => {
      /* 注意，这里可以访问到的内容有
        - onResolved 成功回调；
        - onRejected 失败回调
        - resolve 兑现 promise 为 resolved 的函数；
        - reject 兑现 promise 为 rejected 的函数 */

      /**
       * - 该函数根据 result 兑现 promise
       * - The Promise Resolution Procedure [[Resolve]](promise, result)
       * @param promise then 方法要返回的 promise
       * @param result onResolved 或 onRejected 的返回值
       */
      const resolveResolution = (promise: MyPromise, result: any) => {
        // Step1. 检查 promise 是否和 result 指向同一个对象
        if (promise === result)
          return reject(
            new TypeError("成功或失败回调的结果与要返回的 promise 指向相同")
          );
        // Step2. 检查 result 是否是一个 promise，是则采用该 promise
        if (result instanceof MyPromise) return result.then(resolve, reject);
        // Step3. 检查 result 是否是一个对象或函数
        // isThenableCBCalled.mark 用于确保，当 result 为 thenable 时，其对应的回调参数最多只能执行一次
        const isThenableCBCalled = { mark: false };
        if (
          (typeof result === "object" && result !== null) || // result 是对象（typeof null === 'object'，因此这里单独判断）
          typeof result === "function" // result 是函数
        ) {
          try {
            // 3.1 令 then = result.then
            const then = result.then;
            // 3.3 检查 then 是否是一个函数，是则以 result 为 this 调用 then，同时接收两个参数 resolvePromise 和 rejectPromise（言下之意 result 是 thenable）
            // call(thisArg, arg1, arg2, ...) ==> 以给定的 this 值和逐个提供的参数调用该函数。
            if (typeof then === "function") {
              then.call(
                result,
                // 3.3.1 如果以一个 value y 为参数调用 resolvePromise，则执行 [[Resolve]](promise, y)。
                (y: any) => {
                  // 3.3.3 如果 resolvePromise 和 rejectPromise 被同时调用 or 多次调用，则以第一个调用为准，忽略剩下的。
                  if (isThenableCBCalled.mark) return;
                  isThenableCBCalled.mark = true;
                  resolveResolution(promise, y);
                },
                // 3.3.2 如果以一个 reason r 为参数调用 rejectPromise，则以 r 为 reason 使 promise 的状态变为 rejected。
                (r: any) => {
                  // 3.3.3 如果 resolvePromise 和 rejectPromise 被同时调用 or 多次调用，则以第一个调用为准，忽略剩下的。
                  if (isThenableCBCalled.mark) return;
                  isThenableCBCalled.mark = true;
                  reject(r);
                }
              );
            } else {
              // 3.4 如果 then 不是一个函数，则以 result 为 value 使得 promise 的状态为 resolved。
              resolve(result);
            }
          } catch (error) {
            // 3.2 如果访问 result.then 导致抛出一个 exception e，则以 e 为 reason 使 promise 的状态变为 rejected
            // 3.3.4 如果调用 then 方法抛出一个 exception e
            // - 如果此时 resolvePromise 或 rejectPromise 已被调用，则忽略这个 exception
            // - 否则，以 e 为 reason 使 promise 的状态为 rejected。
            if (isThenableCBCalled.mark) return;
            isThenableCBCalled.mark = true;
            reject(error);
          }
        } else {
          // Step4. 如果 result 不是对象，也不是函数，则以 result 为 value 使得 promise 的状态为 resolved。
          resolve(result);
        }
      };

      /**
       * promise 状态为 resolved 时需要创建的微任务
       */
      const createResolvedMicroTask = () => {
        queueMicrotask(() => {
          try {
            const result = onResolved(this.value);
            resolveResolution(promise, result);
          } catch (error) {
            reject(error);
          }
        });
      };

      /**
       * promise 状态为 rejected 时需要创建的微任务
       */
      const createRejectedMicroTask = () => {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.reason);
            resolveResolution(promise, result);
          } catch (error) {
            reject(error);
          }
        });
      };

      // promise 状态为 resolved or rejected 时，直接创建相应的微任务
      if (this.state === PromiseState.RESOLVED) createResolvedMicroTask();
      if (this.state === PromiseState.REJECTED) createRejectedMicroTask();
      // promise 状态为 pending 时，将创建相应微任务的函数添加到 this 实例的 onResolvedCallbacks 和 onRejectedCallbacks 属性上
      if (this.state === PromiseState.PENDING) {
        this.onResolvedCallbacks.push(() => createResolvedMicroTask());
        this.onRejectedCallbacks.push(() => createRejectedMicroTask());
      }
    });

    return promise;
  }

  /**
   * 注册 Promise 的失败回调，用于处理 Promise 的 then 执行链上抛出的错误
   * @param onRejected 失败回调。
   */
  public catch(onRejected: OnRejectedType): MyPromise {
    return this.then(undefined, onRejected);
  }

  /**
   * 注册 Promise 的兑现回调
   * @param callback Promise 兑现时异步执行的函数，调用该函数时不带任何参数。
   */
  public finally(onFinally: () => void): MyPromise {
    /* 该函数的设计要点
      1. finally 不改变 Promise 的状态：无论 Promise 成功还是失败，onFinally 回调的执行都不应该影响原来的结果
      2. 链式调用继续传递：finally 必须返回一个新的 Promise，且它不会改变链上的状态
      3. onFinally 根据 onFinally 的返回值决定 finally 的返回值 */
    return this.then(
      (value) => {
        /* Promise 是成功，则 (1) 基于 onFinally 的返回值决定返回的 Promise (2) 继续传递 value */
        return MyPromise.resolve(onFinally()).then(
          /* 确保无论因为 onFinally 的返回值导致的 Promise.resolve 返回的 Promise 的状态如何，都要传递 value */
          () => value,
          () => value
        );
      },
      (reason) => {
        /* Promise 是失败，则 (1) 基于 onFinally 的返回值决定返回的 Promise (2) 继续抛出 reason */
        return MyPromise.resolve(onFinally()).then(
          /* 确保无论因为 onFinally 的返回值导致的 Promise.resolve 返回的 Promise 的状态如何，都要抛出 reason */
          () => {
            throw reason;
          },
          () => {
            throw reason;
          }
        );
      }
    );
  }

  /* 静态方法 */
  /**
   * - Promise.resolve 将给定的值解析为一个 Promise 对象。
   * - 如果给定值是非 Promise 值，则直接返回一个已成功的 Promise。
   * - 如果给定值是一个 Promise，则返回一个新的 Promise，其状态和结果取决于传入的 Promise。
   * @param value 要解析为 Promise 的值
   * @returns 返回解析后的 Promise
   */
  public static resolve(value: any): MyPromise {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise)
        // 如果 value 是 Promise，则返回一个新 Promise，其状态由 value 决定
        value.then(resolve, reject);
      else resolve(value); // 否则返回已成功的 Promise
    });
  }

  /**
   * Promise.reject 将给定的原因解析为一个失败的 Promise 对象
   * @param reason 要解析为 Promise 的原因
   * @returns 返回解析后的 Promise
   */
  public static reject(reason: any): MyPromise {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  /**
   * 当所有 Promise 都成功，则返回的 Promise 成功，结果为所有 Promise 的结果构成的数组
   * 当存在 Promise 失败，则返回的 Promise 失败，原因是第一个失败的 Promise 的原因
   * @param promises MyPromise 对象构成的数组
   * @returns 返回解析后的 Promise
   */
  public static all(promises: Array<MyPromise>): MyPromise {
    return new MyPromise((resolve, reject) => {
      let resolvedCount = 0;
      const resolvedValueArr: any[] = [];
      const length = promises.length;

      promises.forEach((promise) => {
        promise.then(
          (value) => {
            resolvedCount++;
            resolvedValueArr.push(value);
            if (resolvedCount === length) resolve(resolvedValueArr);
          },
          (reason) => reject(reason)
        );
      });
    });
  }

  /**
   * 返回的 Promise 的状态和结果/原因，以第一个兑现的 Promise 为准
   * @param promises MyPromise 对象构成的数组
   * @returns 返回解析后的 Promise
   */
  public static race(promises: Array<MyPromise>): MyPromise {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
}
