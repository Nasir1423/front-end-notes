# Node.js

## 1. Node.js 概述

### 1.1 Chrome 与 Node

Node 的结构与 Chrome 十分相似，都是基于**事件驱动**的**异步**架构，浏览器通过事件驱动来服务界面上的交互，Node通过事件驱动来服务 I/O。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830110959736.png" alt="image-20240830110959736" style="zoom:50%;" />

### 1.2 Node 的特点

1. **异步 I/O**：在 Node 中，绝大多数的操作都以异步的方式进行调用。

   <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830111646688.png" alt="image-20240830111646688" style="zoom: 50%;" />

2. **事件与回调函数**

3. **单线程**

   > 单线程的好处：不用像多线程编程那样处处在意状态的同步问题，这里没有死锁的存在，也没有线程上下文交换所带来的性能上的开销。
   >
   > 单线程的弱点：无法利用多核 CPU。 错误会引起整个应用退出。大量计算占用 CPU 导致无法继续调用异步 I/O。

4. **跨平台**

## 2. 模块机制

### 2.1 CommonJS 规范

CommonJS 规范内容：模块、二进制、Buffer、字符集编码、I/O 流、进程环境、文件系统、套接字、单元测试、Web 服务器网关接口、包管理等。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830112438018.png" alt="image-20240830112438018" style="zoom: 50%;" />

### 2.2 模块规范 ⭐

1. **模块引入**：通过 `require` 方法，接受模块标识，用于引入一个模块的 API 到当前上下文中。Node 模块的引入是**同步**的。

   ```js
   var 模块名 = require('模块标识');
   ```

2. **模块导出**：通过将方法或属性挂载在 `exports` 对象上，用于导出当前模块。模块中的 `module` 对象对应模块自身，`exports` 实际上是 `module` 的属性。

   ```js
   exports.属性名 = 属性值;
   
   // or
   
   module.exports = {
       属性名: 属性值
   }
   ```

3. **模块标识**：必须是**小驼峰**命名的字符串 or 相对路径 or 绝对路径。

### 2.3 模块实现 ⭐

1. Node 引入模块的三个步骤：(1) **路径分析** (2) **文件定位** (3) **编译执行**

2. Node 中的两类模块：**核心模块**；**文件模块**

   - 核心模块：Node 提供的模块。部分核心模块在 Node 源码编译时就一起编译进了二进制执行文件。

   - 文件模块：用户编写的模块。

     |   类别   |    加载时机     |             加载流程             | 加载速度 |
     | :------: | :-------------: | :------------------------------: | :------: |
     | 核心模块 | Node 进程启动时 |             编译执行             |    快    |
     | 文件模块 | 运行时动态加载  | 路径分析 -> 文件定位 -> 编译执行 |    慢    |

3. 模块的缓存机制：Node 会对引入过的模块进行缓存， 以减少二次引入时的开销。
   - Node 缓存的是编译和执行之后的对象。
   - `require` 方法对相同模块的二次加载**一律采用缓存优先的方式**，其中核心模块的缓存检查先于文件模块。

#### 2.3.1 路径分析

路径分析即对 `require` 方法接收到的模块标识进行分析。

|         模块标识          |                           具体操作                           | 加载速度 |
| :-----------------------: | :----------------------------------------------------------: | :------: |
| 核心模块，如 `fs`、`path` |                     优先级仅次于缓存加载                     |   最快   |
|    相对路径的文件模块     | 将路径转换为真实路径 -> 以真实路径为索引，将编译执行的结果存放到缓存中 |   较快   |
|    绝对路径的文件模块     | 将路径转换为真实路径 -> 以真实路径为索引，将编译执行的结果存放到缓存中 |   较快   |
|   非路径形式的文件模块    |   Node 根据逐个尝试**模块路径**中的路径，直到找到目标文件    |   最慢   |

> 模块路径：Node 定位文件模块所制定的查找策略，是一个路径组成的数组。模块路径可以在 `js` 文件中通过 `console.log(module.paths)` 查看，windows 下的大致输出为 ['c:\\nodejs\\node_modules', 'c:\\node_modules']。
>
> 模块路径的生成规则：(1) 当前文件目录下的 node_modules 目录。 (2) 父目录下的 node_modules 目录。 (3) 父目录的父目录下的 node_modules 目录。 (4) 沿路径向上逐级递归，直到根目录下的 node_modules 目录。 

#### 2.3.2 文件定位

**扩展名分析**：CommonJS 模块规范**允许在标识符中不包含文件扩展名**，这种情况下，Node 会按 `.js、.json、.node` 的次序补足扩展名，依次尝试。

---

**目录分析和包**：如果分析标识符没有找到文件，但找到一个**目录**，Node 此时会将其看做一个包去处理。

Step1. 首先，Node 在当前目录下查找 package.json ，通过 `JSON.parse ()` 解析出包描述对象，从中取出 `main` 属性指定的文件名进行定位。 

Step2. 如果**文件名缺少扩展名**， 将会进入**扩展名分析**的步骤。
Step3. 如果 `main` 属性指定的文件名错误，或者压根没有 package.json 文件，Node 会将 `index` 当做**默认文件名**，然后依次查找 `index.js`、`index.json`、`index.node`。 
Step4. 如果在目录分析的过程中没有定位成功任何文件， 则**自定义模块进入下一个模块路径进行查找**。

Step5. 如果**模块路径数组都被遍历完毕**，依然没有查找到目标文件，则会**抛出查找失败的异常**。 

#### 2.3.3 编译执行

定位到具体的文件后， Node 会**新建一个模块对象**， 然后根据路径载入并编译。每一个编译成功的模块都会将其文件路径作为索引缓存在 `Module._cache` 对象上，以提高二次引入的性能。

```js
/* Node 中的每个文件模块都是一个对象，定义如下 */
function Module(id, parent) { 
  this.id = id; 
  this.exports = {}; 
  this.parent = parent; 
  if (parent && parent.children) { 
    parent.children.push(this); 
  } 
 
  this.filename = null; 
  this.loaded = false; 
  this.children = []; 
}
```

----

对于不同扩展名的文件， 其载入方法也有所不同。可以通过 `require.extensions` 知道系统中已有的扩展加载方式。如果想对自定义的扩展名进行特殊的加载，可以通过类似 `require.extensions['.ext']` 的方式实现。 

| 扩展名 |                   载入方式                   |
| :----: | :------------------------------------------: |
|  .js   |        `fs` 模块同步读取 -> 编译执行         |
| .node  |    不需编译，`dlopen()` 方法加载执行文件     |
| .json  | `fs` 模块同步读取 -> `JSON.parse()` 解析结果 |
| .other |              当作 .js 文件载入               |

> `.node` 文件是用 C/C++ 编写的扩展文件，执行效率有优势
>
> 为了利用到 CommonJS 模块的缓存机制，对于 `.json` 文件推荐使用 `require()` 直接引入

---

**JavaScript 文件的包装与执行**

**包装**：在代码在头部添加了 `(function (exports, require, module, __filename, __dirname){\n` ，在尾部添加了 `\n});`。

```js
(function (exports, require, module, __filename, __dirname) { 
  var math = require('math'); 
  exports.area = function (radius) { 
    return Math.PI * radius * radius; 
  }; 
}); 
```

---

**执行**：包装之后的代码会通过 `vm` 原生模块的 `runInThisContext()` 方法执行，返回一个具体的 `function` 对象。

- 最后，将当前模块对象的 `exports` 属性、`require()` 方法、`module` (模块对象自身)、以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个 `function()` 执行。
- 在执行之后，模块的 `exports` 属性被返回给了调用方，`exports` 属性上的任何方法和属性都可以被外部调用到，但是模块中的其余变量或属性则不可直接被调用。

### 2.4 模块调用关系

1. 内建模块：一般来说，将由纯 C/C++ 编写的模块称为内建模块，其通常不被用户直接调用。

2. 核心模块的作用：(1) 作为 C/C++ 内建模块的封装层和桥接层，供文件模块调用 (2) 纯粹的功能模块，不需要跟底层打交道，但是又十分重要。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830141854849.png" alt="image-20240830141854849" style="zoom:50%;" />

### 2.5 包规范 ⭐

1. 解释：包实际上是一个**存档文件**，即一个目录直接打包为 .zip 或 tar.gz 格式的文件，安装后解压还原为目录。

2. CommonJS 包规范：由**包结构**和**包描述文件**两个部分组成，前者用于组织包中的各种文件，后者则用于描述包的相关信息，以供外部读取分析。

#### 2.5.1 包结构

|     目录名     |               含义               |
| :------------: | :------------------------------: |
| `package.json` |           包描述文件。           |
|     `bin`      | 用于存放可执行二进制文件的目录。 |
|     `lib`      | 用于存放 JavaScript 代码的目录。 |
|     `doc`      |       用于存放文档的目录。       |
|     `test`     |   用于存放单元测试用例的代码。   |

#### 2.5.2 包描述文件

包描述文件 package.json，是一个 JSON 格式的文件，位于包的根目录下，用于表达非代码相关的信息。

1. **必选字段**

   |      字段      |                             规定                             |
   | :------------: | :----------------------------------------------------------: |
   |     `name`     | 包名。由小写的字母和数字组成，可以包含 . 、 _ 和 - ，但不允许出现空格。包名必须唯一。 |
   | `description`  |                           包简介。                           |
   |   `version`    | 版本号。通常为 [major.minor.revision](http://semver.org/) 格式。 |
   |   `keywords`   |            关键词数组，可用于 NPM 的关键词搜索。             |
   | `maintainers`  | 包维护者列表。每个维护者由 name 、email 和 web 这 3 个属性组成。 |
   | `contributors` | 贡献者列表。列表中的第一个贡献应当是包的作者本人。它的格式与维护者列表相同。 |
   |     `bugs`     |           一个可以反馈 bug 的网页地址或邮件地址。            |
   |   `licenses`   | 当前包所使用的许可证列表，表示这个包可以在哪些许可证下使用。 |
   | `repositories` | 托管源代码的位置列表，表明可以通过哪些方式和地址访问包的源代码。 |
   | `dependencies` |                          生产依赖。                          |

2. **可选字段**

   |     字段      |                             规定                             |
   | :-----------: | :----------------------------------------------------------: |
   |  `homepage`   |                      当前包的网站地址。                      |
   |     `os`      | 操作系统支持列表。取值可包括 aix 、 freebsd 、 linux 、 macos 、 solaris 、vxworks 、 windows。 |
   |     `cpu`     | CPU 架构的支持列表。取值可包括 arm 、 mips 、 ppc 、 sparc 、 x86 和 x86_64。 |
   |   `engine`    | 支持的 JavaScript 引擎列表。<br />取值可包括 ejs 、 flusspferd 、 gpsee 、 jsc 、spidermonkey 、 narwhal 、 node 和 v8。 |
   |   `builtin`   |          标志当前包是否是内建在底层系统的标准组件。          |
   | `directories` |                         包目录说明。                         |
   | `implements`  |    实现规范的列表。标志当前包实现了 CommonJS 的哪些规范。    |
   |   `scripts`   |                        脚本说明对象。                        |

3. **NPM 新增字段**

   |       字段        |                             规定                             |
   | :---------------: | :----------------------------------------------------------: |
   |     `author`      |                           包作者。                           |
   |       `bin`       | 配置好 bin 字段后，通过 `npm install package_name -g` 命令可以将脚本添加到执行路径中，<br />之后可以在命令行中直接执行。 |
   |      `main`       | `require()` 在引入包时，会优先检查这个字段，并将其作为模块的**入口**。 如果不存在这个字段，<br />`require()` 方法会查找包目录下的 `index.js、 index.node、  index.json` 文件作为默认入口。 |
   | `devDependencies` |                          开发依赖。                          |

### 2.6 NPM ⭐

CommonJS 包规范是**理论**，NPM 是其中的一种**实践**。

#### 2.6.1 查看帮助

`npm –v` 查看当前NPM的版本。

`npm help <command>` 查看具体的命令说明。

`npm init` 自定义生成 package.json 文件。

`npm ls` 分析当前路径下可通过模块路径找到的所有包，并生成依赖树。

#### 2.6.2 安装依赖

`npm install <package-name>` 在当前目录下的 node_modules 目录下创建 package-name 目录，再将包解压到这个目录下。

`npm install <package-name> -g` **全局**安装。将一个包安装为全局可用的**可执行命令**，根据包的 package.json 中的 `bin` 字段的配置，将实际脚本链接到与 Node.js 可执行文件相同的路径下。

> 全局安装 ≠ 将一个模块包安装为一个全局包，即可以从任何地方通过 `require()` 引用这个包。
>
> 全局安装包 = 包名被映射为一个可执行命令，命令实际对应包的 package.json 中的 `bin` 字段所指定的实际脚本。
>
> 通过全局安装的所有模块包被安装在一个同一的目录，可以通过 `path.resolve(process.execPath, "..", "..", "lib", "node_modules")` 的方式推算。

`npm install <tarball file>` 从**本地**的 `.tar.gz` 压缩包文件安装一个包。

`npm install <tarball url>` 从一个**远程**的 `.tar.gz` URL 安装包。

`npm install <folder>` 从一个**本地文件夹**安装包。要求该文件夹必须有 package.json 文件。

`npm install underscore --registry=http://registry.url` 从非官方源（镜像源）安装。

> 可以通过 `npm config set registry http://registry.url` 方式指定默认下载源（镜像源）

#### 2.6.3 钩子脚本

通过 package.json 中的 `scripts` 字段可以指定包在安装或卸载过程中要执行的钩子脚本。

```json
"scripts": { 
  "preinstall": "preinstall.js", // npm install <package-name> 时，该脚本执行
  "install": "install.js", // preinstall 指向的脚本执行完后，该脚本执行
  "uninstall": "uninstall.js", // npm uninstall <package-name> 时，该脚本执行
  "test": "test.js" // npm test 时，该脚本执行
} 
```

#### 2.6.4 发布包

`npm adduser`  注册账号。

`npm publish <folder>` 上传包。NPM 会将目录打包为一个存档文件，然后上传到官方源仓库中。  

#### 2.6.5 管理包权限

`npm owner ls <package-name>` 查看包拥有者。

`npm owner add <user> <package-name>` 添加包拥有者。

`npm owner rm <user> <package-name>` 删除包拥有者。

### 2.7 前后端模块

| 类别 |               主要内容                |    瓶颈    |    加载方式    |
| :--: | :-----------------------------------: | :--------: | :------------: |
| 前端 | JS 从同一个服务器分发到多个客户端执行 |    带宽    |      网络      |
| 后端 |            JS 多次重复执行            | CPU 和内存 | 磁盘（快的多） |

## 3. 异步 I/O

1. 异步 I/O 可以让后端**快速响应资源**，从而提高前端的用户体验。

   > 浏览器中的异步：浏览器的 JavaScript 是单线程执行的，并与 UI 渲染**共用**一个线程。因此 **JavaScript 的执行会阻塞浏览器的 UI 渲染**。采用异步请求，在下载资源期间，JavaScript 和 UI 的执行都不会处于等待状态，从而可以继续响应用户的交互性为，提高用户体验。

2. 异步 I/O 可以解决**多线程编程模型的死锁、状态同步**的问题，也可以解决**单线程同步编程模型阻塞**的问题。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830165950841.png" alt="image-20240830165950841" style="zoom:50%;" />

### 3.1 事件循环 ⭐

**事件循环**：指的是 Node 自身的**执行模型**。

Step1. 进程启动时，Node 便会创建一个类似于 while(true) 的循环，每执行一次循环体的过程我们称为 Tick。

Step2. 每个 Tick 的过程就是查看是否有事件待处理，如果有，就取出事件及其相关的回调函数（存在则执行）。

Step3. 然后进入下个循环，如果不再有事件处理，就退出进程。

> **事件循环机制的更完整的阐述**
>
> Step1. 执行一个**宏任务**（从宏任务队列中取出第一个任务并执行）。
>
> Step2. 执行所有的**微任务**（直到微任务队列清空）。
>
> Step3. 更新渲染（如果需要）。
>
> Step4. 再次执行一个宏任务，重复上述过程。
>
> ---
>
> **宏任务（macro task）**：指那些会**在事件循环的每个阶段中执行的任务**。**每次**事件循环都会从**宏任务队列**中**取出一个任务**来执行。如 `setTimeout`、`setInterval`、`setImmediate`、I/O 操作
>
> - 在事件循环的各个**阶段**中执行，主要处理如定时器、I/O 回调等任务。
>
> **微任务（micro task）**：**指在当前事件循环结束之前、下一个宏任务开始之前执行的任务**。微任务的**优先级高**于下一次的宏任务，这意味着**当一个宏任务执行完毕**后，JavaScript 引擎会立即执行**所有的微任务**，然后才会开始下一个宏任务。如 `Promise` 的 `.then` 和 `.catch`、`process.nextTick`、`MutationObserver`。
>
> - 微任务的执行是贯穿于事件循环的各个**阶段**的。当一个阶段的宏任务执行完毕后，事件循环会**立即执行微任务队列中的所有微任务**，直到队列被清空。
> - 微任务执行完毕后，事件循环才会**进入下一个阶段**。

> **事件循环机制的执行阶段**
>
> Step1. **Timers 阶段**：执行已到期的定时器（如 `setTimeout` 和 `setInterval`）。==> 宏任务
>
> Step2. **Pending Callbacks 阶段**：处理一些系统级的操作回调，如 TCP 错误类型的回调。==> 宏任务
>
> Step3. **Idle, Prepare 阶段**：内部使用，用于处理 Node.js 内部的任务。
>
> Step4. **Poll 阶段**：轮询阶段是事件循环的核心部分，负责处理 I/O 事件，执行 I/O 回调。==> 宏任务
>
> Step5. **Check 阶段**：处理 `setImmediate` 的回调函数。==> 宏任务
>
> Step6. **Close Callbacks 阶段**：执行关闭事件的回调，如 `socket.on('close', ...)`。==> 宏任务
>
> ---
>
> 事件循环按固定的**阶段**顺序**执行宏任务**。一个宏任务执行完后，事件循环会**立即执行所有的微任务**，然后才会继续执行下一个宏任务。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830171740531.png" alt="image-20240830171740531" style="zoom: 50%;" />

### 3.2 观察者

**观察者**：是事件循环中的一个概念，用于**告诉 Node 当前 Tick 是否有事件需要处理**。每个事件循环中有一个或多个观察者，观察者可用于对事件进行分类，如：网络事件对应网络 I/O 观察者，文件 I/O 事件对应文件 I/O 观察者。

> 事件循环是一个 `Producer-Consumer` 模型
>
> - 异步 I/O，网络请求**生产**事件，并传递给观察者
> - 事件循环从观察者**取出**事件并进行处理
>
> Windows 下的事件循环基于 IOCP 创建，*nix 下的则是基于多线程创建。

### 3.3 异步 I/O 全流程

这里以 `fs.open()` 为例，说明 Node 与底层之间是如何执行异步 I/O 调用以及回调函数是如何被调用执行的。

#### 3.3.1 异步调用

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830175058672.png" alt="image-20240830175058672" style="zoom:50%;" />

Step1. JavaScript 调用核心模块 fs -> 核心模块 fs 调用 C/C++ 内建模块 -> 内建模块通过 libuv 进行系统调用。

Step2. 判断平台，以 Windows 为例，会调用 `uv_fs_open()` 方法，创建**请求对象** `FSReqWrap`。⭐

- 从 JavaScript 层传入的参数和 `uv_fs_open()` 方法封装在**请求对象** `FSReqWrap` 中。
- 同时，设置 `FSReqWrap.oncomplete_sym = callback`，即将回调函数设置在请求对象的 `oncomplete_sym`  属性上。

Step3. 在 Windows 下，调用 `QueueUserWorkItem()` 将**请求对象** `FSReqWrap` 推入**线程池**等待执行。

```cpp
QueueUserWorkItem($uv_fs_thread_proc, // 将要执行的方法的引用，即 uv_fs_thread_proc
                  req, // uv_fs_thread_proc 方法运行时所需要的参数，即请求对象 FSReqWrap、包含 JavaScript 层传入的参数、uv_fs_open() 方法，以及回调函数 callback。
                  WT_EXECUTEDEFAULT) // 执行的标志
```

Step4. 当线程池有可用线程时，`uv_fs_thread_proc()` 方法会被调用，其本质是调用了其**请求对象**参数 `FSReqWrap` 中的底层函数 `uv_fs_open()`，进一步说是 `fs_open()`。

此时，JavaScript 调用立即返回，JavaScript 线程可以继续执行当前任务的后续操作，对应的 I/O 操作在线程池等待执行即可，不管它是否阻塞 I/O，都不会影响到 JavaScript 线程的后续执行，如此就达到了异步的目的。 

> **请求对象**：在异步 I/O 中的重要中间产物，保存所有状态，用于参与线程池中的执行和处理 I/O 完成后的回调。

#### 3.3.2 回调执行

Step1. 线程池中的 I/O 操作调用完毕后，将获取的结果存储在**请求对象**的 `result` 属性上，即 `FSReqWrap.result`。

Step2. 调用 `PostQueuedCompletionStatus()` 通知 IOCP，表示**当前对象操作完成**，同时**将线程归还线程池**。

Step3. 每次 Tick 执行时，调用 ICOP 相关的 `GetQueuedCompletionStatus()` 获取通过 `PostQueuedCompletionStatus()` 提交的状态，用于检查线程池是否有执行完的请求。

Step4. 如果存在执行完的请求，则将**请求对象**放入 I/O 观察者的队列中，即将其看做事件处理。

Step5. I/O 观察者的回调函数会取出**请求对象**的 `result` 属性作为参数，取出 `oncomplete_sys` 属性作为方法，然后调用执行。

至此，整个异步I/O的流程完全结束。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240830180643451.png" alt="image-20240830180643451" style="zoom:50%;" />

### 3.4 Node 异步 I/O 模型

**异步 I/ O 模型 = 事件循环 + 观察者 + 请求对象 + I/O 线程池**

> 在 Windows 下，线程池由内核的 IOCP 提供，而在 \*nix 系统中，由 libuv 实现。
>
> Node.js 本身是**多线程**的，但其中的 JavaScript 执行是**单线程**的。
>
> 除了 JavaScript 代码，所有 I/O 操作都可以并行执行。

### 3.5 非 I/O 的异步 API ⭐

#### 3.5.1 setTimeout/setInterval（宏）

1. 解释：`setTimeout()` 和 `setInterval()` 与浏览器的 API 设计一致，分别用于**单次**和**多次**定时执行任务。

   > 注意：由于事件循环机制，定时器的执行时间并不十分精确。如果某次 Tick 的执行时间过长，可能会导致下一次 Tick 中的定时器超时执行。

2. 原理

   - Step1. `setTimeout()` 或 `setInterval()` 的调用会创建一个**定时器**。
   - Step2. 创建的定时器会被插入到**定时器观察者**内部的一个**红黑树**。
   - Step3. 事件循环的每次 Tick 执行时，Node 会从该红黑树中迭代取出定时器对象，**检查是否超过定时时间**。
   - Step4. 如果超过，则形成一个事件，其对应的**回调函数将立即执行**。

   <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240831130442234.png" alt="image-20240831130442234" style="zoom:50%;" />

#### 3.5.2 process.nextTick（微）

1. 解释：`process.nextTick(callback)` 会将回调函数添加到事件循环的**微任务队列**中。

   > 由于 `process.nextTick` 创建的是一个微任务，因此其执行优先级比 `setTimeout` 和 `setInterval` 创建的宏任务**高**。

2. 对比：`setTimeout` 开启一个**立即执行的异步任务**

   - 代码：`setTimeout(callback, 0)`；`process.nextTick(callback)`
   - 效率：`setTimeout` 时间复杂度为 O(log(n))；`process.nextTick` 的时间复杂度是 O(1)，后者显然更高效

#### 3.5.3 setImmediate（宏）

1. 解释：`setImmediate(callback)` 与 `process.nextTick(callback)` 类似，也是开启一个**立即执行的异步任务**，但是与之不同的是，其会将回调函数添加到事件循环机制的**宏任务队列**中。

   > `process.nextTick(callback)` 执行优先级**高**于 `setImmediate(callback)`。

2. 区别

   - `process.nextTick` 的回调函数保存在一个**数组**中；`setImmediate` 则是保存在**链表**中

   - `process.nextTick` 每次 Tick 会将数组中的所有回调函数**全部执行**；`setImmediate` 每次 Tick **执行链表中的一个**回调函数

     ```js
     // 加入两个 nextTick() 的回调函数 
     process.nextTick(function () { // ① 微任务，立即执行
       console.log('nextTick延迟执行1'); 
     }); 
     process.nextTick(function () { // ② 微任务，立即执行
       console.log('nextTick延迟执行2'); 
     }); 
     // 加入两个setImmediate()的回调函数 
     setImmediate(function () { // ③ 宏任务，等待所有微任务执行完毕后执行
       console.log('setImmediate延迟执行1'); 
       // 进入下次循环 
       process.nextTick(function () { // ④ 由于 ③ 还没执行完，当前微任务被添加到微任务队列，因此 ③ 执行完后，微任务立即执行
         console.log('强势插入'); 
       }); 
     }); 
     setImmediate(function () { // ⑤ 等待上一个宏任务 ④ 执行完立即执行
       console.log('setImmediate延迟执行2'); 
     }); 
     console.log('正常执行'); 
     /*
         其执行结果如下： 
         正常执行 
         nextTick延迟执行1 
         nextTick延迟执行2 
         setImmediate延迟执行1 
         强势插入 
         setImmediate延迟执行2 
     */
     ```

## 4. 异步编程

### 4.1 函数式编程

1. JavaScript 中的函数：在 JavaScript 中，函数（function）作为**一等公民**，使用上非常自由，无论调用它，或者作为参数，或者作为返回值均可。

2. 高阶函数：把**函数作为参数**，或是将**函数作为返回值**的函数。

   ```js
   function foo(x) { 
     return function () { 
       return x; 
     }; 
   } 
   ```

3. 偏函数：通过**指定部分参数来产生一个新的定制函数**的函数。

   ```js
   var isType = function (type) { 
     return function (obj) { 
       return Object.prototype.toString.call(obj) == '[object ' + type + ']'; 
     }; 
   }; 
   ```
