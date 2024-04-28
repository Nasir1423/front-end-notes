/* 
    Promise 实例的两个属性

    - PromiseState 表示 Promise 对象的状态
        - 可取值
            - fulfilled 成功
            - rejected 失败
            - pending 初始化/未决定的
        - 状态改变
            - 创建 Promise 实例时，PromiseState 为 pending，当调用 resolve() 后，变为 fulfilled，当调用 reject() 后，变为 rejected
            - PromiseState 只能由 pending 变为 fulfilled 或由 pending 变为 rejected 这两种类型
            - 一个 Promise 对象的状态只能改变一次（pending => fulfilled/rejected）
        - 状态改变的结果数据：当 Promise 发生状态改变后，无论是成功还是失败，都会有一个结果数据
            - 一般而言，成功的结果数据称为 value，失败的结果数据称为 reason
            - 成功的结果数据通过 resolve 函数设置，失败的结果数据通过 reject 函数设置

    - PromiseResult 表示 Promise 对象的结果值
        - PromiseResult 保存着异步任务成功或失败的结果数据
        - PromiseResult 只能通过 resolve、reject 设置
    
    - 关于 PromiseState 和 PromiseResult 的进一步举例说明：当我们声明一个 Promise 对象后，executor 会立即执行，如果先调用了 
    resolve(msg)，此时 PromiseState 变更为 fulfilled，此时 PromiseResult 对应的就是成功的结果数据 value 为 msg 的内容；反之，
    如果先调用了 reject(msg)，此时 PromiseState 变更为 rejected，此时 PromiseResult 对应的就是失败的结果数据 reason 为 msg 的内容

    - 关于 resolve、reject 函数的进一步说明
        - resolve 函数
            - 修改 Promise 对象的状态（PromiseState）由 pending 为 fulfilled
            - 将实参设置为这个 Promise 对象的结果（PromiseResult）
        - reject 函数
            - 修改 Promise 对象的状态（PromiseState）由 pending 为 rejected
            - 将实参设置为这个 Promise 对象的结果（PromiseResult）

    - 注：PromiseState 和 PromiseResult 是不可访问的
*/

let promise = new Promise((resolve, _) => { // 此时 PromiseState 为 pending，PromiseResult 为 undefined
    setTimeout(() => {
        resolve('Happy Birthday'); // 此时 PromiseState 为 fulfilled，PromiseResult 为 Happy Birthday
    }, 1000);
});

promise.then(value => { // PromiseState 为 fulfilled 时调用，value 为 PromiseResult 的值
    console.log(value);
}, reason => {
    console.log(reason); // PromiseState 为 rejected 时调用，reason 为 PromiseResult 的值
})