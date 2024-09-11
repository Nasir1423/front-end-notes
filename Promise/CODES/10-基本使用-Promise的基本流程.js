/* 

    Promise 的基本流程如下

    1. new Promise()，此时状态为 pending
    2. 执行异步操作
        2.1 如果成功，执行 resolve(value)
        3.1 得到一个状态为 resolved 的 Promise 对象
        4.1 调用 then 方法，执行其中的回调函数 onResolved
        
        2.2 如果失败，执行 reject(reason)
        3.2 得到一个状态为 rejected 的 Promise 对象
        4.2 调用 then 方法，执行其中的回调函数 onRejected；也可以调用 catch 方法，执行其中的回调函数
    5. 得到一个新的 Promise 对象

*/