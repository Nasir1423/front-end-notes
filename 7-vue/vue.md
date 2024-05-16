# Vue

## 1. Vue 基础

### 1.1 Vue 简介

1. 介绍：Vue 是一套用于**构建用户界面**的**渐进式** JavaScript 框架

   - 构建用户界面：数据 → 界面
   - 渐进式：Vue 可以**自底向上**逐层的应用，对于简单应用只需一个轻量小巧的核心库，对于复杂应用则可以引入各种 Vue 插件

2. 特点

   - 采用**组件化**模式，提高代码复用率，增加代码可维护性

     > 组件化：每一个 `.vue` 文件对应 `html`、`css`、`js` 代码

   - **声明式编码**，相较于命令式编码，使开发人员无需直接操作 DOM，提高开发效率

     > <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240507200711700.png" alt="image-20240507200711700" style="width:90%;" />
     >
     > 命令式编码
     >
     > ```js
     > let htmlStr = '';
     > persons.forEach( p => {
     >     htmlStr += `<li>${p.id} - ${p.name} - ${p.age}</li>`
     > });
     > let list = document.getElementById('list');
     > list.innerHTML = htmlStr;
     > ```
     >
     > 声明式编码
     >
     > ```html
     > <ul id='list'>
     >     <li v-for='p in persons'>
     >         {{p.id}} - {{p.name}} - {{p.age}}
     >     </li>
     > </ul>
     > ```

   - 使用**虚拟 DOM** 和 **Diff 算法**，尽量复用 DOM 节点

     > <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240507201323961.png" alt="image-20240507201323961" style="width:80%;" />
     >
     > - Vue 先将数据转换为虚拟 DOM，然后再转换为真实 DOM 在网页上渲染
     > - 当数据发生改变后，Vue 会将所有数据转换为新的虚拟 DOM，同时使用 Diff 算法将新的虚拟 DOM 与旧的虚拟 DOM 进行比较，对于相同的虚拟 DOM，Vue 就会在页面中复用其对应的真实 DOM，否则才会在网页中创建新的真实 DOM
     > - 如果使用原生 JavaScript，则每次数据更新都会直接覆盖网页上的 DOM，即使存在相同数据对应的 DOM，也不会复用

### 1.2 搭建开发环境

1. 下载 vue.js 并通过 `script` 标签引入

   - [开发版本(Vue2)](https://v2.cn.vuejs.org/js/vue.js)
   - [生产版本(Vue2)](https://v2.cn.vuejs.org/js/vue.min.js)

2. 安装浏览器开发者工具 [Vue Devtools](https://devtools.vuejs.org/guide/installation.html)

3. 通过 `Vue.config` 取消生产提示：`Vue.config.productionTip=false`

   > 如果不生效，则直接去对应的 vue.js 中设置 `productionTip: false`

4. Vue 的第一个代码：[Hello World](./CODES/vue_basic/1-HelloWorld.html)

   - **创建 Vue 实例**：为了让 Vue 工作，必须创建一个 Vue 实例，同时传入一个配置对象，其中
     - `el`: 表示选择相应的容器
     - `data`: 表示存储供容器使用的数据
   - **Vue 模板语法**：容器中的代码仍符合 HTML 规范，但混入了一些特殊的 Vue 语法（如插值语法）。
   - **模板解析与数据渲染**：容器中的代码称之为 Vue 模板。Vue 实例创建后会解析模板，并将相应的数据渲染到页面。
   - **实例与容器的对应关系**：Vue 实例和容器是一一对应的。
   - **真实开发中的使用**：在真实开发中通常只有一个 Vue 实例，并且会配合着组件一起使用。
   - **插值语法**：容器中 `{{xxx}}` 中的 `xxx` 要写 JavaScript 表达式，`xxx` 可以自动读取到 `data` 中的所有属性。
   - **数据响应式**：一旦 `data` 中的数据发生改变，页面中用到该数据的地方也会自动更新。

### 1.3 [模板语法](./CODES/vue_basic/2-模板语法.html)

1. **插值语法**
   - 功能：解析**标签体**内容
   
   - 形式：`{{xxx}}`，其中 `xxx` 是 JavaScript 表达式，可直接读取到 `data` 中的所有属性
   
2. **指令语法**
- 功能：解析**标签** (包括标签属性、标签体内容、事件绑定...)
   - 形式举例：`v-bind:href='xxx'` (简写为 `:href='xxx'`)，其中 `xxx` 是 JavaScript 表达式，可直接读取到 `data` 中的所有属性
   
- 说明：Vue 中有多种指令，基本形式为 `v-???`

### 1.4 [数据绑定](./CODES/vue_basic/3-数据绑定.html)

1. **单向数据绑定** (`v-bind`)：数据只能从 `data` 流向页面

2. **双向数据绑定** (`v-model`)：数据不仅能从 `data` 流向页面，还可以从页面流向 `data`
3. 注意
   - 双向绑定一般应用在**表单类元素**的 `value` 属性上 (如 `input`、`select`)
   - `v-bind:标签名` 可以简写为 `:标签名`
   - `v-model:value` 可以简写为 `v-model`，因为 `v-model` 默认收集 `value` 值

### 1.5 [el 和 data 的两种写法](./CODES/vue_basic/4-el和data的两种写法.html)

1. el 的两种写法

   - `new Vue` 时配置 `el` 属性

   - 创建 Vue 实例后，通过 `vm.$mount` 指定 `el` 的值 (mount 有挂载的意思)

2. data 的两种写法

   - 对象式

   - 函数式 (学习到组件后，`data` 必须使用函数式指定)

3. 注意：Vue 管理的函数，一定不要写箭头函数，否则 `this` 指向 `Window` 而不是 Vue 实例

### 1.6 [MVVM](./CODES/vue_basic/5-Vue中的MVVM.html)

1. MVVM 模型
   - M (Model，模型)：`data` 中的数据
   - V (View，视图)：Vue 模板
   - VM (ViewModel，视图模型)：Vue 实例

2. 注意

   - `data` 中的所有属性最后都出现在了 Vue 实例上

   - Vue 实例上的所有属性以及 Vue 原型上的所有属性，都可以在 Vue 模板中直接使用

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240508111414661.png" alt="image-20240508111414661" style="width:55%;" />

### 1.7 [数据代理](./CODES/vue_basic/6-数据代理.html)

1. **[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 的使用**
   - **功能**：精确添加或修改对象上的属性，默认情况下，添加的属性是不可写、不可枚举和不可配置的。
   - **语法**：`Object.defineProperty(obj, prop, descriptor)`
   - **参数**：
     - `obj`：要定义属性的对象。
     - `prop`：指定要定义或修改的属性键（字符串或 Symbol）。
     - `descriptor`：属性的描述符，包括：
       - 通用描述符：
         - `configurable`：属性是否可删除，默认值为 false。
         - `enumerable`：属性是否可枚举，默认值为 false。
       - 数据描述符：
         - `value`：属性的值，默认值为 undefined。
         - `writable`：属性值是否可更改，默认值为 false。
       - 访问器描述符：
         - `get`：属性的 getter 函数，默认值为 undefined。
         - `set`：属性的 setter 函数，默认值为 undefined。
   - **返回值**：修改后的对象。
   - 注意事项：
     - 如果描述符中没有 `value`、`writable`、`get` 和 `set`，则视为数据描述符。
     - 如果描述符同时包含数据描述符和访问器描述符的键，则会抛出异常。
     - `getter`、`setter` 中的 `this` 指向 `obj`
2. **数据代理**：通过一个对象代理对另一个对象的属性进行操作（读/写）。
3. **Vue 中的数据代理**
   - 通过 `vm` 对象代理 `data` 对象中的属性操作（读/写）。
   - **好处**：更方便操作 `data` 中的数据（`vm.name` 等价于 `vm._data.name`，前者更简洁）。
   - **实现原理**：通过 `Object.defineProperty()` 把 `data` 对象中的所有属性添加到 `vm` 上，为每个属性指定一个 `getter/setter`，在 `getter/setter` 内部操作 `data` 中对应的属性。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240508151115105.png" alt="image-20240508151115105" style="width:70%;" />

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240508153557368.png" alt="image-20240508153557368" style="width: 50%;" />

### 1.8 [事件处理](./CODES/vue_basic/7-事件处理.html)

1. **绑定事件**
   - 使用 `v-on:xxx` 或 `@xxx` 绑定事件，其中 `xxx` 是事件名。
   - 事件的回调函数需要配置在 `options` 中的 `methods` 对象中，最终会被添加到 `vm` 上。
   - `methods` 中的回调函数不能使用箭头函数，否则 `this` 会指向 `Window`。
   - `methods` 中的回调函数都是被 Vue 所管理的函数，`this` 指向 `vm` 或组件实例对象（箭头函数除外）。
   - `@click="demo"` 和 `@click="demo($event)"` 效果相同，但后者可以传参，前者默认传入事件对象，后者需要通过 `$event` 接收事件对象。

2. **事件修饰符**
   - 通过 `@xxx.修饰符` 的方式修饰事件的触发效果。
   - 常用修饰符：
     - `prevent`：阻止事件默认行为，相当于 `event.preventDefault()`。
     - `stop`：阻止事件冒泡，相当于 `event.stopPropagation()`。
     - `once`：事件只触发一次。
     - `capture`：使用事件的捕获模式（默认事件冒泡模式）。
       - 事件捕获：事件从最外层开始发生，直到最具体的元素。
       - 事件冒泡：事件从最内层的元素开始发生，一直向上传播，直到 `document` 对象。
     - `self`：只有 `event.target` 是当前操作的元素时才触发事件。
     - `passive`：事件的默认行为立即执行，无需等待回调函数执行完毕。
       - 通常顺序：事件触发 => 回调执行 => 事件的默认行为执行。
       - 使用 `passive`：事件触发 => 事件的默认行为执行 => 回调执行。
   - 修饰符可以连续使用，如 `@click.stop.prevent` 表示绑定点击事件，同时阻止冒泡和默认行为。

3. **键盘事件**
   - 使用 `@keydown` 或 `@keyup` 绑定键盘事件。
   - 可以通过 `@keydown.别名/键码/键值/自定义键名` 绑定特定按键事件。
   - Vue 提供的按键**别名**：
     - `enter`：回车
     - `delete`：删除（包括 `Delete` 键和 `Backspace` 键）
     - `esc`：退出
     - `space`：空格
     - `tab`：制表符（必须搭配 `keydown` 事件使用）
     - `up`：上
     - `down`：下
     - `left`：左
     - `right`：右
   - 使用按键的**键码** (`key`) 绑定事件时，对于多个单词的键码，转换为短横线命名（kebab-case），如 `CapsLock` ==> `caps-lock`。
   - 不推荐使用**键值** (`keyCode`) 绑定事件，已从 Web 标准中废弃。
   - 可以使用 `Vue.config.keyCodes.自定义键名 = 键码` **定制**按键别名。
   - **系统修饰键**（`ctrl`、`alt`、`shift`、`meta`）用法特殊：
     - 配合 `keyup` 使用：按下修饰键同时，再按下其他键，随后释放其他键，事件才被触发。
     - 配合 `keydown` 使用：正常触发事件。
     - `meta` 即 `win` 键。
   - 可以为**组合键**绑定事件，如 `@keydown.ctrl.y` 表示同时按下 `ctrl + y` 时才触发事件。

### 1.9 [计算属性](./CODES/vue_basic/8-计算属性.html)

- **定义**：计算属性对应的属性并不存在，是通过已有属性计算得到的。

- **语法**：在 Vue 实例的 `options` 中的 `computed` 中设置计算属性，以对象形式配置 getter 和 setter，其底层借助 `Object.defineProperty` 实现。

  ```javascript
  computed: {
    计算属性名: {
      get() {
        return xxx;
      },
      set(value) {
        xxxxxx;
      }
    }
  }
  ```

- **getter、setter 的执行时机**：

  - **getter**：
    - 初次读取时会执行一次。
    
    - 依赖的数据发生改变时会再次执行。
  - **setter**：计算属性被修改时执行。
  - **注**：getter 和 setter 中的 `this` 指向当前 Vue 实例。

- **优势**：与 `methods` 相比，计算属性有缓存机制（即模板中多次使用计算属性时，仅第一次读取，后续取缓存值），方便复用，效率更高，便于调试。
  
- **注意事项**：
  - 计算属性最终都会出现在 `vm` 上，因此可以在模板中直接使用。
  - 计算属性如果需要修改，必须通过 setter 修改，且其中逻辑必须引起计算属性所依赖的数据发生改变。

- **简写语法**：当计算属性只有 getter 时（仅读），可以通过如下方式设置计算属性的 getter

  ```javascript
  computed: {
    计算属性名() {
      return xxx;
    }
  }
  ```

### 1.10 [监视属性](./CODES/vue_basic/9-监视属性.html)

1. **监视属性**：在 Vue 实例的 `options` 中的 `watch` 中配置。

   - **语法**

     - 方式一：在 `new Vue` 时传入 `watch` 配置进行监视

       ```javascript
       watch: {
         要监视属性: 配置对象
       }
       ```

     - 方式二：通过 `vm.$watch(要监视属性的字符串, 配置对象)` 进行监视

   - 注意事项

     - 当被监视的属性变化时，配置对象中的回调函数 `handler` 会自动调用，进行相关操作。`handler` 接受两个参数：被监视属性的新值和旧值。
     - 被监视的属性必须存在，才能进行监视。

2. **深度监视**：
   - Vue 的 `watch` 默认不监测对象内部值的改变（只监测一层）。
   - 配置 `deep: true` 可以监测对象内部值改变（多层）。
   - 注意事项
   
     - Vue 自身可以监测对象内部值的改变，但 Vue 提供的 `watch` 默认不可以（为了效率）。
   
     - 如果要深度监视 `numbers: { a: 1, b: 2 }`，则需要配置 `deep: true`；如果需要单独监视 `a`，则可以设置 `'number.a': 配置对象` 进行监视。
   
3. **监视属性的简写形式**：
   - 当被监视的属性的配置内容只有 `handler` 时可以使用简写形式。

   - 语法
   
     - 方式一
   
       ```javascript
       watch: {
         要监视属性(newValue, oldValue) {
           xxx;
         }
       }
       ```
   
     - 方式二
   
       ```javascript
       vm.$watch('要监视属性', function(newValue, oldValue) {
         xxx;
       });
       ```
   
4. **watch 和 computed 的区别**：
   
   - `computed` 能完成的功能，`watch` 都可以完成。
   - `watch` 能完成的功能，`computed` 不一定能完成，例如：`watch` 可以进行异步操作。
   
   - 注意事项
   
     - 所有被 Vue 管理的函数，最好写成普通函数，这样 `this` 的指向才是 `vm` 或组件实例对象。
   
     - 所有不被 Vue 管理的函数（定时器的回调函数、ajax 的回调函数、Promise 的回调函数等），最好写成箭头函数，这样 `this` 的指向才是 `vm` 或组件实例对象。

### 1.11 绑定样式

### 1.12 条件渲染

### 1.13 列表渲染

### 1.14 数据监测



<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240510215136723.png" alt="image-20240510215136723" style="width:80%;" />

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240510215442493.png" alt="image-20240510215442493" style="width:80%;" />

> 为什么以 index 作为 key 时，页面渲染结果会出错：这是因为 Vue 是**基于 key 值进行虚拟 DOM 比较的**，如果两个虚拟 DOM 相同则复用对应的真实 DOM，不同则将新的虚拟 DOM 转换为真实 DOM；而对于输入类元素，用户输入的内容是在真实 DOM 中的，而两个虚拟输入类 DOM 的比较是“考虑”不到输入框的内容的，因此 Vue 会认为这两个虚拟输入类 DOM 是相同的，从而复用旧的虚拟输入类 DOM 对应的真实 DOM，哪怕两个虚拟输入类 DOM 对应的真实 DOM 的输入框中的数据不同

### 1.15 收集表单数据

### 1.16 过滤器

### 1.17 内置指令

### 1.18 自定义指令

### 1.19 生命周期

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240515160735964.png" alt="image-20240515160735964" />

## 2. Vue 组件

### 2.1 非单文件组件

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240515224206142.png" alt="image-20240515224206142" style="width:70%;" />

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240515224423120.png" alt="image-20240515224423120" style="width:70%;" />

<img src="C:\Users\15787\AppData\Roaming\Typora\typora-user-images\image-20240515224522468.png" alt="image-20240515224522468" style="width:75%;" />

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240516120445079.png" alt="image-20240516120445079" style="width:80%;" />

### 2.2 单文件组件

## 3. Vue-cli

## 4. Vue-router

## 5. Vuex

## 6. element-ui

## 7. Vue3













