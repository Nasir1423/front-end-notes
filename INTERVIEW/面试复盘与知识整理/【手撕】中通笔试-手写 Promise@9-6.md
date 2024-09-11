# 中通笔试-手写 Promise@9-6

> Promise 实现规范：https://promisesaplus.com/
>
> 内容参考：https://juejin.cn/post/6850037281206566919#heading-0、https://github.com/Nasir1423/front-end-notes/blob/main/5-Promise/CODES/28-%E6%89%8B%E5%86%99Promise/class-version/Promise.js、https://promisesaplus.com/、`chatgpt`

## 1. 几个问题

1. Promise 支持在状态改变后立即执行对应的成功或失败回调，实现类似**发布订阅模式**的机制。
   - 当定义 Promise 的 `then` 方法时，若状态尚未改变，则将成功和失败回调函数注册到 `onResolvedCallbacks` 和 `onRejectedCallbacks` 属性中进行**依赖收集**。
   - 在 Promise 的构造函数中，通过 `resolve` 和 `reject` 方法实现状态改变，状态改变后触发所有已注册的回调，类似于**发布通知**并**执行收集的依赖**。
2. Promise 支持 `then` 方法的**链式调用与值的穿透**，其实现如下：
   - `then` 方法返回一个新的 Promise 对象：(1) 若当前 Promise 状态为 `resolved/rejected`，则根据 `onResolved/onRejected` 回调的执行结果确定返回的 Promise 状态；(2) 若当前 Promise 状态为 `pending`，则将处理逻辑封装为函数，注册到 `onResolvedCallbacks` 或 `onRejectedCallbacks` 中，等待状态改变后执行。
   - 每次 `then` 调用都会创建一个新的回调函数，这些回调函数与传入的 `onResolved` 和 `onRejected` 一一对应，形成闭包。闭包确保每个回调能够正确处理对应的 Promise 状态和返回值，确保链式调用的结果能够正确传递。

## 2. 代码实现

### 2.1 类型文件

```ts
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
```

### 2.2 MyPromise

```ts
class MyPromise {
    // 属性
    
    // 构造函数
    
    // 实例方法
    
    // 静态方法
}
```

#### 属性

```ts
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
```

#### 构造函数

```ts
constructor(executor: ExecutorType) {
  /**
   * (1) 用于改变 Promise 的状态，pending ==> resolved
   * (2) 同时检查是否已经注册了成功回调，是则执行
   * @param value 成功结果
   */
  const resolve: ResolveType = (value) => {
    if (this.state !== PromiseState.PENDING) return;
    this.state = PromiseState.RESOLVED;
    this.value = value;
    // 执行所有成功的回调，此时 then 返回的 Promise 的状态改变
    // 由于 promise 可以通过 then 绑定多个回调函数，因此不同的 cb 对应不同的 then 返回的 promise
    this.onResolvedCallbacks.forEach((cb) => cb());
  };

  /**
   * (1) 用于改变 Promise 的状态，pending ==> rejected
   * (2) 同时检查是否已经注册了失败回调，是则执行
   * @param reason 失败原因
   */
  const reject: RejectType = (reason) => {
    if (this.state !== PromiseState.PENDING) return;
    this.state = PromiseState.REJECTED;
    this.reason = reason;
    // 执行所有失败的回调，此时 then 返回的 Promise 的状态改变
    // 由于 promise 可以通过 then 绑定多个回调函数，因此不同的 cb 对应不同的 then 返回的 promise
    this.onRejectedCallbacks.forEach((cb) => cb());
  };

  // 立即同步执行 executor，捕获异常并拒绝 Promise
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
```

#### 实例方法

##### MyPromise.prototype.then ⭐

```ts
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
```

##### MyPromise.Prototype.catch

```ts
/**
 * 注册 Promise 的失败回调，用于处理 Promise 的 then 执行链上抛出的错误
 * @param onRejected 失败回调。
 */
public catch(onRejected: OnRejectedType): MyPromise {
  return this.then(undefined, onRejected);
}
```

##### MyPromise.prototype.finally

```ts
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
```

#### 静态方法

##### MyPromise.resolve

```ts
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
```

##### MyPromise.reject

```ts
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
```

##### MyPromise.all

```ts
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
```

##### MyPromise.race

```ts
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
```

## 3. 规范解读

### 3.1 术语 Terminology

- `promise`：有 `then` 方法的对象或函数，同时该 `then` 方法的行为符合 Promise/A+ 规范。
- `thenable`：有 `then` 方法的对象或函数。
- `value`：任何合法的 JavaScript 值，包括 `undefined`、`thenable`、`promise`。
- `exception`：通过 `throw` 语句抛出的值。
- `reason`：表示 `promise` 被为什么被拒绝的值。

### 3.2 要求 Terminology

#### promise 状态

一个 `promise` 的状态必须是 `pending`、`fulfilled`、`rejected` 这三种之一。

- 当 `promise` 的状态为 `pending` 时，其状态可以改变为 `fulfilled` 或 `rejected`。
- 当 `promise` 的状态为 `fulfilled` 时，其 ①状态无法再改变，②同时有一个无法再改变的 `value`。
- 当 `promise` 的状态为 `rejected` 时，其 ①状态无法再改变，②同时有一个无法再改变的 `reason`。

> 这里的 `value` 或 `reason` 的 “无法再改变” 是指引用上的改变，而不是深层的改变，即 deep immutability。

#### `then` 方法

一个 `promise` 通过 `then` 方法访问其**当前或最终**的 `value` 或 `reason`，该方法接收两个参数。`then` 方法的实现必须满足以下规则，

```js
promise.then(onFulfilled, onRejected)
```

1. `onFulfilled` 和 `onRejected` 都是可选参数

   - 如果 `onFulfilled` 不是函数，则其会被忽略
   - 如果 `onRejected` 不是函数，则其会被忽略

2. 如果 `onFulfilled` 是函数

   - 只有当 `promise` 的状态是 `fulfilled` 时，该函数才会被调用，同时 `promise` 的 `value` 作为该函数的第一个参数
   - 当 `promise` 的状态不是 `fulfilled` 时，该函数不会被调用
   - 该函数最多只会调用一次

3. 如果 `onRejected` 是函数

   - 只有当 `promise` 的状态是 `rejected` 时，该函数才会被调用，同时 `promise` 的 `reason` 作为该函数的第一个参数
   - 当 `promise` 的状态不是 `rejected` 时，该函数不会被调用
   - 该函数最多只会调用一次

4. 在调用 `onFulfilled` 或 `onRejected` 之前，必须确保当前的**执行上下文栈**为空

   > 该规则意味着：当 promise 状态改变后，`onFulfilled` 或 `onRejected` 不会立即执行，而是被放入任务队列，等待当前所有的 JavaScript 代码执行完毕后才会被调用。
   >
   > 该规则既可以通过**宏任务**（macro-task，包括 `setTimeout`、`setImmediate` 等 API）实现，也可以通过**微任务**（micro-task，包括 `MutationObserver`、`process.nextTick` 等 API）实现。

5. `onFulfilled` 或 `onRejected` 必须以函数的形式调用，同时确保不要在函数中使用 this

   > 该规则意味着：(1) `onFulfilled` 和 `onRejected` 是**纯函数**，以函数形式调用，而不依赖特定的对象上下文 (2) 如果函数作为**普通函数**调用（没有对象上下文），在严格模式下，`this` 指向 `undefined`；非严格模式下，`this` 指向**全局对象**（浏览器中的 window or Node.js 中的 global）。

6. `then` 方法可能会被同一个 `promise` 调用多次

   - 当 `promise` 的状态是 `fulfilled` 时，所有对应的 `onFulfilled` 回调函数将会按照其对应的 `then` 方法的调用顺序依次执行
   - 当 `promise` 的状态是 `rejected` 时，所有对应的 `onRejected` 回调函数将会按照其对应的 `then` 方法的调用顺序依次执行

7. `then` 方法必须返回一个 `promise`

   ```js
   promise2 = promise1.then(onFulfilled, onRejected);
   ```

   - 如果 `onFulfilled` 或 `onRejected` 返回一个值 `x`，则执行 **`promise` 解决程序**（The Promise Resolution Procedure）`[[Resolve]](promise2, x)`（这个解决程序中会检查多种情况，并将 `promise` 的状态变为 `fulfilled` 或 `rejected`）
   - 如果 `onFulfilled` 或 `onRejected` 抛出一个 `exception` `e`，`promise2` 必须以 `e` 为 `reason` 并使其状态为 `rejected`。
   - 如果 `onFulfilled` 不是一个函数，同时 `promise1` 的状态是 `fulfilled`，则 `promise2` 必须以 `promise1` 的 `value` 为 `value` 并使其状态为 `fulfilled`。
   - 如果 `onRejected` 不是一个函数，同时 `promise1` 的状态是 `rejected`，则 `promise2` 必须以 `promise1` 的 `reason` 为 `reason` 并使其状态为 `rejected`。

#### promise 解决程序

**promise 解决程序**（The Promise Resolution Procedure）是一个抽象操作，以一个 `promise` 和一个 `value` 作为输入，表示为 `[[Resolve]](promise, x)`。**promise 解决程序**的执行步骤如下，

> 这里的 `promise` 是 `then` 方法返回的 `promise`；`x` 是 `then` 方法的 `onFulfilled` 或 `onRejected` 回调的返回值。

1. 如果 `promise` 和 `x` 指向同一个对象，则以一个 `TypeError` 为 `reason` 使得 `promise` 的状态为 `rejected`

2. 如果 `x` 是一个 `promise`，则采用该 `promise`

   - 如果 `x` 的状态是 `pending`，则 `promise` 的状态也是 `pending`（直到 `x` 的状态为 `fulfilled` 或 `rejected`）。
   - 如果 `x` 的状态是 `fulfilled`，则使 `promise` 的状态为 `fulfilled`，同时以 `x` 的 `value` 为 `value`。
   - 如果 `x` 的状态是 `rejected`，则使 `promise` 的状态为 `rejected`，同时以 `x` 的 `reason` 为 `reason`。

3. 如果 `x` 是一个对象或函数，则执行以下步骤

   > 该规则实际上用于检查 `x` 是不是 `thenable` 对象，并对其进行处理

   - Step1. 令 `then = x.then`

     > 该步骤用于存储对 `x.then` 的引用，这样做是为了避免对 `x.then` 进行多次访问。在 JavaScript 中，`x.then` 可能是一个访问器属性（accessory property），多次访问可能会获取到不同的值，从而导致不一致的行为。因此，这样做保证了一致性。

   - Step2. 如果访问 `x.then` 导致抛出一个 `exception` `e`，则以 `e` 为 `reason` 使 `promise` 的状态变为 `rejected`。

   - Step3. 如果 `then` 是一个函数，则以 `x` 作为 `this` 调用 `then`，接收两个参数 `resolvePromise` 和 `rejectPromise`。

     - 如果以一个 `value` `y` 为参数调用 `resolvePromise`，则执行 `[[Resolve]](promise, y)`。

       > 这里的递归调用是为了**兼容 `thenable`**，确保其可以被正确处理。通过递归调用，不断解析，直到获得最终值或状态。
       >
       > 注意，如果 `thenable` 链是循环的，那么就会不断地调用同一个 `thenable`，永远无法获得最终的解析结果。因此可以检测这种情况，并以 `TypeError` 为 `reason` 使 `promise` 的状态为 `rejected`。但是并不强制这种检测，源于其不常见，且增加性能开销。

     - 如果以一个 `reason` `r` 为参数调用 `rejectPromise`，则以 `r` 为 `reason` 使 `promise` 的状态变为 `rejected`。

       > 拒绝的重点在于**传递错误**，而不是解析值。

     - 如果 `resolvePromise` 和 `rejectPromise` 被同时调用 or 多次调用，则以第一个调用为准，忽略剩下的。

     - 如果调用 `then` 方法抛出一个 `exception` `e`

       - 如果此时 `resolvePromise` 或 `rejectPromise` 已被调用，则忽略这个 `exception`
       - 否则，以 `e` 为 `reason` 使 `promise` 的状态为 `rejected`。

   - Step4. 如果 `then` 不是一个函数，则以 `x` 为 `value` 使得 `promise` 的状态为 `fulfilled`。

4. 如果 `x` 不是对象，也不是函数，则以 `x` 为 `value` 使得 `promise` 的状态为 `fulfilled`。