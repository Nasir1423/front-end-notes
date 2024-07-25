# TypeScript

Note：所有笔记参考自 https://wangdoc.com/typescript

## 1 简介

- **介绍**：TypeScript（简称 TS）是微软公司开发的一种**基于 JavaScript （简称 JS）语言**的编程语言。TypeScript 的主要功能是**为 JavaScript 添加类型系统**。
- **类型**：类型（type）指的是**一组相同的特征**。如果两个值具有**某种共同的特征**，就可以说，它们属于同一种类型。一旦确定某个值的类型，就意味着，这个值具有该类型的所有特征，可以进行该类型的所有运算。**凡是适用该类型的地方，都可以使用这个值；凡是不适用该类型的地方，使用这个值都会报错**。“类型”是针对“值”的，可以视为是后者的一个**元属性**。**每一个值在 TypeScript 里面都是有类型的**。

- **动态类型与静态类型**
  - **动态类型（JS）**：JavaScript 的类型系统非常弱，而且没有使用限制，运算符可以接受各种类型的值。在语法上，JavaScript 属于动态类型语言。
  - **静态类型（TS）**：TypeScript 引入了一个更强大、更严格的类型系统，属于静态类型语言。

- **优缺点**
  - **优点**：由于每个值、每个变量、每个运算符都有严格的类型约束，**TypeScript 就能轻松发现拼写错误、语义错误和方法调用错误**，节省程序员的时间。
  - **缺点**：原生的 JavaScript 代码，可以直接在 JavaScript 引擎运行。添加类型系统以后，就**多出了一个单独的编译步骤，检查类型是否正确，并将 TypeScript 代码转成 JavaScript 代码**，这样才能运行。

## 2 基本使用

### 2.1 类型声明

```ts
/* 
    类型声明 ": 类型"
    
    注意：
    - 变量值与声明类型不一致，则会报错
    - 无法使用未赋值的变量
 */
let animal: string; // 声明变量类型

function myFun(num: number): string { // 声明函数参数及返回值类型
    return num + ""
}
```

### 2.2 类型推断

```ts
/* 类型推断 */
let animal = "cat"; // 这里类型推断变量类型为 Number

function myFun(num: number) { // 这里类型推断函数返回值为 String
    return num + ""
}
```

### 2.3 编译

- **介绍**：TypeScript 项目要想运行，必须先**转为 JavaScript 代码**，这个代码转换的过程就叫做“编译”（compile）。编译时，会**将类型声明和类型相关的代码全部删除，只留下能运行的 JavaScript 代码**，并且不会改变 JavaScript 的运行结果。
- **类型检查时机(编译时/运行时)**：TypeScript 的类型检查只是**编译时的类型检查**，而不是运行时的类型检查。

- **编译器**：TypeScript 官方提供的编译器叫做 tsc，可以**将 `.ts` 的 TypeScript 脚本编译成 `.js` 的JavaScript 脚本**。tsc 是一个 **npm 模块**。

### 2.4 编译器安装及使用

- **安装**：`npm install -g typescript`

  > 安装成功检查：`tsc -v` 或 `tsc --version`

- **帮助信息**

  - **基本帮助信息** `tsc -h` 或 `tsc --help`
  - **完整帮助信息** `tsc --all`

- **编译脚本**

  - **基本编译** `tsc app.ts`

    > 在**当前目录**下，生成一个 `app.js` 脚本文件

  - **编译多个文件** `tsc file1.ts file2.ts file3.ts` 

    > 在**当前目录**生成三个 JavaScript 脚本文件 `file1.js`、`file2.js`、`file3.js`

  - **编译多个文件为一个 `.js` 脚本** `tsc file1.ts file2.ts --outFile app.js`

    > 将 `file1.ts` 和 `file2.ts` 两个脚本**编译成一个** JavaScript 文件 `app.js`

  - **将编译结果保存在指定目录** `tsc app.ts --outDir dist`

    > 在 `dist` 子目录下生成`app.js`

  - **指定编译结果的版本** `tsc --target es2015 app.ts`

    > 可选值：es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, esnext
    >
    > 默认值：es5

- **编译与报错**：编译过程中，如果没有报错，`tsc`命令不会有任何显示。**如果编译报错，`tsc` 命令就会显示报错信息，但是这种情况下，依然会编译生成 JavaScript 脚本**。

- **脚本编译**

  - **一旦报错就停止编译，不生成编译产物** `tsc --noEmitOnError app.ts`
  - **只检查类型是否正确，不生成 JavaScript 文件** `tsc --noEmit app.ts`

### 2.5 编译器配置

- **介绍**：TypeScript 允许将 `tsc` 的**编译参数**，写在配置文件 `tsconfig.json`。**只要当前目录有这个文件，`tsc`就会自动读取，所以运行时可以不写参数。**

- **举例说明**：以下两种方式编译 `.ts` 脚本的作用相同

  - 情况一：`tsc file1.ts file2.ts --outFile dist/app.js`

  - 情况二：`tsc`

    ```json
    {
      "files": ["file1.ts", "file2.ts"],
      "compilerOptions": {
        "outFile": "dist/app.js"
      }
    }
    ```

    > tsconfig.json ↑

### 2.6 ts-node 运行 ts 代码

- [ts-node](https://github.com/TypeStrong/ts-node) 是一个非官方的 **npm 模块**，可以直接运行 TypeScript 代码。
- **安装** `npm install -g ts-node`
- **运行** `ts-node script.ts`
- **REPL 运行环境**：如果执行 ts-node 命令不带有任何参数，它会**提供一个 TypeScript 的命令行 REPL 运行环境**，你可以在这个环境中输入 TypeScript 代码，逐行执行。要退出这个 REPL 环境，可以按下 Ctrl + d，或者输入`.exit`。

## 3 特殊类型

### 3.1 any 类型

- **介绍**：`any` 类型表示**没有任何限制**，该类型的变量可以**赋予任意类型的值**。变量类型一旦设为`any`，TypeScript 实际上会**关闭这个变量的类型检查**。应该**尽量避免使用`any`类型**，否则就失去了使用 TypeScript 的意义。

- **适用场景**：为了适配以前老的 JavaScript 项目，**让代码快速迁移到 TypeScript**，可以把变量类型设为`any`。

- **顶层类型**：`any`类型可以看成是**所有其他类型的全集**，包含了一切可能的类型。TypeScript 将这种类型称为“**顶层类型**”（top type），意为涵盖了所有下层。

- **any 类型推断**：对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，**如果无法推断出类型，TypeScript 就会认为该变量的类型是`any`**。

- **编译脚本＆禁止 any 类型推断**：`tsc --noImplicitAny app.ts` 

  > TypeScript 提供了一个编译选项 `noImplicitAny`，打开该选项，**只要推断出 `any` 类型就会报错**。
  >
  > 这里有一个特殊情况，即使打开了 `noImplicitAny`，**使用 `let` 和 `var` 命令声明变量，但不赋值也不指定类型，是不会报错的**。建议使用 `let` 和 `var` 声明变量时，**如果不赋值，就一定要显式声明类型**，否则可能存在安全隐患。**`const` 命令没有这个问题**，因为 JavaScript 语言规定 `const` 声明变量时，必须同时进行初始化（赋值）。

- **any 的严重缺点—— 类型污染**：`any`类型除了**关闭类型检查**，还有一个很大的问题，就是它会**“污染”其他变量**。它可以**赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错**。污染其他具有正确类型的变量，把错误留到运行时，这就是不宜使用 `any` 类型的另一个主要原因。

  ```ts
  let x:any = 'hello';
  let y:number;
  
  y = x; // 不报错，number 类型的变量现在存储的值为 string 类型的 "hello"！！！
  ```

### 3.2 unknown 类型 —— any 严格版

- **介绍**：为了解决`any`类型“污染”其他变量的问题，TypeScript 3.0 引入了[`unknown`类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)。它与`any`含义相同，**表示类型不确定，可能是任意类型**，但是它的使用有一些限制，不像`any`那样自由，可以视为**严格版的`any`**。

- **与 any 的区别**

  - **相似之处**：**所有类型的值**都可以分配给 `unknown` 类型。
  - **不同之处**：**不能直接使用**。
    - `unknown`类型的变量，**不能直接赋值给除了 `any` 类型和 `unknown` 类型外其他类型的变量**。这就避免了污染问题，从而克服了`any`类型的一大缺点。
    - 其次，**不能直接调用 `unknown` 类型变量的方法和属性**。
    - 再次，`unknown`类型变量**能够进行的运算是有限的**，只能进行比较运算（运算符 `==`、`===`、`!=`、`!==`、`||`、`&&`、`?`）、取反运算（运算符`!`）、`typeof` 运算符和 `instanceof` 运算符这几种，其他运算都会报错。例如，加法运算就会报错。

- **使用方式**：只有经过“**类型缩小**”，`unknown` 类型变量才可以使用。所谓“类型缩小”，就是缩小 `unknown` 变量的类型范围，确保不会出错。这样设计的目的是，**只有明确 `unknown` 变量的实际类型，才允许使用它**，防止像 `any` 那样可以随意乱用，**防止“污染”其他变量**。类型缩小以后再使用，就不会报错。

  ```ts
  let s:unknown = 'hello';
  
  if (typeof s === 'string') { // 只有明确了 unknown 类型变量的具体类型，才能使用 .length 属性
    s.length; // 正确
  }
  ```

- **适用场景**：`unknown`可以看作是更安全的`any`。一般来说，**凡是需要设为`any`类型的地方，通常都应该优先考虑设为`unknown`类型**。

- **顶层类型**：在集合论上，`unknown` 也可以视为所有其他类型（除了`any`）的全集，所以它和 `any` 一样，也属于 TypeScript 的顶层类型。

### 3.3 never 类型 —— 空集

- **介绍**：为了保持与集合论的对应关系，以及类型运算的完整性，TypeScript 还引入了“**空类型**”的概念，即该类型为空，**不包含任何值**。由于不存在任何属于“空类型”的值，所以该类型被称为 `never`，即**不可能有这样的值**。

- **适用场景**

  - 使用 `never` 声明变量的类型，则**不能再给其赋值**，否则会报错。

    ```ts
    let x:never;
    ```

  - 在一些类型运算之中，**保证类型运算的完整性**。

  - **不可能返回值的函数**，返回值的类型就可以写成`never`。

    ```ts
    function f():never {
      throw new Error('Error');
    }
    ```

  - 如果一个变量可能有多种类型（即联合类型），通常需要使用分支处理每一种类型。这时，**处理所有可能的类型之后，剩余的情况就属于`never`类型。**

    ```ts
    function fn(x:string|number) {
      if (typeof x === 'string') {
        // ...
      } else if (typeof x === 'number') {
        // ...
      } else {
        x; // never 类型
      }
    }
    ```

- **never 作为空集的赋值特点**：`never` 类型的一个重要特点是，**可以赋值给任意其他类型**。

- **底层类型**：空集是任何集合的子集。TypeScript 就相应规定，**任何类型都包含了 `never` 类型**。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“**底层类型**”（bottom type）。

## 4 类型系统

### 4.1 基本类型

- **TS 的基本类型**：JavaScript 语言将值分成 8 种类型。**TypeScript 继承了 JavaScript 的类型设计**，这 8 种类型可以看作 TypeScript 的基本类型。

  ```
  1. boolean
  2. string
  3. number
  4. bigint: 以 n 结尾的整数
  5. symbol: Symbol() 函数返回 symbol 类型
  6. object: object 类型包含了所有对象、数组和函数
  7. undefined: undefined 类型只包含一个值 undefined，表示未定义。
  8. null: null 类型也只包含一个值 null，表示为空。
  ```

  > `undefined` 和 `null` 既可以作为值，也可以作为类型，取决于在哪里使用它

- **`undefined` 和 `null` 作为值的类型推断**：如果没有声明类型的变量，被赋值为`undefined`或`null`，
  - 关闭编译设置 `noImplicitAny` 和 `strictNullChecks` 时，它们的类型会被推断为`any`。
  - 打开编译设置`strictNullChecks`以后，赋值为`undefined`的变量会被推断为`undefined`类型，赋值为`null`的变量会被推断为`null`类型。

### 4.2 包装对象类型

- **原始类型**：JavaScript 的8种类型之中，`undefined` 和 `null` 其实是两个特殊值，`object `属于复合类型，剩下的五种属于原始类型（primitive value），代表**最基本的、不可再分**的值。

  ```ts
  1. boolean
  2. string
  3. number
  4. bigint
  5. symbol
  ```

- **包装对象**：上面这五种原始类型的**值**，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值**在需要时，会自动产生的对象**。五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以作为构造函数使用，执行后可以**直接获取某个原始类型值的包装对象**。

  ```ts
  - Boolean(原始值)
  - String(原始值)
  - Number(原始值)
  ```

  > `String()` **只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象**。如果当作普通函数使用（不带有 `new` 命令），返回就是一个普通字符串。其他两个构造函数 `Number()` 和 `Boolean()` 也是如此。

- **包装对象和字面量**：由于包装对象的存在，导致**每一个原始类型的值都有包装对象和字面量**两种情况。

  ```ts
  'hello' // 字面量
  new String('hello') // 包装对象
  ```

- **包装对象类型和字面量类型**：为了区分这两种情况，TypeScript 对五种原始类型分别提供了**大写和小写**两种类型。其中，**大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象**。

  ```ts
  - Boolean 和 boolean
  - String 和 string
  - Number 和 number
  - BigInt 和 bigint
  - Symbol 和 symbol
  ```

  > **建议只使用小写类型**，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。

- **`bigInt` 和 `Symbol` 的包装对象**：`Symbol()`和`BigInt()`这两个函数不能当作构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，除非使用下面的写法。但是，它们**没有使用场景**，因此`Symbol`和`BigInt`这两个类型虽然存在，但是完全没有使用的理由。

  ```ts
  let a = Object(Symbol());
  let b = Object(BigInt());
  ```

  > 目前在 TypeScript 里面，`symbol` 和 `Symbol` 两种写法没有差异，`bigint` 和 `BigInt`也是如此，不知道是否属于官方的疏忽。**建议始终使用小写的 `symbol` 和 `bigint`**，不使用大写的 `Symbol`和`BigInt`。

### 4.3 Object 和 object 类型

- **Object 类型**：大写的 `Object` 类型代表 JavaScript 语言里面的**广义对象**。**所有可以转成对象的值，都是 `Object`类型，这囊括了几乎所有的值。**事实上，**除了 `undefined` 和 `null` 这两个值不能转为对象**，其他任何值都可以赋值给 `Object` 类型。另外，空对象 `{}` 是`Object` 类型的简写形式，所以使用 `Object` 时常常用空对象代替。

  ```ts
  let obj1:Object;
  let obj2:{};
  ```

  > 无所不包的`Object`类型既不符合直觉，也不方便使用。

- **object 类型**：小写的 `object` 类型代表 JavaScript 里面的**狭义对象**，包含**对象、数组和函数**，不包括原始类型的值。建议总是使用小写类型 `object`，不使用大写类型 `Object`。

- **数据的可访问性**：无论是大写的 `Object` 类型，还是小写的 `object` 类型，都**只包含 JavaScript 内置对象原生的属性和方法**，用户**自定义的属性和方法都不存在于这两个类型之中**。

  ```ts
  const o1:Object = { foo: 0 };
  
  o1.toString() // 正确，`toString()`是对象的原生方法，可以正确访问
  o1.foo // 报错，`foo`是自定义属性，访问就会报错
  ```

  > 需要使用对象类型来描述对象的自定义属性

### 4.4 undefined 和 null 的特殊之处

- **特殊之处**：`undefined`和`null`**既是值，又是类型**。作为值，它们有一个特殊的地方：**任何其他类型的变量都可以赋值为 `undefined` 或 `null`**。

  ```ts
  let age:number = 24;
  
  age = null;      // 正确
  age = undefined; // 正确
  ```

- **空值严格检查配置**：TypeScript 提供了一个编译选项 `strictNullChecks`。打开 `strictNullChecks` 以后，**`undefined` 和 `null` 只能赋值给自身，或者 `any` 类型和 `unknown` 类型的变量**。

  ```bash
   tsc --strictNullChecks app.ts
  ```

  ```json
  {
    "compilerOptions": {
      "strictNullChecks": true
      // ...
    }
  }
  ```

### 4.5 值类型

- **值类型**：TypeScript 规定，**单个值也是一种类型**，称为“值类型”。

- **const 类型推断**：TypeScript 推断类型时，遇到 `const` 命令声明的变量，如果代码里面没有注明类型，就会推断该变量是值类型。

  ```ts
  // x 的类型是 "https"
  const x = 'https';
  ```

  > `const` 命令声明的变量，**如果赋值为对象，并不会推断为值类型**。这是因为 JavaScript 里面，`const` 变量赋值为对象时，属性值是可以改变的。

- **父类型与子类型**：`5` 是 `number` 的子类型，`number` 是 `5` 的父类型，父**类型不能赋值给子类型，但是子类型可以赋值给父类型**。

- **子类型赋值给父类型的解决方式**：如果一定要让子类型可以赋值为父类型的值，就要用到**类型断言**。

  ```ts
  const x:5 = (4 + 1) as 5; // 正确，4 + 1 会被推断为 number 类型，但是加上 as，就是告诉编译器，可以把 4 + 1 的类型视为值类型 5，这样就不会报错
  ```

### 4.6 联合类型

- **联合类型**（或）：联合类型（union types）指的是**多个类型组成的一个新类型**，使用符号`|`表示。联合类型`A|B` 表示，**任何一个类型只要属于 `A` 或 `B`，就属于联合类型 `A|B`**。**联合类型可以与值类型相结合**，表示一个变量的值有若干种可能。

  ```ts
  let x:string|number;
  let rainbowColor:'赤'|'橙'|'黄'|'绿'|'青'|'蓝'|'紫';
  ```

- **联合类型的多行书写**：联合类型的**第一个成员前面，也可以加上竖杠`|`**，这样便于多行书写。

  ```ts
  let x:
    | 'one'
    | 'two'
    | 'three'
    | 'four';
  ```

- **类型缩小**：“类型缩小”是 TypeScript **处理联合类型的标准方法**，凡是遇到可能为多种类型的场合，都需要先缩小类型，区分该值到底属于哪一种类型，，再进行处理。实际上，联合类型本身可以看成是一种“类型放大”（type widening），处理时就需要“类型缩小”（type narrowing）。

  ```ts
  function getPort(
    scheme: 'http'|'https'
  ) {
    switch (scheme) {
      case 'http':
        return 80;
      case 'https':
        return 443;
    }
  }
  ```

### 4.7 交叉类型

- **交叉类型**（且）：交叉类型（intersection types）指的**多个类型组成的一个新类型**，使用符号 `&` 表示。交叉类型 `A&B` 表示，**任何一个类型必须同时属于 `A` 和 `B`，才属于交叉类型 `A&B`**，即交叉类型同时满足 `A` 和 `B` 的特征。

  ```ts
  let x:number&string; // 变量x同时是数值和字符串，这当然是不可能的，所以 TypeScript 会认为 x 的类型实际是 never。
  ```

- **交叉类型的使用场景**

  - **对象的合成**

    ```ts
    let obj:
      { foo: string } &
      { bar: string };
    
    obj = {
      foo: 'hello',
      bar: 'world'
    };
    ```

  - **对象类型添加新属性**

    ```ts
    type A = { foo: number };
    
    type B = A & { bar: number };
    ```

### 4.8 type 命令

- **type 命令**：`type` 命令用来**定义一个类型的别名**。别名可以让类型的名字变得更有意义，也能增加代码的可读性，还可以使复杂类型用起来更方便，便于以后修改变量的类型。

- **语法规范**

  - 别名**不允许重名**。

  - 别名的作用域是**块级作用域**。这意味着，代码块内部定义的别名，影响不到外部。

  - 别名**支持使用表达式**，也可以在定义一个别名时，使用另一个别名，即**别名允许嵌套**。

    ```ts
    type World = "world";
    type Greeting = `hello ${World}`; // 即 Greeting 类型，要求变量值必须以 hello + " " 开头，以 World 类型的数据结尾
    ```

### 4.9 typeof 运算符

- **typeof 运算符**（JS）：JavaScript 语言中，`typeof` 运算符是一个一元运算符，**返回一个字符串**，代表操作数的类型。JavaScript 里面，`typeof` 运算符只可能返回八种结果，而且都是字符串。

  ```ts
  typeof undefined; // "undefined"
  typeof true; // "boolean"
  typeof 1337; // "number"
  typeof "foo"; // "string"
  typeof {}; // "object"，typeof null 返回的结果也是 object
  typeof parseInt; // "function"
  typeof Symbol(); // "symbol"
  typeof 127n // "bigint"
  ```

- **typeof 运算符**（TS）：TypeScript 将`typeof` 运算符移植到了类型运算，它的操作数依然是一个值，但是**返回的不是字符串，而是该值的 TypeScript 类型**。

  ```ts
  const a = { x: 0 };
  
  type T0 = typeof a;   // { x: number }
  type T1 = typeof a.x; // number
  ```

- **辨别不同情况下的 typeof 运算符**：同一段代码可能存在两种 `typeof` 运算符，一种用在值相关的 JavaScript 代码部分，另一种用在类型相关的 TypeScript 代码部分。**JavaScript 的 typeof 遵守 JavaScript 规则，TypeScript 的 typeof 遵守 TypeScript 规则**。它们的一个重要区别在于，**编译后，前者会保留，后者会被全部删除**。由于编译时不会进行 JavaScript 的值运算，所以 **TypeScript 规定，typeof 的参数只能是标识符，不能是需要运算的表达式**。

  ```ts
  let a = 1;
  let b:typeof a; // 类型运算
  
  if (typeof a === 'number') { // 值运算
    b = a;
  }
  
  type T = typeof Date(); // 报错（typeof 参数只能是标识符）
  ```

### 4.10 块级类型声明

TypeScript 支持块级类型声明，即类型可以声明在代码块（用大括号表示）里面，并且只在当前代码块有效。

```ts
if (true) {
  type T = number;
  let v:T = 5;
} else {
  type T = string;
  let v:T = 'hello';
}
```

### 4.11 类型兼容

TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。如果类型 `A` 的值可以赋值给类型 `B`，那么类型 `A` 就称为类型 `B` 的**子类型**（subtype）。如，类型 `number` 就是类型 `number|string` 的子类型。**凡是可以使用父类型的地方，都可以使用子类型**，但是反过来不行。

## 5 数组





```ts
// 1. 类型推断
let str = "hello";
// str = 10; // 此时会报错，因为 TS 已经根据之前的内容推断 str 存储 String 类型的数据，因此不能更改类型

// 2. 类型注解
let amount: number = 100; // 显示声明一个变量为 Number 类型推断

// 3. 类型断言
const arr = [1, 2, 3];
let result = arr.find(item => item > 2) as number; // 类型断言，表示确认当前操作结果为 Number 类型
// console.log(result * 5) // 如果不进行类型断言，这里会报错，因为 result 可能是 undefined

// 4. 基础类型和联合类型
let v1: string = "abc";
let v2: number = 10;
let v3: boolean = false;
let v4: null = null;
let v5: undefined = undefined;

let v6: string | null = null; // v6 只能是指定的数据类型其一
let v7: 12 | "hello" | false = 12; // v7 只能是指定的数据类型其一

// 5. 数组、元组、枚举
let arr1: number[] = [1, 2, 3]; // 限制数组元素类型为 number
let arr2: Array<string> = ["a", "b", "c"]; // 另一种方式，限制数组元素类型为 string

let tuple1: [number, string, boolean] = [12, "a", false]; // 元组限制元素数量和每个元素的取值
let tuple2: [number, string, boolean?] = [12, "a"]; // 可选的元素
// console.log(tuple1[0])

enum Season { // 使用 enum 关键字定义枚举
    Spring,
    Summer,
    Fall,
    Winter
}
// console.log(Season.Spring) // 访问枚举数据
// console.log(Season[0]) // 访问枚举数据

// 6. 函数
function myFun(a: number, b: string = "hello", c?: boolean, ...rest: number[]): number {
    // a 限制类型为 number 的参数
    // b 限制类型为 string，默认值为 "hello" 的参数
    // c 限制类型为 boolean，可选的参数
    // rest 限制类型为数值数组的剩余参数
    // 这里设置函数返回值为 number，也可以设置为 void，表示什么也不返回
    return 100
}

function fun1(): void {
    return undefined
}

function fun2(): undefined {
    return undefined
}

function fun3(): void {
    return
}

// console.log(fun1(), fun2(), fun3())

// 7. 接口
interface Obj { // 可以看做是定义了一个对象的类型，约束了其中应该出现的属性以及数据类型
    name: string,
    age: number
}

const obj: Obj = {
    name: "a",
    age: 1
}

// 8. 类型别名
type userName = string | number; // 便于联合类型的复用
let a: userName = "a"

// 9. 泛型
function myFunc<T>(a: T, b: T): T[] { // 表示参数类型、返回值的数组元素类型就是指定的 T
    return [a, b]
}

myFunc<string>("a", "b");
myFunc("a", "b"); // TS 也可以自动推断泛型

// 10. 函数重载
function hello(name: string): string
function hello(age: number): string
function hello(value: string | number): string {
    if (typeof value === "string") {
        return "你好，我叫" + value;
    } else if (typeof value === "number") {
        return "你好，我" + value + "大了"
    } else {
        return "非法格式"
    }
}

// console.log(hello("chuanyitu"))

// 11. 接口继承
interface Parent {
    name: string,
    age: number
}

interface Child extends Parent {
    gender: string
}

const person: Child = {
    name: "chuanyitu",
    age: 19,
    gender: "男"
}

// console.log(person)

// 12. 类
class Demo {
    // 属性需要提前声明
    public title: string // 公有属性，必选属性，字符串类型
    private _content: string // 私有属性(只能在当前类内使用)，必选属性，字符串类型
    author?: string // 公有属性(默认)，可选属性，字符串类型
    price = 100 // 公有属性(默认)，默认值属性，数值类型(类型推断)
    protected publisher: string // 受保护属性(只能在当前类内或子类中使用)，必选属性，字符串类型

    public static category: string = "cook"; // 静态属性，只能通过 Demo.category 访问和修改
    private readonly _maxPublishNumber = 100; // 只读的私有属性

    constructor(title: string, content: string, author: string, price: number, publisher: string) {
        this.title = title;
        this._content = content;
        this.author = author;
        this.price = price;
        this.publisher = publisher;

        console.log(this._maxPublishNumber)
    }
}

// console.log(Demo.category)
// new Demo("1", "2", "1", 12, "12")

// 13. 存取器：一般是存取器属性 + 私有属性
class User {
    private _password: string = ""; // 私有属性

    get password(): string { // 存取器属性
        console.log("getter")
        return this._password
    }

    set password(newPassword: string) {
        console.log("setter")
        this._password = newPassword
    }
}

// 14. 抽象类
abstract class Animal { // 抽象类
    abstract name: string // 抽象属性
    abstract makeSound(): void // 抽象方法
    eat(): void {
        console.log("动物需要吃饭");
    }
}

class Cat extends Animal {
    name: string = "猫咪"
    makeSound(): void {
        console.log("喵~")
    }
}

const cat = new Cat();
// console.log(cat.name);
// cat.eat()

// 15. 类实现接口（与抽象类类似，但是可以实现多个接口）
interface A {
    name: string
    get sound(): string
}

interface B {
    age: number
}

class Dog implements A, B {
    name: string = "狗"
    get sound(): string {
        return "Wolf"
    }
    age: number = 1
}

// 16. 泛型类
class MyClass<T> {
    public value: T;
    constructor(value: T) {
        this.value = value;
    }

    do(input: T): T {
        console.log("处理数据ing", this.value);
        return input;
    }
}

const myStr = new MyClass<string>("hi");
console.log(myStr)
```

