/* 
    Promise 对象通过自身的状态来控制异步操作，Promise 实例具有三种状态.
        - 异步操作未完成：pending
        - 异步操作成功：fulfilled
        - 异步操作失败：rejected
    
    这三种的状态的变化途径只有两种
        - 从 pending(未完成)到 fulfilled(成功)
        - 从 pending(未成功)到 rejected(失败)
    
    一旦状态发生变化，就凝固了，不会再有新的状态变化，这也是 Promise 这个名字的由来，它的英语意思"承诺"，一旦承诺生效，就不得再改变
    了，这也意味着 Promise 实例的状态变化只可能发生一次。在 Promise 对象的构造函数中，将一个函数作为第一个参数。而这个函数，就是用
    来处理 Promise 的状态变化。resolve 和 reject 都为一个函数，他们的作用分别是将状态修改为 resolved 和 rejected。因此，Promise
    的最终结果只有两种。 

    异步操作成功，Promise 实例传回一个值(value)，状态变为 fulfilled
    异步操作失败，Promise 实例抛出一个错误(error),状态变为 rejected
*/