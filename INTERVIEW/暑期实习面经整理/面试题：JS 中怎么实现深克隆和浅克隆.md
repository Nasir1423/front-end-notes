# 面试题：JS 中怎么实现深克隆和浅克隆

## 一、深克隆和浅克隆

### 1. 克隆的研究对象

克隆（拷贝）就是创建一份**数据的副本**，其分为**深克隆和浅克隆**两种实现方式。对于原始类型的值而言，深克隆和浅克隆没有任何区别，因此我们**关于克隆的研究对象是对象类型**。

### 2. 两种克隆的区别

- **深克隆**：深克隆会对原始对象进行**无限层级**的复制，会**递归**地复制原始对象中的所有属性，从而创建一个**独立于原始对象的全新副本**。修改深克隆后的对象中的数据，**不会影响**到原始对象。
- **浅克隆**：浅克隆会对原始对象进行**一层**复制，会复制原始对象中的所有属性，但**对于嵌套对象或数组，只会复制引用**。修改浅克隆后的对象中的数据，**会影响**到原始对象。

> 注意：直接将对象赋值给一个变量不算浅拷贝。浅拷贝的结果和原数据至少在 `===` 的判断下是 `false`！

## 二、浅克隆的实现方式

### 1. Object.assign（对象）

- **语法**：`Object.assign(target, source1, source2, ...)`

  - **功能**：将一个或多个源对象（`source`）的**可枚举属性**复制到目标对象（`target`）。
  - **参数**
    - `target` 目标对象，用于接收源对象的属性。
    - `source` 源对象，其属性会被复制到目标对象。
  - **返回值**：目标对象（`target`），其包含了源对象中的所有属性。
  - **注意事项**
    - 对于目标对象中的**嵌套对象或数组**属性，`Object.assign` 方法只会复制它们的引用，而不会创建全新副本。因此**如果修改嵌套对象或数组中的内容，目标对象和源对象都会受到影响**。
    - 如果 `target`、`source1`、`source2`、`...` 中存在同名属性，则以后边对象的属性值为准，这称之为**属性覆盖**。

- **浅克隆的实现**：`const target = Object.assign({}, source);`

  ```js
  const source = {
      name: "chuanyitu",
      gender: "male",
      info: {
          country: "China",
          position: "North"
      }
  }
  
  const target = Object.assign({}, source); // 实现了浅拷贝
  
  console.log(source === target); // false
  console.log(source.info === target.info); // true 说明只复制了引用
  ```

### 2. array.slice（数组）

- **语法**：`array.slice([begin[, end]])`

  - **功能**：提取数组的一部分（`[begin, end)`），作为一个新数组返回。
  - **参数**
    - `begin`：提取元素的开始索引（包括该索引对应元素）。如果省略该参数，则默认从索引 `0` 开始。如果该参数为负数，则表示从数组末尾相应位置开始。
    - `end`：提取元素的结束位置（不包括对应元素）。如果省略该参数，则默认一直提取到数组最后一个元素。如果该参数为负数，则表示从数组末尾相应位置结束。
  - **返回值**：一个新的数组，包含 `[begin, end)` 的数组元素。
  - **注意事项**：对于数组中的**对象或数组**类型的元素，`.slice` 方法只会复制它们的引用，而不会创建全新副本。

- **浅克隆的实现**：`const target = source.slice();`

  ```js
  const source = ["chuanyitu", "male", { country: "China", position: "North" }];
  
  const target = source.slice(); // 实现了浅拷贝
  
  console.log(source ===  target); // false
  console.log(source[2] === target[2]); // true 说明只复制了引用
  ```

### 3. array.concat（数组）

- **语法**：`array.concat(source1[, source2[, source3[, ...]]])`

  - **功能**：将一个或多个数组或元素和当前数组合并，作为一个新数组返回。原数组不会受到影响。
  - **参数**：`source` 如果该参数是一个元素，则将其添加到新数组中。如果该参数是一个数组，则将其中的元素提取出来，添加到新数组中。
  - **返回值**：一个新的数组，包含 `array` 中的所有元素，以及 `source` 中的元素（作为元素添加其本身，作为数组添加其中的元素）。
  - **注意事项**：对于数组中的**对象或数组**类型的元素，`.concat` 方法只会复制它们的引用，而不会创建全新副本。

- **浅克隆的实现**：`const target = [].concat(source); `

  ```js
  const source = ["chuanyitu", "male", { country: "China", position: "North" }];
  
  const target = [].concat(source); // 实现了浅拷贝
  
  console.log(source ===  target); // false
  console.log(source[2] === target[2]); // true 说明只复制了引用
  ```

### 4. Array.from（数组）

- **语法**：`Array.from(arrayLike/iterableObjects[, mapFn[, thisArg]])`

  - **功能**：基于**类数组对象或可迭代对象**创建一个数组。
    - 类数组对象：具有 `length` 属性和索引元素的对象，如 `String`、`arguments` 等。
    - 可迭代对象：如 `Set`、`Map` 等。
  - **参数**
    - `arrayLike/iterableObjects`：类数组或可迭代对象。
    - `mapFn`：映射函数，用于对每个元素进行处理，生成新的数组元素。
    - `thisArg`：表示 `mapFn` 函数中 `this` 指向。
  - **返回值**：由类数组对象或可迭代对象创建的新的数组对象。
  - **注意事项**：对于对象中的**嵌套对象或数组**，`Array.from` 方法只会复制它们的引用，而不会创建全新副本。

- **浅克隆的实现**：`const target = Array.from(source);`

  ```js
  const source = ["chuanyitu", "male", { country: "China", position: "North" }];
  
  const target = Array.from(source); // 实现了浅拷贝
  
  console.log(source ===  target); // false
  console.log(source[2] === target[2]); // true 说明只复制了引用
  ```

### 5. 展开运算符（对象或数组）

- 我们也可以使用展开运算符实现浅克隆，而且**对数组和对象都生效**！！！

  > `Object.assign` 对象生效
  >
  > `array.slice`、`array.concat`、`Array.from` 数组生效

- **浅克隆的实现（对象）**：`const target = {...source};`

  ```js
  const source = {
      name: "chuanyitu",
      gender: "male",
      info: {
          country: "China",
          position: "North"
      }
  }
  
  const target = {...source}; // 实现了浅拷贝
  
  console.log(source === target); // false
  console.log(source.info === target.info); // true 说明只复制了引用
  ```

- **浅克隆的实现（数组）**：`const target = [...source];`

  ```js
  const source = ["chuanyitu", "male", { country: "China", position: "North" }];
  
  const target = [...source]; // 实现了浅拷贝
  
  console.log(source === target); // false
  console.log(source[2] === target[2]); // true 说明只复制了引用
  ```

## 三、深克隆的实现方式

### 0. 深克隆要考虑的逻辑细节

- **对于原始类型** => 直接返回

- **对于循环引用** => 使用 Map 或 WeakMap 记录已经处理过的对象，避免无限递归（建议使用 WeakMap，建立弱引用关系）

- **对于函数** => 直接返回

- **对于 Date 对象** => 使用 Date 构造函数重新创建一个日期对象

- **对于 RegExp 对象** => 使用 RegExp 构造函数重新创建一个正则对象

- **对于 Array 对象** => 递归克隆

- **对于 Map 对象** => 递归克隆

- **对于 Set 对象** => 递归克隆

- **对于一般对象** => 递归克隆

- **对于对象或数组** => 递归克隆

  - **Symbol 作为键名的处理方式** => 使用 Reflect.ownKeys()

    > `Reflect.ownKeys()` 可以获取对象的所有属性（可枚举、不可枚举、符号属性）
    >
    > `Object.keys()` 只能获取对象的可枚举属性

- **对于 DOM 元素** => 直接返回

### 1. JSON.stringify & JSON.parse

- **深克隆的实现**

  ```js
  const source = {
      name: "chuanyitu",
      gender: "male",
      info: {
          country: "China",
          position: "North"
      }
  }
  
  const target = JSON.parse(JSON.stringify(source)); // 实现了深克隆
  
  console.log(source === target); // false
  console.log(source.info === target.info); // false 说明实现了深克隆
  ```

- **存在的问题**

  - 序列化会**自动忽略 `undefined`、`Symbol`、函数**

    ```js
    const source = {
        a: undefined,
        b: Symbol(),
        c: () => { }
    }
    
    const target = JSON.parse(JSON.stringify(source));
    
    console.log(source === target); // false
    console.log(source); // { a: undefined, b: Symbol(), c: [Function: c] }
    console.log(target); // {}
    ```

  - 序列化会**将 `NaN`、`Infinity`、`-Infinity` 转换为 `null`**

    ```js
    const source = {
        a: NaN,
        b: Infinity,
        c: -Infinity
    }
    
    const target = JSON.parse(JSON.stringify(source));
    
    console.log(source === target); // false
    console.log(source); // { a: NaN, b: Infinity, c: -Infinity }
    console.log(target); // { a: null, b: null, c: null }
    ```

  - **无法解决循环引用的问题**

    ```js
    const student = {
        name:"chuanyitu",
    }
    
    const school = {
        title:"XDU",
    }
    
    student.school = school;
    school.student = student;
    
    const studentCopy = JSON.parse(JSON.stringify(student));
    /* TypeError: Converting circular structure to JSON */
    ```

### 2. 手写一个深克隆

#### 2.1 原始类型逻辑

```js
if (source === null || typeof source !== 'object') {
    return source;
}
```

#### 2.2 DOM 元素逻辑

```js
if (source instanceof Node) {
    return source;
}
```

#### 2.3 循环引用逻辑

```js
if (hash.get(source)) {
    return hash.get(source);
}
```

#### 2.4 Date 对象逻辑

```js
if (source instanceof Date) {
    return new Date(source);
}
```

#### 2.5 RegExp 对象逻辑

```js
if (source instanceof RegExp) {
    return new RegExp(source);
}
```

#### 2.6 Function 对象逻辑

```js
if (source instanceof Function) {
    return source;
}
```

#### 2.7 Map 对象逻辑

```js
if (source instanceof Map) {
    const clonedMap = new Map();
    source.forEach((value, key) => {
        clonedMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    hash.set(source, clonedMap);
    return clonedMap;
}
```

#### 2.8 Set 对象逻辑

```js
if (source instanceof Set) {
    const clonedSet = new Set();
    source.forEach(value => {
        clonedSet.add(deepClone(value, hash));
    });
    hash.set(source, clonedSet);
    return clonedSet;
}
```

#### 2.9 一般对象逻辑

```js
/* source 是一般对象或数组 */
const clonedSource = new source.constructor(); // 创建一个新的对象或数组
// Reflect.ownKeys(obj) 相当于 Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(target))
Reflect.ownKeys(source).forEach(key => {
    clonedSource[key] = deepClone(source[key], hash);
})
hash.set(source, clonedSource);
return clonedSource;
```

#### 2.10 简单实现

```js
function deepClone(source, hash = new WeakMap()) {
    /* hash 是额外开辟的一个存储空间，用来存储 “当前对象-拷贝对象” 的映射关系，用于解决循环引用问题。
    如果 hash.get(source) 查找到内容，说明当前对象已经被拷贝过了，直接返回拷贝结果即可，从而避免循环调用；
    如果 hash.get(source) 未查找到内容，说明当前对象没有被拷贝过，此时可以将拷贝结果添加到内存空间中去 */
    /* 这里使用 WeakMap 开辟内存空间，可以配合垃圾回收机制，防止内存泄漏。因为其键名所指向的对象，不计入
    一次引用，从而不影响垃圾回收机制 */

    /* source 是原始类型 */
    if (source === null || typeof source !== 'object') {
        return source;
    }

    /* source 时 DOM 元素 */
    if (source instanceof Node) {
        return source;
    }

    /* 处理循环引用情形 */
    if (hash.get(source)) {
        return hash.get(source);
    }

    /* source 是 Date 对象 */
    if (source instanceof Date) {
        return new Date(source);
    }

    /* source 是 RegExp 对象 */
    if (source instanceof RegExp) {
        return new RegExp(source);
    }

    /* source 是 Function 对象 */
    if (source instanceof Function) {
        return source;
    }

    /* source 是 Map 对象 */
    if (source instanceof Map) {
        const clonedMap = new Map();
        source.forEach((value, key) => {
            clonedMap.set(deepClone(key, hash), deepClone(value, hash));
        });
        hash.set(source, clonedMap);
        return clonedMap;
    }

    /* source 是 Set 对象 */
    if (source instanceof Set) {
        const clonedSet = new Set();
        source.forEach(value => {
            clonedSet.add(deepClone(value, hash));
        });
        hash.set(source, clonedSet);
        return clonedSet;
    }

    /* source 是一般对象或数组 */
    const clonedSource = new source.constructor(); // 创建一个新的对象或数组
    // Reflect.ownKeys(obj) 相当于 Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(target))
    Reflect.ownKeys(source).forEach(key => {
        clonedSource[key] = deepClone(source[key], hash);
    })
    hash.set(source, clonedSource);
    return clonedSource;
}
```

### 3. structuredClone

- **介绍**：`structuredClone` 是一个用于实现**深度克隆**对象的 JS 内置 API，其可以**克隆绝大多数 JS 对象**。此外，该 API 还能**处理循环引用**问题。

  > 不足之处：`structuredClone` **不能克隆函数、DOM 节点、Error 对象等**；同时，**浏览器支持有限**，并不是所有浏览器环境都支持该 API。

- **深克隆的实现**

  ```js
  const source = {
      name: "chuanyitu",
      age: 23,
      details: {
          hobbies: ["reading", "gaming"],
          address: { country: "China" }
      },
      date: new Date(),
      regex: /test/i,
      map: new Map([["key1", "value1"]]),
      set: new Set([1, 2, 3])
  };
  
  // 使用 structuredClone 进行深拷贝
  const target = structuredClone(source);
  
  // 验证深拷贝效果
  console.log(target.details === source.details); // false
  console.log(target.date === source.date); // false
  console.log(target.regex === source.regex); // false
  console.log(target.map === source.map); target // false
  console.log(target.set === source.set); // false
  ```

## REFERENCES

https://juejin.cn/post/7072528644739956773#heading-10
