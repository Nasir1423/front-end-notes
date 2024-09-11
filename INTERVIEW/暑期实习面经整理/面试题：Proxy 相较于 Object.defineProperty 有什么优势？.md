# 面试题：Proxy 相较于 Object.defineProperty 有什么优势？

## Object.defineProperty 详解

- **语法**：`Object.defineProperty(obj, prop, descriptor)`

- **功能**：在一个对象上**定义一个新属性**或**修改其现有属性**，并**返回此对象**。

- **参数**：

  - `obj` 要定义或修改属性的对象

  - `prop` 字符串或 Symbol，指定要定义或修改的**属性键**

  - `descriptor` 对象，指定要定义或修改的**属性的描述符**

    > 通过 `descriptor`，可以设置 `prop` 指定的属性值，`getter`、`setter` 等等特性。**默认情况下，`Object.defineProperty` 添加的属性是不可写、不可枚举和不可配置的**。

- **属性描述符（`descriptor`）的语法**：`descriptor` 有两种类型，**数据描述符和访问器描述符**，其只能是这两种类型之一。根据传入的属性描述符类型不同，给对象中定义或修改的属性的特性也将有所不同。因此，属性也可以分为**数据属性和访问器属性**。

  > 因为 `descriptor` 是一个对象，因此有一系列可选的配置项。有些配置项是数据描述符特有的，有些配置项是访问器描述符特有的，有些配置项则是二者共享使用的。**根据是否存在特有配置项，从而可以判断当前属性描述符的类型**。注意，**一个属性描述符中不能同时拥有两种类型的特有配置项**。

  |     适用情况      |      配置      |           取值           |                             描述                             |   默认值    |
  | :---------------: | :------------: | :----------------------: | :----------------------------------------------------------: | :---------: |
  | 数据/访问器描述符 | `configurable` |       `true/false`       | 该配置取值为 `false` 时，<br />①属性**类型不可更改**（数据属性、访问器属性） <br />②属性**不可被删除** <br />③ 属性**描述符的配置项不可更改**（特例，对于可写的数据属性，可以修改其数据描述符的 `value` 和 `writable`）<br />否则：`TypeError` |   `false`   |
  | 数据/访问器描述符 |  `enumerable`  |       `true/false`       | 该配置取值为 `true` 时，属性**可以在对象的属性枚举中出现**。（如 `for...in`，`Object.keys()` 等） |   `false`   |
  |    数据描述符     |    `value`     | 任何有效的 JavaScript 值 |                        数据**属性值**                        | `undefined` |
  |    数据描述符     |   `writable`   |       `true/false`       | 该配置取值为 `true` 时，属性**可写**（即可以使用赋值运算符 `=` 更改属性值） |   `false`   |
  |   访问器描述符    |     `get`      |    属性 `getter` 函数    | 当**访问**属性时，会**不带参调用该函数，返回值被作为该属性的值**。 | `undefined` |
  |   访问器描述符    |     `set`      |    属性 `setter` 函数    | 当给属性**赋值**时，会**调用该函数，并携带一个参数（表示要赋给属性的值）**。 | `undefined` |

  > 注意事项：
  >
  > - `get`、`set` 配置项对应的函数中的 **`this` 不一定是属性所在对象**，而是**通过该属性访问的对象**（由于继承关系的存在，当子对象访问父对象的 `getter`、`setter` 函数时，其中 `this` 指向子对象）。
  >
  >   ```js
  >   let parent = Object.defineProperty({}, "self", {
  >       get() {
  >           return this;
  >       }
  >   });
  >   
  >   let child = Object.create(parent);
  >   
  >   console.log(child.self === child); // true
  >   console.log(child.self === parent); // false
  >   console.log(parent.self === child); // false
  >   console.log(parent.self === parent); // true
  >   ```
  >
  > - 如果属性描述符**没有包含任何特有配置项**（`value`、`writable`、`get`、`set`），此时该属性描述符被视作**数据描述符**。
  >
  > - 如果属性描述符**同时包含两种类型的特有配置项，则会抛出异常**。
  >
  > - 因为判断属性描述符是数据描述符还是访问器描述符时，常需要参考其中的属性，但是**属性描述符其原型上的属性也会被考虑在内**，这有可能会带来潜在问题，有以下两种解决方式。
  >
  >   - **方式一**：创建一个原型为 `null` 的属性描述符 `const descriptor = Object.create(null);` 
  >
  >   - **方式二**：冻结 Object 原型对象 `(Object.freeze || Object)(Object.prototype);`
  >
  >     > `Object.freeze` 方法用于冻结一个对象，从而 ①不能向对象中添加新属性 ②不能删除对象中已有属性 ③不能修改对象中已有属性 ④ 不可有改对象的原型

## Proxy 详解

- **语法**：`const p = new Proxy(target, handler)`

- **功能**：用于创建一个**对象的代理**，从而实现**拦截或自定义**对象的**基本操作**（属性查找、赋值、枚举、函数调用等等）。

- **参数**

  - `target`：**被代理的对象**，可以是任何类型的对象（包含原生数组、函数、甚至代理）。
  - `handler`：**对象**，其中的**属性通常是函数**，用于自定义代理 `p` 的**各种操作所对应的具体的执行逻辑**。

- **处理器对象（`handler`）的语法**：`handler` 中定义了一批特定属性，取值通常为函数，称之为**捕获器**（`trap`）。

  |            配置项             |                             描述                             |                           触发条件                           |
  | :---------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
  |      `getPrototypeOf()`       | `Object.getPrototypeOf()` 方法的捕捉器。当**读取代理对象的原型**时，该方法调用。如果该方法返回的不是对象也不是 `null`，则会报错 `TypeError`。 | [`handler.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf) |
  |      `setPrototypeOf()`       | `Object.setPrototypeOf()` 方法的捕捉器。成功修改原型则返回 `true`，否则 `false`。 | [`handler.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf) |
  |       `isExtensible()`        |            `Object.isExtensible()` 方法的捕捉器。            | [`handler.isExtensible()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible) |
  |    ` preventExtensions()`     |         ` Object.preventExtensions()` 方法的捕捉器。         | [`handler.preventExtensions()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions) |
  | ` getOwnPropertyDescriptor()` |      `Object.getOwnPropertyDescriptor()` 方法的捕捉器。      | [`handler.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor) |
  |      `defineProperty()`       |           `Object.defineProperty()`方法的捕捉器。            | [`handler.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty) |
  |            `has()`            |                    `in` 操作符的捕捉器。                     | [`handler.has()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has) |
  |            `get()`            |                  属性**读取**操作的捕捉器。                  | [`handler.get()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get) |
  |            `set()`            |                  属性**设置**操作的捕捉器。                  | [`handler.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set) |
  |      `deleteProperty()`       |                   delete 操作符的捕捉器。                    | [`handler.deleteProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty) |
  |          `ownKeys()`          | `Object.getOwnPropertyNames()` 方法和 `Object.getOwnPropertySymbols()` 方法的捕捉器。 | [`handler.ownKeys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys) |
  |           `apply()`           |                    函数调用操作的捕捉器。                    | [`handler.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply) |
  |         `construct()`         |                     new 操作符的捕捉器。                     | [`handler.construct()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct) |

## Proxy 相较于 Object.defineProperty 的优势

通过上边的介绍，可以看出 Proxy 有以下几点优势

- **拦截范围更广**：`Proxy` 支持属性访问、修改、删除、枚举、原型操作、对象构造、方法调用、属性存在性检测、获取属性描述符、定义属性、`in` 操作符等的拦截。而 `Object.defineProperty` 只能拦截属性访问、修改。
- **拦截实现更简单**：`Proxy` 可以直接拦截整个对象。而  `Object.defineProperty` 只能对单个属性进行拦截，如果要拦截整个对象，则需要在对象上逐个进行属性拦截。
- **可撤销的拦截**：`Proxy.revocable()` 方法可以创建一个可撤销的代理对象。而  `Object.defineProperty` 一旦对属性进行了定义，就无法撤销。
- **支持对数组的全方位拦截**：`Proxy` 的 `set` 捕获器可以**捕捉数组的任何操作**，包含**通过索引修改数组元素，通过数组方法修改数组元素，以及数组长度的变化**。但是 `Object.defineProperty` 则无法实现。

## REFERENCES

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

https://juejin.cn/post/7275551128854560779