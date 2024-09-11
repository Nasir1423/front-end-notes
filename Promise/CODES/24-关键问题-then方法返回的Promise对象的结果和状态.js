/* 

    简单表达：由 then 指定的回调函数执行的结果决定
    详细表达：
        - 如果抛出异常：新 promise 对象状态变成 rejected，reason 为抛出的异常
        - 如果返回的是是非 promise 的任意值：新 promise 对象状态变成 fulfilled，value 为返回的值
        - 如果返回的是另一个新的 promise 对象：此 promise 的结果就会成为新 promise 的结果

*/