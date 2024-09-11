# 面试题：谈谈你对 JS 原型链的理解

JavaScript 是一种**基于原型**的语言，即**每个对象都拥有一个原型对象**，对象通过其原型对象继承方法和属性。原型对象也有其原型对象，依次类推，就构成了**原型链**。当对象访问一个属性或方法后，首先需要在其本身上查找，查找不到才去其原型对象中查找，查找不到再去其原型对象的原型对象中查找，···，一直到顶层原型，即 Object 的原型对象身上去，Object 的原型对象的原型对象则为 null。这就是**原型链实现继承**的原理。

原型对象分为**显式原型对象**和**隐式原型对象**。**函数**的原型对象是显式原型对象，通过 `.prototype` 的方式可以访问到其原型对象。**实例对象**的原型对象是隐式原型对象，通过 `[[Prototype]]` 或 `.__proto__` 的方式可以访问到其原型对象。

> 这里的函数指的是**构造函数**，`class` 语法的类名也可以作为这里的函数看待；这里的**实例对象是由对应的函数通过 `new` 关键字创建的**，其原型对象是一个**私有属性**，`__proto__` 实际上是一个非标准的访问实例对象的原型对象的方式。

## 原型对象之间的重要关系

- **实例对象的原型指向其构造函数的原型**

  ```js
  f.__proto__ === Foo.prototype
  F.__proto__ === Function.prototype // 每个函数可以看作是 Function 函数的一个实例（区分）
  o.__proto__ === Object.prototype
  ```

- **构造函数的原型指向其继承的构造函数的原型**

  ```js
  f.__proto__.__proto__ === Foo.prototype.__proto__ === Object.prototype
  F.__prpto__.__proto__ === Function.prototype.__proto__ === Object.prototype
  o.__proto__.__proto__ === Object.prototype.__proto__ === null
  ```

- **构造函数的原型和自身形成循环引用**

  ```js
  Foo.prototype.constructor === Foo
  Function.prototype.constructor === Function
  Object.prototype.constructor === Object
  ```

- **Function 和 Object 之间形成循环引用**

  ```js
  Function.prototype.__proto__ === Object.prototype
  Object.__proto__ === Function.prototype
  ```

- $\Large{\bf{Attention}}$：如果将构造函数看作实例对象，其隐式原型对象为 `Function.prototype`。因此可以认为：**所有构造函数都是由 Function 创建的实例对象**。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/51ec2a694b5642c2a856a0c784b0aaf6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:50%;" />

## 获取原型对象的方式

- **获取显示原型对象**（函数的原型）：`function_name.prototype`
- **获取隐式原型对象**（实例对象的原型）：`Object.getPrototypeOf(obj_name)`

## 原型链检查

- 检查**构造函数的显式原型是否出现在某个实例对象的原型链**上，即**该实例对象是否可以通过原型对象，访问到该构造函数的显式原型**：`obj_name instanceof function_name`

  ```js
  Object instanceof Object
  Function instanceof Function
  Object instanceof Function // 所有函数的隐式原型都指向 Function
  Function instanceof Object // 所有函数的显式原型最终都指向 Object
  ```

## 创建对象的几种方式

- **字面量创建**

  ```js
  let o = {a: 1}; // o ---> Object.prototype ---> null
  var a = [1, 2, 3]; // a ---> Array.prototype ---> Object.prototype ---> null
  function f(){ // f ---> Function.prototype ---> Object.prototype ---> null
    return 2;
  }
  ```

-  **`new` 构造函数**

  ```js
  let o = new Object();
  /* 使用 new 关键字后 JS 做了什么？ */
  // 1. 创建一个空的简单 JS 对象 {}
  // 2. 为 Step1 创建的对象添加 __proto__ 属性，并将该属性链接到构造函数的原型对象上
  // 3. 指定 Step 创建的对象作为 this 上下文
  // 4. 返回 this（如果构造函数中没有指定返回值的话）
  ```

- **`Object.create(obj_name)` 创建一个对象，同时指定其原型对象为 `obj_name`**

  ```js
  var a = {a: 1}; // a ---> Object.prototype ---> null
  var b = Object.create(a); // b ---> a ---> Object.prototype ---> null
  var c = Object.create(b); // c ---> b ---> a ---> Object.prototype ---> null
  var d = Object.create(null); // d ---> null。
  ```

- **`class` 关键字创建类，然后通过 `new` 创建对象**

## 原型的好处和坏处

- **优点**
  - JS 对象可以通过原型链**继承**其他对象的属性和方法，**实现代码复用**。
  - JS 的原型链是**动态变化的**，可以在运行时修改对象的原型，此时所有继承该原型的对象都可以访问到这些改变。比如在构造函数的原型上添加新的方法，则此时所有实力对象都可以立即访问到增加的新方法。
  - 原型链机制**允许实例对象共享方法和属性**，因此可以**优化性能**。所有实例对象都可以共享其构造函数原型上的方法，从而有利于**减少内存占用**，
- **缺点**
  - JS 原型链上的**查找效率比较低下**，从而可能会**影响性能**。当试图访问不存在的属性时，JS 会遍历整个原型链，比较耗时。
  - 一旦修改了原型上的属性或方法，那么所有继承该原型的对象**都会受到影响**。
  - 如果对象本身存在与原型链中同名的属性，此时**对象自身的属性会遮蔽原型链上的同名属性**。

## 怎么把属性和方法放在原型或实例对象上

|            语法            |                        function 语法                         |                          class 语法                          |
| :------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **将属性放在实例对象身上** | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145524948.png" alt="image-20240604145524948" style="zoom:33%;" /> | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145700025.png" alt="image-20240604145700025" style="zoom:33%;" /> |
| **将方法放在实例对象身上** | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145546457.png" alt="image-20240604145546457" style="zoom:33%;" /> | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145716127.png" alt="image-20240604145716127" style="zoom:33%;" /> |
| **将属性放在原型对象身上** | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145630476.png" alt="image-20240604145630476" style="zoom:33%;" /> | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145803466.png" alt="image-20240604145803466" style="zoom:33%;" /> |
| **将方法放在原型对象身上** | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145616652.png" alt="image-20240604145616652" style="zoom:33%;" /> | <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240604145750198.png" alt="image-20240604145750198" style="zoom:33%;" /> |

## REFERENCES

https://juejin.cn/post/7139441807338766343

