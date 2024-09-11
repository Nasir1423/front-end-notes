# 面试题：说说你对 JS 中 this 指向的了解

JS 的代码执行环境分为**严格模式和非严格模式**，可以通过 `use strict` 打开严格模式，此时 JS 在语法检查上会更加严格。要讨论 JS 中的 this 指向问题，也要分为严格模式和非严格模式进行讨论。这里先讨论非严格模式下的 this 指向，然后再讨论严格模式下的不同之处，未谈到的地方默认与严格模式相同。

## 非严格模式下的 this 指向

1. **函数独立调用**：此时函数中的 `this` 指向全局对象（浏览器环境是 `window`，Node.js 环境是 `globalThis`）

2. **函数作为对象的方法调用**：此时函数中的 `this` 指向该对象。

3. **函数通过 `call`、`apply` 调用**：`call` 和 `apply` 方法可以用于直接调用函数，同时指定 `this` 和传入参数。

   > 如果 `call`、`apply` 传入的表示 `this` 的参数不是对象（原始值），其会被隐式转换为对应的包装对象。

   ```js
   const obj = new Object();
   fun_name.call(obj, param1, param2,...); // 调用 fun_name 函数，同时指定 this 为 obj，传入多个参数
   fun_name.call(obj, [parm1, param2, ...]); // 调用 fun_name 函数，同时指定 this 为 obj，传入一个数组参数
   ```

4. **调用经 `bind` 生成的函数**：`bind` 方法可以生成一个新的函数，同时指定新函数的 `this`。

   > 如果 `bind` 传入的表示 `this` 的参数不是对象（`null` 或 `undefined`），其会被隐式转换为全局对象 `window` 或 `globalThis`。

   ```js
   const obj = new Object();
   const new_fun = fun_name.bind(obj); // 生成一个新函数，同时指定新函数中的 this
   new_fun();
   ```

5. **调用 `new` 构造函数**：此时构造函数中的 `this` 指向创建的新对象。

6. **箭头函数调用**：箭头函数没有自己的 `this`，其使用 `this` 时会捕获其声明位置的上下文中的 `this`。

7. **时间处理函数调用**：此时函数中的 `this` 通常指向触发事件的 DOM 元素。

> 注意：这里的函数默认是非箭头函数。

## 严格模式下的 this 指向

1. **函数独立调用**： 此时 `this` 指向 `undefined`
2. **`call`、`apply`、`bind` 相关的函数调用**：如果 `call`、`apply`、`bind` 传入的表示 `this` 的参数不是对象（`null` 或 `undefined`），其会仍会保持为原始值。（该是啥就是啥）