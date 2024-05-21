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
     - 配置对象可以配置 `handler` 回调，在监视属性改变时自动调用；`deep` 属性配置是否深度监视；`immediate` 属性配置是否立即执行 `handler` 回调；`deep` 和 `immediate` 默认情况下都为 false

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

### 1.11 [绑定样式](./CODES/vue_basic/10-绑定样式.html)

在 Vue 中，样式绑定是通过 `:class` 和 `:style` 来实现的，允许动态地控制元素的类名和内联样式。

1. `:class` 绑定样式：`v-bind:class` 简写为 `:class`，用于动态地绑定元素的类名。`xxx` 可以是**字符串、对象或数组**。

   - **字符串写法**：适用于类名不确定，需要动态获取的情况。例如 `<div :class="className"></div>` 中的 `className` 是一个字符串变量，动态返回类名。

   - **对象写法**：适用于要绑定多个样式，个数不确定，类名也不确定的情况。对象的键是类名，值是布尔值，布尔值决定类名是否被应用。例如：

     ```html
     <div :class="{ active: isActive, 'text-danger': hasError }"></div>
     ```

     如果 `isActive` 为 `true`，则 `active` 类就会被应用；如果 `hasError` 为 `true`，则 `text-danger` 类就会被应用

   - **数组写法**：适用于要绑定多个样式，个数确定，类名确定，但不确定用不用的情况。数组中的元素是类名的字符串或对象。例如：

     ```html
     <div :class="[isActive ? 'active' : '', errorClass]"></div>
     ```

     如果 `isActive` 为 `true`，则 `active` 类就会被应用；`errorClass` 是一个字符串变量，表示类名。

2. `:style` 绑定样式：`v-bind:style` 简写为 `:style`，用于动态地绑定元素的内联样式。`xxx` 可以是一个**样式对象**或一个**样式对象数组**。

   - **样式对象**：样式对象的键是样式名，采用**驼峰命名法**，值是动态值。例如：

     ```html
     <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
     ```

     其中 `activeColor` 和 `fontSize`  是数据属性，动态地控制颜色和字体大小。

   - **样式对象数组**：当需要应用多个样式对象时，可以使用数组形式。例如：

     ```javascript
     <div :style="[baseStyles, overridingStyles]"></div>
     ```

     其中 `baseStyles` 和 `overridingStyles` 都是样式对象，如果有重复的样式属性，后者会覆盖前者。 

### 1.12 [条件渲染](./CODES/vue_basic/11-条件渲染.html)

在 Vue 中，条件渲染用于根据条件动态地控制 DOM 元素的显示和隐藏。主要有两种方式：`v-if` 和 `v-show`。

1. `v-if`、`v-else-if`、`v-else`

   - `v-if` 根据表达式结果为 `true` 或 `false`，决定是否渲染对应的 DOM 元素。为 `false` 时，元素被完全移除。

   - `v-else-if` 是 `v-if` 的条件分支，只有在前面的 `v-if` 或 `v-else-if` 条件为 `false` 时，才会被判断和渲染。

   - `v-else` 是 `v-if` 的最后一个分支，当所有的 `v-if` 和 `v-else-if` 条件都为 `false` 时，渲染 `v-else` 对应的元素。

   - 使用场景：适用于**切换频率比较低**的场景，例如页面初始化或需要彻底移除和添加元素的情况。

   - 注意事项：`v-if` 可以和 `v-else-if`、`v-else` 一起使用，但要求结构不能被打断，必须是相邻的兄弟节点。例如：

     ```html
     <div v-if="condition1">A</div>
     <div v-else-if="condition2">B</div>
     <div v-else>C</div>
     ```

2. `v-show`

   - `v-show` 也是根据表达式结果为 `true` 或 `false`，决定是否显示对应的 DOM 元素。但这里是基于 `display: none` 实现的，即元素实际仍然存在于 DOM 中，只是用样式隐藏。
   - 适用场景：适用于**切换频率比较高**的场景，例如需要频繁显示和隐藏某个元素。

3. 注意事项

   - 当使用 `v-if` 时，DOM 元素在条件为 `false` 时会被完全移除，因此可能无法获取对应的 DOM 元素。

   - 使用 `v-show` 时，DOM 元素始终存在，只是通过样式隐藏，因此一定可以获取到对应的 DOM 元素。


### 1.13 [列表渲染](./CODES/vue_basic/12.1-基本列表.html)

1. **列表渲染**：在 Vue 中，`v-for` 指令用于渲染列表数据。通过遍历**数组、对象、字符串或指定次数**，可以动态生成相应的 DOM 结构。

   - **基本语法**

     ```html
     <li v-for="(a, b) in/of xxx" :key="yyy"></li>
     ```

     其中：

     - `a` 是迭代的元素。
     - `b` 是索引或键。
     - `xxx` 是要迭代的数据源。
     - `yyy` 是每一个列表元素的唯一标识，通常使用对应的 `id` 属性。

   - 当**遍历数组**时，`a` 是数组的元素，`b` 是索引。下述例子中，`items` 是一个数组，`item` 是数组的元素，`index` 是元素的索引。

     ```html
     <ul>
       <li v-for="(item, index) in items" :key="item.id">
         {{ index }}: {{ item.name }}
       </li>
     </ul>
     
     ```

   - 当**遍历对象**时，`a` 是对象的值，`b` 是键。下述例子中，`object` 是一个对象，`value` 是对象的值，`key` 是对象的键。

     ```html
     <ul>
       <li v-for="(value, key) in object" :key="key">
         {{ key }}: {{ value }}
       </li>
     </ul>
     ```

   - 当**遍历字符串**时，`a` 是字符，`b` 是索引。下述例子中，`string` 是一个字符串，`char` 是字符串中的字符，`index` 是字符的索引。

     ```html
     <ul>
       <li v-for="(char, index) in string" :key="index">
         {{ index }}: {{ char }}
       </li>
     </ul>
     ```

   - 可以通过**指定次数来迭代**，从 0 开始。下述例子中，将会迭代 10 次，`number` 是当前的迭代次数（从 0 到 9），`index` 是索引。

     ```html
     <ul>
       <li v-for="(number, index) in 10" :key="index">
         {{ index }}: {{ number }}
       </li>
     </ul>
     ```

   - 注意事项：`key` 是必不可少的，应该为每个列表元素提供一个**唯一标识**，以便 Vue 能够高效地更新和渲染列表。通常情况下，最好使用元素的唯一 `id` 作为 `key`。

2. [列表渲染中 `key` 的原理](./CODES/vue_basic/12.2-key的原理.html)：在 Vue 和 React 中，`key` 的作用是帮助虚拟 DOM 高效地进行差异比较和更新。正确使用 `key` 可以显著提升应用的性能和可靠性。选择适当的 `key`（如唯一标识）可以避免不必要的 DOM 更新，确保数据和界面状态的一致性。

   <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240510215136723.png" alt="image-20240510215136723" style="width:80%;" />

   <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240510215442493.png" alt="image-20240510215442493" style="width:80%;" />

   > 为什么以 index 作为 key 时，页面渲染结果会出错：这是因为 Vue 是**基于 key 值进行虚拟 DOM 比较的**，如果两个虚拟 DOM 相同则复用对应的真实 DOM，不同则将新的虚拟 DOM 转换为真实 DOM；而对于输入类元素，用户输入的内容是在真实 DOM 中的，而两个虚拟输入类 DOM 的比较是“考虑”不到输入框的内容的，因此 Vue 会认为这两个虚拟输入类 DOM 是相同的，从而复用旧的虚拟输入类 DOM 对应的真实 DOM，哪怕两个虚拟输入类 DOM 对应的真实 DOM 的输入框中的数据不同

   -  **虚拟 DOM 中 `key` 的作用**

     - `key` 是虚拟 DOM 对象的**标识符**。

     - 当数据发生变化时，Vue 会根据新数据生成新的虚拟 DOM。

     - Vue 会对新的虚拟 DOM 和旧的虚拟 DOM 进行**差异比较**（diffing），而 `key` 在这个过程中起到了关键作用。

   - **对比规则**

     - **旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 `key`：**
       - **内容未变：** 直接复用之前的真实 DOM，避免不必要的更新。
       - **内容改变：** 生成新的真实 DOM，替换掉页面中之前的真实 DOM。
     
      - **旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 `key`：**
        - 创建新的真实 DOM，并将其渲染到页面中。

      - **用 `index` 作为 `key` 可能引发的问题**
        - **逆序添加、逆序删除等破坏顺序操作：**会导致没有必要的真实 DOM 更新，降低性能。例如，逆序操作会导致所有元素都被重新渲染，即使大部分元素的内容没有改变。
          
        - **包含输入类的 DOM：**使用 `index` 作为 `key` 可能导致 DOM 更新错误。例如，在表单输入元素中，用户的输入可能会被意外重置或错误应用到其他元素。
     
    - **开发中如何选择 `key`**
   - **最佳选择：** 使用每条数据的唯一标识作为 `key`，例如 id、手机号、身份证号、学号等唯一值。
     
   - **特殊情况：** 如果数据不会进行逆序添加、逆序删除等操作，并且列表仅用于展示，可以使用 `index` 作为 `key`。但是，这通常不建议，因为一旦需求变化，代码可能需要重构。
   
3. 对于[列表过滤](./CODES/vue_basic/12.3-列表过滤.html)和[列表排序](./CODES/vue_basic/12.4-列表排序.html)，我们可以通过计算属性实现

### 1.14 [数据监测](./CODES/vue_basic/13-数据监测.html)

Vue 提供了强大的数据监测机制，使得在数据变化时能够自动更新视图。

1. **Vue 监测数据的范围**：Vue 会监测 `data` 对象中**所有层次的数据**，包括嵌套的对象和数组。

2. 如何**监测对象中的数据**：通过 `setter` 实现监测

   - 在 `new Vue` 实例化时，Vue 会遍历 `data` 对象中的所有属性，并通过 `Object.defineProperty` 为每个属性设置 `getter` 和 `setter`。
   - 这样，当属性值发生变化时，Vue 能够检测到并触发视图更新。

   - **新增属性的处理策略**

     - 对象中后追加的属性，Vue **默认不会做响应式处理**。即使属性值发生变化，视图也不会更新。

     - 为了使新添加的属性具备响应式，需使用以下 API：
       - `Vue.set(target, propertyName/index, value)`
       - `vm.$set(target, propertyName/index, value)`


3. 如何**监测数组中的数据**：包裹数组更新方法

   - Vue 通过**包裹数组的变异方法**来实现监测，这些方法包括：`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`。

   - 当调用这些方法更新数组时，Vue 会执行两件事：
     - 调用原生对应的方法对数组进行更新。
     
     - 重新解析模板，更新视图。

   - 注意事项：**直接修改数组中的某个元素不会触发视图更新**！！！，因此需要使用以下方法：
     - `Vue.set(array, index, value)`
     - `vm.$set(array, index, value)`


4. **注意事项**
   - `Vue.set` 和 `vm.$set` 的限制：`Vue.set()` 和 `vm.$set()` 不能给 Vue 实例或 Vue 实例的根数据对象（如 `data`）添加属性。这些方法**只能用于嵌套的对象或数组**。
   - 数组元素的响应式：**数组元素本身不是通过 `setter` 实现响应式处理的**，但如果数组元素是对象，其属性是通过 `setter` 实现响应式处理的。

### 1.15 [收集表单数据](./CODES/vue_basic/14-收集表单元素.html)

在 Vue 中，`v-model` 提供了简洁的方式绑定和收集表单数据，不同类型的表单元素收集的数据有所不同。利用 `v-model` 的修饰符可以进一步控制数据的收集方式，提升开发效率和用户体验。

1. 收集**文本输入框** (`<input type="text"/>`)的数据：`v-model` 绑定的是 `value` 属性，用户输入的内容就是 `value` 值。

   ```html
   <input type="text" v-model="textValue" />
   ```

2. 收集**单选按钮** (`<input type="radio"/>`)的数据：`v-model` 绑定的是 `value` 属性，需为每个单选按钮配置 `value` 值。

   ```html
   <input type="radio" v-model="radioValue" value="option1" />
   <input type="radio" v-model="radioValue" value="option2" />
   ```

3. 收集**复选框** (`<input type="checkbox"/>`)的数据

   - **未配置 `value` 属性**：`v-model` 绑定的是 `checked` 属性，值为布尔类型，表示是否勾选。

     ```html
     <input type="checkbox" v-model="isChecked" />
     ```

   - **配置 `value` 属性**：

     - **v-model 的初始值是非数组**：`v-model` 绑定的是 `checked` 属性，值为布尔类型。

       ```html
       <input type="checkbox" v-model="isChecked" value="option1" />
       ```

     - **v-model 的初始值是数组**：`v-model` 绑定的是 `value` 组成的数组，复选框的值会添加到数组中。

       ```html
       <input type="checkbox" v-model="checkedValues" value="option1" />
       <input type="checkbox" v-model="checkedValues" value="option2" />
       ```

4. v-model 的**修饰符**

   - **lazy**：数据在输入框失去焦点时收集。
     
     ```vue
     <input type="text" v-model.lazy="textValue" />
     ```
   
   
      - **number**：输入的字符串转换为有效的数字。
        
        ```vue
        <input type="text" v-model.number="numericValue" />
        ```
   
   
      - **trim**：自动过滤输入的首尾空格。
        
        ```vue
        <input type="text" v-model.trim="textValue" />
        ```
   


### 1.16 [过滤器](./CODES/vue_basic/15-过滤器.html)

过滤器（Filters）在 Vue 中用于对数据进行特定格式化后再显示，适用于一些简单逻辑的处理。

1. **定义**：过滤器用于对显示的数据进行**格式化处理**，不改变原数据，只产生新的格式化数据。

2. **语法**

   - **注册过滤器**

     - **全局注册**
       
       ```javascript
       Vue.filter('filterName', function(value) {
         // 格式化逻辑
         return formattedValue;
       });
       ```
       
     - **局部注册**
       
       ```javascript
       new Vue({
         el: '#app',
         data: {
           // ...
         },
         filters: {
           filterName(value) {
             // 格式化逻辑
             return formattedValue;
           }
         }
       });
       ```


   - **使用过滤器**

     - **模板语法**
       
       ```vue
       {{ value | filterName }}
       ```
       
     - **绑定属性**
       
       ```vue
       <div v-bind:attribute="value | filterName"></div>
       ```


3. **过滤器的注意事项**

   - 过滤器**接收额外参数**，用于进一步的格式化。如

     ```vue
     {{ value | filterName(param1, param2) }}
     ```

     相当于：
     ```javascript
     filterName(value, param1, param2);
     ```

   - **多个过滤器可以串联使用，前一个过滤器的输出作为后一个过滤器的输入**。

     ```vue
     {{ value | filter1 | filter2(param) | filter3(param1, param2) }}
     ```

     相当于：

     ```javascript
     filter3(filter2(filter1(value), param), param1, param2);
     ```

   - 过滤器**不会改变原始数据**，过滤器只对显示的数据进行处理，不会修改原数据。

### 1.17 [内置指令](./CODES/vue_basic/16-内置指令.html)

$\textbf{\LARGE{已学指令}}$

|                 指令                  |                       语法                        |                             功能                             |
| :-----------------------------------: | :-----------------------------------------------: | :----------------------------------------------------------: |
|               `v-bind`                |     `v-bind:xxx="yyy"` <br />或 `:xxx="yyy"`      | 单向绑定表达式<br />`xxx` 是属性名，`yyy` 是 JavaScript 表达式。 |
|               `v-model`               |  `v-model:value="yyy"` <br />或 `v-model="yyy"`   |       双向数据绑定，<br />`yyy` 是 JavaScript 表达式。       |
|                `v-for`                |              `v-for="xxx in/of yyy"`              | 遍历数组、对象、字符串等，<br />`yyy` 可以是对象、数组、字符串、数字，`xxx` 根据 `yyy` 类型不同而不同。 |
|                `v-on`                 |      `v-on:xxx="yyy"` <br />或 `@xxx="yyy"`       |    绑定事件监听，<br />`xxx` 是事件名，`yyy` 是回调函数。    |
| `v-if`<br />`v-else-if`<br />`v-else` | `v-if="yyy"`<br />`v-else-if="yyy"`<br />`v-else` |   动态控制节点是否存在，<br />`yyy` 是 JavaScript 表达式。   |
|               `v-show`                |                  `v-show="xxx"`                   |   动态控制节点是否展示，<br />`yyy` 是 JavaScript 表达式。   |

$\textbf{\LARGE{其他指令}}$​

|   指令    |      语法      |                             功能                             |
| :-------: | :------------: | :----------------------------------------------------------: |
| `v-text`  | `v-text="yyy"` |       渲染文本内容，<br />`yyy` 是 JavaScript 表达式。       |
| `v-html`  | `v-html="yyy"` | 渲染包含 HTML 结构的内容，<br />`yyy` 是 JavaScript 表达式。 |
| `v-cloak` |   `v-cloak`    | Vue 实例创建并接管容器后会删除 `v-cloak` 属性，结合 CSS 选择器可以防止页面加载时插值表达式的闪烁。 |
| `v-once`  |    `v-once`    |      初次渲染后视为静态内容，不会再更新，用于性能优化。      |
|  `v-pre`  |    `v-pre`     | 跳过所在节点的编译过程，适用于没有使用指令和插值语法的节点，能加快编译速度。 |

注意事项

- `v-text` 与插值语法的区别：`v-text` 会替换掉节点中的所有内容，即使 `yyy` 是 HTML 字符串，也只会以文本形式渲染。

- `v-html` 与插值语法的区别：`v-html` 会替换掉节点中的所有内容，并识别 HTML 结构。

- `v-html` 的安全性问题：使用 `v-html` 有 XSS 攻击的风险，一定要在可信的内容上使用，不要用在用户提交的内容上。

- `v-cloak` 常结合 CSS 中的属性选择器使用，用于在 Vue 实例加载前隐藏对应元素

  ```css
  [v-cloak] {
    display: none;
  }
  ```

### 1.18 [自定义指令](./CODES/vue_basic/17-自定义指令.html)

1. **局部指令语法**

   - **对象式**

     ```js
     new Vue({
       directives: {
         '指令名': {
           bind(el, binding, vnode) { /* 绑定时调用 */ },
           inserted(el, binding, vnode) { /* 插入时调用 */ },
           update(el, binding, vnode) { /* 更新时调用 */ }
         }
       }
     });
     ```

   - **函数式**

     ```js
     new Vue({
       directives: {
         '指令名': function(el, binding, vnode) {
           // 绑定或更新时调用
         }
       }
     });
     ```

2. **全局指令语法**

   - **对象式**

     ```js
     Vue.directive('指令名', {
       bind(el, binding, vnode) { /* 绑定时调用 */ },
       inserted(el, binding, vnode) { /* 插入时调用 */ },
       update(el, binding, vnode) { /* 更新时调用 */ }
     });
     ```

   - **函数式**

     ```js
     Vue.directive('指令名', function(el, binding, vnode) {
       // 绑定或更新时调用
     });
     ```

3. **配置对象中的三个回调函数**

   |  回调函数  |             调用时机             |                       用途                        |
   | :--------: | :------------------------------: | :-----------------------------------------------: |
   |   `bind`   |     指令与元素成功绑定时调用     |         可以在这里进行一次性的初始化操作          |
   | `inserted` |   指令所在元素被插入页面时调用   | 可以在这里进行 DOM 操作，因为此时元素已经在页面上 |
   |  `update`  | 指令所在模板结构被重新解析时调用 |     可以在这里根据数据更新进行相应的 DOM 操作     |

4. **函数式定义指令的回调函数调用时机**

   - 指令与元素成功绑定时（即指令与元素仅在内存中建立关系，元素尚未呈现在页面上）。

   - 指令所在的模板被重新解析时（即 `data` 中的数据一旦改变，模板便会重新解析）。


5. **注意事项**
   - **使用时加 `v-`**：定义指令时不加 `v-` 前缀，但使用指令时需要加 `v-` 前缀。
   - **命名规则**：指令名如果是多个单词，使用 `kebab-case` 命名方式，例如 `v-my-directive`，不要使用 `camelCase` 命名方式。
   - **`this` 指向**：所有指令对应的回调函数中的 `this` 都是 `window` 对象，而不是 Vue 实例。

### 1.19 [生命周期](./CODES/vue_basic/18-生命周期.html)

1. **生命周期概述**

   - **定义**: 生命周期（也称生命周期回调函数、生命周期函数、生命周期钩子）是 Vue 在特定时刻调用的一些命名函数。

   - **生命周期函数**:
     - `beforeCreate`
     - `created`
     - `beforeMount`
     - `mounted`
     - `beforeUpdate`
     - `updated`
     - `beforeDestroy`
     - `destroyed`

   - **`this` 指向**: 在生命周期函数中，`this` 指向的是 Vue 实例 (`vm`) 或组件实例对象。


2. **关于模板的进一步说明**

   - **通过 HTML 代码指定模板**:

     ```html
     <div id="root">
       <h1 :style="{opacity}">Welcome to {{name}}</h1>
     </div>
     <script>
       new Vue({
         el: "#root",
         // 其他配置
       });
     </script>
     ```

     上述示例中，`id="root"` 的 `div` 及其内部元素属于 Vue 模板。

   - **通过 `template` 配置指定模板**:

     ```html
     <div id="root"></div>
     <script>
       new Vue({
         el: "#root",
         template: `
           <div>
             <h1 :style="{opacity}">Welcome to {{name}}</h1>
           </div>
         `
       });
     </script>
     ```

     在这种情况下，`template` 中的内容属于 Vue 模板，`id="root"` 的 `div` 及其内部元素被**忽略**。此外，`template` 指定的 HTML 结构**顶层只能是一个节点**。

3. **常用的生命周期钩子**

   - **`mounted()`**:

     - **调用时机**: 组件挂载到 DOM 后调用。

     - **典型用途**: 发送 AJAX 请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。

   - **`beforeDestroy()`**:

     - **调用时机**: 组件销毁前调用。

     - **典型用途**: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

4. **关于销毁 Vue 实例**

   - **开发者工具**: 销毁后，通过 Vue 开发者工具无法看到任何信息。

   - **事件处理**: 自定义事件失效，但原生 DOM 事件依然有效。

   - **数据操作**:一般不会在 `beforeDestroy` 中操作数据，因为即使操作数据，也不会触发更新流程。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240515160735964.png" alt="image-20240515160735964" />

## 2. Vue 组件

### 2.1 [非单文件组件](./CODES/vue_component/1-非单文件组件.html)

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240515224206142.png" alt="image-20240515224206142" style="width:70%;" />

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240515224423120.png" alt="image-20240515224423120" style="width:70%;" />

<img src="C:\Users\15787\AppData\Roaming\Typora\typora-user-images\image-20240515224522468.png" alt="image-20240515224522468" style="width:75%;" />

1. **Vue 组件使用的三大步骤**

   - **第一步：定义组件**

     - **语法**: `Vue.extend(options)`

     - **注意事项**: 定义组件的配置对象和创建实例的配置对象基本相同，除了以下三点
       - **不能写 `el` 属性**: 因为所有的组件都由一个 `vm` 实例管理，`vm` 的 `el` 决定服务哪个容器。
       - **`data` 必须是函数**: 这样可以确保每个组件实例都有独立的数据，避免组件复用时数据存在引用关系。
       - **`template` 属性**: 用于定义组件的结构。


   - **第二步：注册组件**

     - **局部注册**:
       
       ```javascript
       new Vue({
         components: {
           '组件名': 组件对象
         }
       });
       ```

     - **全局注册**:
       
       ```javascript
       Vue.component('组件名', 组件对象);
       ```


   - **第三步：使用组件** `<组件名></组件名>`

2. **组件定义的简写方式**：可以将 `Vue.extend(options)` 简写为 `options`。
   - 注意: 引入组件时，底层还是会调用 `Vue.extend` 方法。


3. **组件命名规则**

   - **一个单词组成**
     - 小写: `school`
     - 大写: `School`
   - **多个单词组成**
     - `kebab-case` 命名: `my-school`
     - `CamelCase` 命名: `MySchool` (需要 Vue 脚手架支持)

   - **注意事项**:
     - 避免使用 HTML 中已有的元素名称，例如: `h2`。
     - 可以在 `options` 中使用 `name` 配置项指定组件在开发者工具中呈现的名字。


4. **组件标签写法**

   - **第一种写法**: `<school></school>`

   - **第二种写法**: `<school/>`，不使用脚手架时会导致后续组件不能渲染。


5. **组件的嵌套**：即在组件的 `options` 中通过 `components` 为当前组件注册子组件。
   - 注意：一般只给 `vm` 注册一个名为 `app` 的子组件，然后再给 `app` 组件注册其余组件，便于管理。


6. **关于 `VueComponent`**

   - `Vue.extend(options)` 生成的组件本质是一个名为 `VueComponent` 的**构造函数**。

   - 当在模板中使用组件时，Vue 会自动帮我们创建对应组件的**实例对象**，即执行 `new VueComponent(options)`。

   - **`this` 指向**:
     - **组件配置中**:
       - `data` 函数、`methods`、`watch`、`computed` 中的函数的 `this` 均是【VueComponent 实例对象】。
     - **Vue 实例配置中**:
       - `data` 函数、`methods`、`watch`、`computed` 中的函数的 `this` 均是【Vue 实例对象】。
   - **注意**:
     - 每次调用 `Vue.extend`，返回的都是一个全新的 `VueComponent`。
     - `VueComponent` 的实例对象简称 `vc` (组件实例对象)，`Vue` 的实例对象简称 `vm`。


7. **Vue 和 VueComponent 的原型关系**

   - `VueComponent.prototype.__proto__ === Vue.prototype`

   - 这使得组件实例对象（`vc`）可以访问到 Vue 原型上的属性和方法。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240516120445079.png" alt="image-20240516120445079" style="width:80%;" />

### 2.2 [单文件组件](./CODES/vue_component/2-单文件组件)

1. **单文件组件概述**

   - **定义**: 单文件组件（SFC，Single File Component）是 Vue 的一种组件格式，每个组件都写在一个 `.vue` 文件中，包含了模板、脚本和样式。

   - **结构**: 一个 `.vue` 文件通常包含以下三个部分：
     - **`<template>`**: 定义组件的 HTML 结构。
     - **`<script>`**: 定义组件的逻辑和交互，使用 JavaScript（通常是 ES6+）。
     - **`<style>`**: 定义组件的样式，可以使用 CSS、SCSS、LESS 等预处理器。

2. **单文件组件三大部分**

   - `<template>` 标签：用于编写组件的 HTML 结构。

     ```html
     <template>
       <div class="my-component">
         <h1>{{ title }}</h1>
         <p>{{ description }}</p>
       </div>
     </template>
     ```

   - `<script>` 标签：定义组件的逻辑，包括数据、方法、生命周期钩子等。此外，可以使用 ES6 模块化语法导出和导入组件。

     ```html
     <script>
     export default {
       name: 'MyComponent',
       data() {
         return {
           title: 'Hello, World!',
           description: 'This is a single file component.'
         };
       }
     };
     </script>
     ```

   - `<style>` 标签：定义组件的样式。此外，可以使用 `scoped` 属性将样式限定在当前组件内，避免影响全局样式。

     ```html
     <style scoped>
     .my-component {
       font-family: Arial, sans-serif;
     }
     h1 {
       color: blue;
     }
     </style>
     ```

3. **使用 Vue 脚手架**

   - **必要性**: 只有在使用 Vue 脚手架（如 Vue CLI）时，才能正确解析和使用 `.vue` 文件，因为脚手架提供了必要的构建工具（如 `vue-loader`）来处理这些文件。

   - **开发体验**: Vue 脚手架自动化了开发环境的配置，提供了热重载、预处理器支持、代码分割等现代开发特性。

4. **模块化导出和导入**

   - **导出组件**: 在 `<script>` 标签中使用 `export default` 导出组件。

   - **导入组件**: 在另一个组件或 Vue 实例中使用 `import` 导入组件。

     ```html
     // 导出组件
     <script>
     export default {
       name: 'MyComponent',
       // 其他选项
     };
     </script>
     
     // 导入组件
     <script>
     import MyComponent from './MyComponent.vue';
     
     export default {
       components: {
         MyComponent
       },
       // 其他选项
     };
     </script>
     ```

## 3. Vue-cli

### 3.1 [Vue-cli 介绍](./CODES/vue_scaffold/src_1_脚手架初体验)

1. **介绍**：Vue-cli 又称 Vue 脚手架（Command Line Interface），是 Vue 官方提供的[标准化开发工具](https://cli.vuejs.org/zh)，最新版本是 `5.x`

2. **安装与启动**

   - 全局安装：`npm install -g @vue/cli`

     > 安装完成后，可以通过 `vue -V` 查看脚手架版本以验证是否安装成功

   - 创建项目（需切换到指定目录下）： `vue create xxx`

   - 启动项目：`npm run serve`

3. **脚手架目录结构**

   ```
   ├── node_modules 
   ├── public
   │   ├── favicon.ico: 页签图标
   │   └── index.html: 主页面
   ├── src
   │   ├── assets: 存放静态资源
   │   │   └── logo.png
   │   │── component: 存放组件
   │   │   └── HelloWorld.vue
   │   │── App.vue: 汇总所有组件
   │   │── main.js: 入口文件
   ├── .gitignore: git 版本管制忽略的配置
   ├── babel.config.js: babel 的配置文件
   ├── package.json: 应用包配置文件 
   ├── README.md: 应用描述文件
   ├── package-lock.json：包版本控制文件
   ```

4. **关于 Vue 的不同版本**

   - `vue.js` 是**完整版**的 Vue，包含：**核心功能 + 模板解析器**。

   - `vue.runtime.xxx.js` 是**运行版**的 Vue，只包含：**核心功能，~~没有模板解析器~~**。

   - 注1：脚手架中 `main.js` 引入的 Vue 属于运行版的 Vue，因此无法在 Vue 实例对象中使用 `template` 这个配置项，此时的 vue 因为没有模板解析器而无法解析；替代的，我们可以在 Vue 实例对象中使用 `render` 配置项指定一个函数，用于渲染 `App` 组件

     ```vue
     new Vue({
     	render: createElement => createElement(App),
     	/* render 函数接收一个参数 createElement，它是一个用于创建虚拟 DOM 元素的函数。然后，createElement(App) 将会创建一个 App 组件的虚拟 DOM 元素，最终作为 render 函数的返回值。 */
     })
     ```

   - 注2：在脚手架中，组件中可以使用 `template` 标签，而 Vue 实例对象中只能使用 `render` 函数。

5. **关于默认配置**

   - **查看**默认配置：在项目目录的命令行中输入命令 `vue inspect > output.js`，此时项目目录中会自动生成一个 output.js 文件，其中内容就是默认配置
   - **修改**默认配置：在项目目录下的 vue.config.js 中对配置进行个性化定制，[配置文档](https://cli.vuejs.org/zh/config/#vue-config-js)

### 3.2 ref

- **定义**：`ref` **属性**可以看作是 `id` 的替代者

- **作用**：属性 `ref` 可以用来给**元素或子组件注册引用信息**，然后就可以在当前组件中使用组件实例对象（或指向其的 `this`）获取到对应的**真实 DOM 元素**或**组件实例对象**

- **语法**

  - **注册**：`<标签名 ref="xxx"></标签名>`
  - **获取**：`this.$refs.xxx`

- **示例**：app.vue

  ```vue
  <template>
    <div>
      <h1 v-text="msg" ref="title"></h1>
      <button ref="btn" @click="showDOM">点我输出上方的 DOM 元素</button>
      <School ref="sch" />
    </div>
  </template >
  
  <script>
  //引入School组件
  import School from "./components/School";
  
  export default {
    name: "App",
    components: { School },
    data() {
      return {
        msg: "欢迎学习 Vue！",
      };
    },
    methods: {
      showDOM() {
        console.log(this.$refs.title); // 真实 DOM 元素
        console.log(this.$refs.btn); // 真实 DOM 元素
        console.log(this.$refs.sch); // School 组件的实例对象（vc）
      },
    },
  };
  </script>
  ```

### 3.3 props

- **定义**：`props` **配置项**可以让组件**接收外部传来的数据**

- **语法**

  - **传递数据** `<标签名 属性名1="属性值1", 属性名2="属性值2"></标签名>`

    > 注意：如果要**传入数字**，可以使用 `v-bind:xxx="yyy"` **动态绑定**的方式，因为此时传入的内容是 `yyy` 执行后的结果

    ```vue
    <Student name="李四" sex="女" :age="18"/>
    ```

  - **接收数据**

    - 方式一：**简单声明接收** `props: ['属性名1', '属性名2']`

      ```vue
      export default {
      	props:['name','age','gender'] 
      }
      ```

    - 方式二：**限制类型接收** `props: { 属性名1: 数据类型, 属性名2: 数据类型 }`

      > 注意：这里的**数据类型**可以写 `String`、`Number`、`Boolean` 等

      ```vue
      export default {
          props: {
              name: String,
              age: Number,
              gender: String
          }
      }
      ```

    - 方式三：**限制类型和必要性、指定默认值接收**

      ```vue
      props: { 
      	属性名1: { 
      		type: 数据类型,
      		required: true/false,
      		default: value
      	},
          属性名2: { 
              type: 数据类型,
              required: true/false,
              default: value
          }
      }
      ```

      > 注意：`type` 指定**数据类型**（取值 `String`、`Number`、`Boolean` 等），`required` 指定数据的**必要性**（取值 `true` 或 `false`），`default` 指定数据的**默认值**

      ```vue
      export default {
          props: {
              name: {
                  type: String,
                  required: true,
              },
              age: {
                  type: Number,
                  default: 99
              },
              sex: {
                  type: String,
                  required: true
              }
          }
      }
      ```

- **注意事项**

  - `props` 接收的参数是**只读**的，Vue 底层会监测你对 `props` 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请**复制 `props` 的内容到 `data` 中**一份，然后去修改 `data` 中的数据。

    > 这种解决方法可行的原因在于：**`props` 配置项的优先级比 `data` 配置项的优先级高**，因此 Vue 会先将 `props` 配置项接收到的属性放置到 `vc` 上，然后再处理 `data` 配置项，而此时 `data` 配置项的回调函数中已经可以访问到 `props` 配置项传入并放置到 `vc` 上的属性了，从而可以将数据拷贝到 `data` 中

    ```vue
    export default {
        data() {
            return { myAge:this.age }
        },
        props: ['age'] 
    }
    ```

  - 传递数据时，不能传入 `key`、`ref` 等 `Vue` 内置属性，如 ~~`<Student ref="xxx"></Student>`~~

### 3.4 mixin

- **定义**：我们可以在 `src/mixin.js` 中定义并暴露一个 `mixin` 对象，包含**多个组件共用的配置信息**，然后在对应组件中可以**通过 `mixins` 配置项局部引入**对应的配置信息，或在入口文件中**通过 `Vue.mixin` 函数全局引入**对应的配置信息

  > `mixin` 中存储的配置信息包括 `data`、`methods`、生命周期函数等等，与 `options` 的内容基本相同

- **语法**

  - **定义** `mixin` 对象（在 `src/mixin.js` 文件中）

    ```js
    export const mixinBehavior = {
        methods: {
            showName(){
                alert(this.name);
            }
        },
        mounted(){
            console.log("组件实例对象 or Vue 实例对象已挂载");
        }
    }
    export const mixinInfo = {
        data(){
            return { x: 100, y: 200 }
        }
    }
    ```

  - **使用** `mixin` 对象

    - **全局使用**（在入口文件 `src/main.js`  中）`Vue.mixin(mixin 对象)`

      > 注意：此时引入的 `mixin` 对象中的配置信息被添加给了 Vue 实例和所有组件实例对象

      ```js
      import {mixinBehavior, mixinInfo} from './mixin'
      
      Vue.mixin(mixinBehavior);
      Vue.mixin(mixinInfo);
      ```

    - **局部使用**（在对应组件的 `mixins` 配置中）`mixins: [mixin 对象]`

      ```vue
      import {mixinBehavior, mixinInfo} from './mixin'
      
      default export {
      	mixins: [mixinBehavior, mixinInfo]
      }
      ```

- **注意事项**：如果 Vue 实例或组件实例对象使用了 `mixin`，同时 `mixin` 中的配置信息和实例本身的配置信息发生了**冲突**，此时

  - 如果发生冲突的内容为 **`data` 中的数据或 `methods` 中的方法**，则**以实例自身配置内容为主**
  - 如果发生冲突的内容为**生命周期**，则**二者都会在对应时机调用**，其中 **`mixin` 中配置的生命周期先调用，实例中配置的生命周期后调用**

### 3.5 plugin

- **定义**：我们可以在 `src/plugins.js` 中定义并暴露一个插件对象，用于**增强 Vue**。

  > 插件对象中包含一个 `install` 方法，该方法**第一个参数是 `Vue`**，第二个以后的参数是使用插件时传递的参数

- **语法**

  - **定义插件**（在 `src/plugins.js` 文件中）

    > 因为 `install` 方法接受的第一个参数是 `Vue`，因此我们可以在插件中进行一些**全局配置**，如全局过滤器、全局指令、全局 `mixin` 等等，同时也可以给 Vue **原型对象上添加方法和属性**

    ```js
    export default {
    	install(Vue, a, b, c){
            // 1. 添加全局过滤器
            Vue.filter(....)
    
            // 2. 添加全局指令
            Vue.directive(....)
    
            // 3. 配置全局混入(合)
            Vue.mixin(....)
    
            // 4. 添加实例方法
            Vue.prototype.$myMethod = function () {...}
            Vue.prototype.$myProperty = xxxx
    	}
    }
    ```

  - **使用插件**（在入口文件 `main.js` 中）`Vue.use(插件对象)`

    ```js
    import plugin from './plugins'
    
    Vue.use(plugin, 1, 2, 3)
    ```

### 3.6 scoped、lang

- 组件中的 `style` 标签中使用 `scoped` 可以确保当前组件中定义的**样式只在组件内生效**，防止样式冲突

  > 一般来说，**App 组件中不使用 `scoped` 限制样式作用范围**，否则只有 App 组件内定义的 HTML 标签才可以应用对应的样式，而在组件实例对象上无法生效

  ```vue
  <style scoped>
      .title{
          color: red;
      }
  </style>
  ```

- 组件中的 `style` 标签中使用 `lang` 可以**控制样式语法**，默认值为 `css`，也可以使用 `less`

  > 如果要使用 `less` 样式，则必须 `npm install less-loader` 才可以解析，同时注意 `less-loader` 和 `webpack` 版本的兼容性

### 3.7 TodoList 案例分析

[TodoList 初版](./CODES/vue_scaffold/src_2_TodoList案例_初版)

[TodoList 本地存储](./CODES/vue_scaffold/src_3_TodoList案例_本地存储)

[TodoList 自定义事件](./CODES/vue_scaffold/src_4_TodoList案例_自定义事件)

[TodoList 全局事件总线](./CODES/vue_scaffold/src_6_TodoList案例_全局事件总线)

...

---

1. **组件化编码流程**：
   - **拆分静态组件**：按照功能点拆分组件；组件命名不要与 HTML 元素冲突，避免歧义。
   - **实现动态组件**：考虑数据存放位置，决定数据的管理方式
     - **一个组件在用**：数据放在该组件自身即可。
     - **多个组件在用**：将数据放在这些组件的共同父组件上，通过状态提升来管理。
   
   - **实现交互**：从绑定事件开始，处理用户交互逻辑。
   
2. **props 适用场景**

   - **父组件 ==> 子组件 通信**：父组件通过 props 向子组件传递数据。
   - **子组件 ==> 父组件 通信**：父组件可以通过**传递一个回调函数**（作为 prop）给子组件，子组件调用此函数来与父组件通信。

3. **使用 v-model 注意事项**：使用 `v-model` 时，绑定的值不能是通过 props 传递过来的值，因为 props 是只读的，不可修改。

4. **修改 props 传递的对象类型值**：如果 props 传递的是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。最好遵循 Vue 的单向数据流原则，避免直接修改 props 传递的对象。

### 3.8 WebStorage

- **定义**：浏览器端通过 `Window.sessionStorage` 和 `Window.localStorage` 属性来实现**本地存储机制**，存储内容大小一般支持 5MB 左右
- API
  - `xxxxxStorage.setItem('key', 'value');` 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
  - `xxxxxStorage.getItem('person');` 该方法接受一个键名作为参数，返回键名对应的值。
  - `xxxxxStorage.removeItem('key');` 该方法接受一个键名作为参数，并把该键名从存储中删除。
  - `xxxxxStorage.clear();` 该方法会清空存储中的所有数据。
- **注意事项**
  - `SessionStorage` 存储的内容会随着浏览器窗口关闭而消失；但 `LocalStorage` 存储的内容，需要手动清除（如调用上述 API 或清空浏览器缓存）才会消失。
  - `xxxxxStorage.getItem(xxx)` 如果 xxx 对应的 value 获取不到，那么 `getItem` 的返回值是 null，此时`JSON.parse(null)`的结果依然是 null。

### 3.9 组件自定义事件

- **定义**：组件的自定义事件是一种**组件间的通信方式**（**子组件 ===> 父组件**）。当子组件需要向父组件传递信息时，可以通过触发自定义事件实现。父组件在子组件的实例上绑定自定义事件，并传递回调函数。子组件触发该事件时，会调用父组件提供的回调函数，从而实现信息传递。

- **语法**

  - **绑定自定义事件**（在父组件中）

    - 方式一 `<子组件名 @自定义事件名="回调函数名">` 或 `<子组件名 v-on:自定义事件名="回调函数名">`

      > 可以使用 `@自定义事件名.once` 或 `v-on:自定义事件名.once` 的方式让自定义事件只能触发一次

    - 方式二：给组件实例对象添加 `ref="xxx"` 属性，然后通过父组件的 `$refs.xxx.$on("自定义事件名", 回调函数名)` 的方法绑定自定义事件，这种方式更加灵活，因为可以选择自定义事件的绑定时机

      ```vue
      <template>
      	<Student ref="student"/>
      </template>
      <script>
      	export default {
              mounted(){
                  this.$ref.xxx.$on('stuEvent', this.speakName)
              }
          }
      </script>
      ```

      > 可以使用 `$ref.xxx.$once("自定义事件名", 回调函数)` 的方式让绑定的自定义事件只能触发一次
      >
      > 此外，这里绑定的回调函数**要么配置在 `methods` 中，要么使用箭头函数**，否则函数中的 `this` 指向会出错

  - **触发自定义事件**（在子组件中）`this.$emit("自定义事件名", 数据)`

    > 这里的 `this` 指向**子组件实例对象**，这里的数据**作为回调函数的形参传递**

  - **解绑自定义事件**（在子组件中）

    - 解绑一个自定义事件 `this.$off("自定义事件名")`
    - 解绑多个自定义事件 `this.$off(["自定义事件名1", "自定义事件名2"])`
    - 解绑所有自定义事件 `this.$off()`

- **注意事项**：我们也可以给子组件**绑定原生 DOM 事件**，此时需要使用 **`native` 事件修饰符**，如 `<Student @click.native="demo"/>`，这也相当于给子组件 `template` 的根元素标签添加了一个 `click` 事件

### 3.10 [GlobalEventBus](./CODES/vue_scaffold/src_5_全局事件总线)

- **定义**：全局事件总线是一种**组件间的通信方式**，适用于任意组件间通信。

- **语法**

  - **安装全局事件总线**（在入口文件 `main.js` 中）

    ```js
    new Vue({
        ...
        beforeCreate() {
        	Vue.prototype.$bus = this; // 安装全局事件总线 $bus 为 Vue 实例
    	},
        ...
    })
    ```

    > 为什么将  `vm`  添加到 `Vue` 原型上就是安装全局事件总线？
    >
    > 1. 由于 `VueComponent.prototype.__proto__ === Vue.prototype`，因此**在 `Vue` 原型上添加的内容可以被所有组件实例对象“看见”**
    > 2. 由于 `$on`、`$once`、`$off`、`$emit` 等方法定义在 `Vue.prototype` 上，因此**只能选择组件实例对象（`vc`）或 Vue 实例（`vm`）作为全局事件总线**，此时才能实现绑定自定义事件、解绑自定义事件、触发自定义事件等操作

  - **使用全局事件总线**

    - **接收数据**（在接收数据的组件中）

      ```js
      export default {
      	...
      	methods: {
      		demo(data) { ... } // 回调函数
      	},
      	...
      	mounted() {
      		/* 为全局事件总线绑定自定义事件，并设置事件触发时执行的回调函数 */
              /* 注：绑定的既可以是 methods 中配置的回调函数，也可以是箭头函数 */
      		this.$bus.$on("自定义事件名", this.demo);
          	/* 注：以下这种方式绑定的自定义事件只能被触发一次 */
          	// this.$bus.$once("自定义事件名", this.demo);
          	/* 注：一般在 mounted 生命周期中绑定自定义事件 */
      	},
          ...
      	beforeDestroy(){
          	/* 解绑全局事件总线上的自定义事件 */
          	this.$bus.$off("自定义事件名");
          	/* 为什么要解绑？因为组件实例销毁后，全局事件总线上的自定义事件并不会被销毁，多余 */
      	}
      }
      ```

    - **提供数据**（在发送数据的组件中）

      ```js
      this.$bus.$emit("自定义事件名", data)
      ```

- **注意事项**：全局事件总线在 Vue 中可以被视为一个**中间人**角色。它用于在**任意组件之间传递数据**。当一个组件需要**接收来自其他组件的数据**时，可以在该组件内**为全局事件总线绑定一个自定义事件，并指定相应的回调函数**。此时，当其他组件需要**发送数据**时，只需**触发全局事件总线上的对应自定义事件并传递数据**。接收数据的组件将会执行相应的回调函数，处理收到的数据。这样，通过全局事件总线，组件之间的通信变得更加方便和灵活，不再需要直接引用或嵌套彼此，从而减少了组件之间的耦合度，提高了代码的可维护性。

### 3.11 [消息订阅与发布](./CODES/vue_scaffold/src_7_消息订阅与发布)

- **定义**：消息订阅与发布是一种**组件间的通信方式**，适用于任意组件间通信。与全局事件总线类似，但消息订阅与发布更多的是一种概念，我们这里采用 `pubsub-js` 这个实现

- **包的下载与导入**

  - **安装** `npm i pubsub-js`
  - **导入** `import pubsub from "pubsub-js"`

- **语法**

  - **订阅**（在接收数据的组件中）

    ```js
    export default {
    	...
    	methods: {
    		demo(msgName ,data) { ... } // 回调函数
    	},
    	...
    	mounted() {
    		/* 为当前组件订阅消息，并设置消息发布时执行的回调函数 */
            /* 注：绑定的既可以是 methods 中配置的回调函数，也可以是箭头函数 */
            this.pid = pubsub.subscribe("自定义消息名", this.demo);
        	/* 注：一般在 mounted 生命周期中订阅消息 */
    	},
        ...
    	beforeDestroy(){
        	/* 取消当前组件订阅的消息 */
        	pubsub.unsubscribe("自定义消息名");
    	}
    }
    ```

    > 订阅消息时，指定的回调函数的第一个参数为消息名 `msgName`，之后的参数才是消息发布时的数据 `data`，这一点与全局事件总线的回调函数不同

  - **发布**（在发送数据的组件中）

    ```js
    pubsub.publish("自定义消息名", data)
    ```

- **注意事项**：消息订阅与发布机制可以用于在 Vue 中的**任意组件之间传递数据**。当一个组件需要**接收来自其他组件的数据**时，它可以**订阅某个消息，并指定一个回调函数来处理该消息**。当其他组件需要**发送数据**时，只需**发布相同名称的消息并传递数据**。接收数据的组件将会执行相应的回调函数来处理收到的数据。这样，通过消息订阅与发布机制，组件之间的通信变得更加灵活，不需要直接引用对方。这不仅减少了组件之间的耦合度，还提高了代码的可维护性。

- **组件通信小结**
  - **Props**：用于父子组件间通信，父组件向子组件传递数据，或子组件通过回调向父组件传递数据。
  - **自定义事件**：用于子组件向父组件传递数据，父组件在子组件上绑定自定义事件，子组件触发事件传递数据。
  - **全局事件总线**：适用于任意组件间通信，通过一个全局的事件总线实例进行事件的**发送 (`$emit`) 和监听 (`$on`)**。
  - **消息订阅与发布**：通过**订阅 (`subscribe`) 和发布 (`publish`)**消息，在任意组件间进行通信。

### 3.12 nextTick

- **语法**：`this.$nextTick(回调函数)`

- **作用**：在下一次 DOM 更新结束后执行其指定的回调。

- **适用时机**：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 `nextTick` 所指定的回调函数中执行。
- **注意事项**：这里的回调函数最好是用箭头函数，以确保 `this` 指向其组件实例对象

### 3.13 过渡与动画

- **定义**：Vue 封装的**过渡与动画效果**通过 `transition` 或 `transition-group` **标签和特定名称的类名**实现

- **标签语法**（`template` 中）

  - `transition` 标签用于包裹要过渡或播放动画的**元素**，可以指定 `name` 属性和 `appear` 属性
  - `transition-group` 标签用于包裹要过渡或播放动画的**多个元素**，可以指定 `name` 属性和 `appear` 属性，同时需要为标签内的每个元素指定唯一 `key` 值
  - 注：`name` 属性可以理解为需要过渡或播放动画的元素设置一个标记；`appear` 是一个布尔属性，该属性表示**一上来就执行过渡或动画效果**

- **样式语法**（`style` 中）

  <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240519120455268.png" alt="image-20240519120455268" style="width:60%;" />

  - **元素进入类名**

    |                 元素类名                  |            含义            |
    | :---------------------------------------: | :------------------------: |
    |        `v-enter`<br />`name-enter`        | 元素进入的起点时添加的类名 |
    | `v-enter-active`<br />`name-enter-active` | 元素进入的过程中添加的类名 |
    |     `v-enter-to`<br />`name-enter-to`     |  元素进入的终点添加的类名  |

  - **元素离开类名**

    |                 元素类名                  |            含义            |
    | :---------------------------------------: | :------------------------: |
    |        `v-leave`<br />`name-leave`        | 元素退出的起点时添加的类名 |
    | `v-leave-active`<br />`name-leave-active` | 元素退出的过程中添加的类名 |
    |     `v-leave-to`<br />`name-leave-to`     |  元素退出的终点添加的类名  |

  - 注
    - 这里的 `name` 就是 `transition` 或 `transition-group` 标签指定的属性；如果不指定 `name` 属性，则要使用 `v-xxx` 这样的类名去设置样式
    - 元素的进入和退出可以理解为元素的渲染与移除（如通过 `v-show` 指令实现）
    - 通过设置以上六种类名对应的样式，Vue 会帮我们实现过渡或动画效果
      - 实现动画效果，往往使用 `v-enter-active` 和 `v-leave-active` 这两个类名，在其中配置 `animation` 样式实现动画效果
      - 实现过渡效果，往往使用 `v-enter`、`v-enter-to`、`v-leave`、`v-leave-to` 这四个类名，在其中配置四个时间点的元素样式，使用 `v-enter-active` 和 `v-leave-active`，在其中配置 `transition` 样式实现过渡效果 

- **[动画效果实现示例](.\CODES\vue_scaffold\src\components\Test1.vue)**：需要自定义动画；设置元素进入和退出的过程的样式（应用动画）；`transiton` 标签包裹动画元素

- **[过渡效果实现示例](.\CODES\vue_scaffold\src\components\Test2.vue)**：需要设置元素进入、进入过程、进入终点、退出、退出过程、退出终点的样式；`transition` 标签包裹过渡元素

- **[引入第三方效果库](.\CODES\vue_scaffold\src\components\Test3.vue)**：以 `animate.css` 为例

  - Step1：**安装** `npm install animate.css --save`

  - Step2：**导入** `import 'animate.css';`

  - Step3：**使用** `transition` 或 `transition-group` 标签设置 `name=animate__animated animate__bounce`，然后 `enter-active-class` 和 `leave-active-class` 可以设置为网站上对应的动画名

    ```vue
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__fadeOutUp"
    >
      <h1 v-show="isShow">你好，世界</h1>
    </transition>
    ```

## 4. Vue 中的 Ajax

### 4.1 [配置代理](.\CODES\vue_ajax\src_1_配置代理)（解决 Ajax 跨域问题）

当使用 Ajax 向服务器发送请求时，浏览器的**同源策略**（即协议名、主机名、端口号必须一致）可能会导致无法正常获取服务器响应，这种现象称为**跨域问题**。解决跨域问题的方法有以下几种：

1. **CORS**：通过在服务器响应中添加特殊的响应头。
2. **JSONP**：利用 HTML 标签不受同源策略限制的特点来跨域请求，但只适用于 GET 请求，实际应用较少。
3. **配置代理服务器**：代理服务器充当前端和后端之间的桥梁。代理服务器与前端同源，当前端发送请求时，代理服务器接收并转发给后端服务器，然后将后端服务器的响应返回给前端。这种策略的实现基于代理服务器与后端服务器之间不受同源策略限制的原理。代理服务器的实现有两种方式：**nginx** 或 **vue-cli**，这里介绍第二种方式（Vue 脚手架）的代理服务器的配置。

---

**Vue-cli 配置代理服务器的两种方式**（在 `vue.config.js` 中对 `devServer` 字段进行配置）

> 假设浏览器地址和代理服务器地址为 `http://localhosr:8080`，后端服务器地址为 `http://localhost:5000` 和 `http://localhost:5001`

- **方式一**：以下示例相当于 8080 端口的浏览器向 `http://localhost:5000/students` 地址发送了请求

  ```js
  /* 网页中通过 axios 向代理服务器（8080）发送请求 */
  axios
      .get("http://localhost:8080/students")
      .then((res) => {
        console.log("请求成功 ", res.data);
      })
      .catch((err) => {
        console.log("请求失败 ", err.message);
      });
  ```

  ```js
  /* 配置代理服务器，将浏览器请求转发到后端服务器（5000） */
  devServer: {
      proxy: 'http://localhost:5000'
  }
  ```

  > **优点**：**配置简单**，请求资源时直接发给前端（8080）即可
  >
  > **缺点**：**不能配置多个代理**；**不能灵活的控制请求是否走代理**
  >
  > 注意事项：若按照上述配置代理，**当请求了前端存在的资源时（即 public 文件夹下的静态资源）会优先匹配其中的资源，否则才会将该请求转发给服务器**

- **方式二**：以下示例相当于 8080 端口的浏览器向 `http://localhost:5001/cars` 地址发送了请求

  ```js
  axios
      .get("http://localhost:8080/api/cars")
      .then((res) => {
        console.log("请求成功 ", res.data);
      })
      .catch((err) => {
        console.log("请求失败 ", err.message);
      });
  ```

  ```js
  devServer: {
      proxy: {
        /* 匹配所有以 /api 开头的请求 */
        "/api": {
          target: 'http://localhost:5001', // 配置将用户的请求转发到该服务器
          changeOrigin: true, // true（默认值），则表示后端服务器收到的请求头是 5001（欺骗后端服务器）；false，则表示后端服务器收到的请求头是 8080（真诚）
          ws: true, // true 表示支持 websocket
          pathRewrite: { '^/api': '' } // 用于将转发的请求路径中的 /api 删除掉
        },
      }
  }
  ```

  > **优点**：**可以配置多个代理**；**可以灵活地控制请求是否走代理**（只有使用了对应前缀的请求才走代理，否则就不走代理）
  >
  > **缺点**：**配置略微繁琐**，请求资源时必须添加前缀

### 4.2 [github 搜索案例](.\CODES\vue_ajax\src_2_github搜索案例)

### 4.3 vue-resource 插件（发送 Ajax 请求）

发送 Ajax 请求主要有以下五种方式，

- **xhr**：原生 Ajax 请求发送方式（内置）
- **jQuery**：封装了对 DOM 的操作，以及 Ajax 请求的发送
- **axios**：封装了 Ajax 请求的发送，返回的是一个 Promise 对象（Vue 官方推荐使用）
- **fetch**：也是一个内置的发送 Ajax 请求的方式，但是不常用，因为 fetch 返回的是一个两层 Promise 对象，并且存在其他问题
- **vue-resource**：vue1.0 时期使用的一个插件，封装了 Ajax 请求的发送操作（官方不再维护）

**当我们需要发送 Ajax 请求时，推荐使用 axios**，这里简单介绍一下使用 **vue-resource** 插件发送 Ajax 请求的方式

- STEP1 下载：`npm i vue-resource`

- STEP2 引入（main.js 中）：`import vueResource from "vue-resource"`

- STEP3 使用（main.js 中）：`Vue.use(vueResource)`

- STEP4 发送请求（对应的组件中）

  ```js
  this.$http.get(url[, options])
      .then(response => {
      	...
  	}).catch(error => {
      	...
  	})
  ```

  > 注：当使用 vue-resource 插件后，Vue 实例和组件实例对象身上便多了一个 `$http` 属性，其用法相当于 axios，都会返回一个 Promise 对象

### 4.4 插槽

- **定义**：插槽是一种**组建间通信的方式**（**父组件 ==> 子组件**），可以让**父组件向子组件指定位置插入 html 结构**。可以将插槽理解为“**挖坑填土**”，子组件中“挖一个坑”（`slot` 标签），父组件可以使用 html 结构“填充”双标签形式的子组件的标签体，此时子组件中的这个“坑”就被父组件填充的 html 结构替换了。

- **分类**：**默认插槽、具名插槽、作用域插槽**

- [**默认插槽**](.\CODES\vue_ajax\src_3_默认插槽)

  - **“挖坑”（子组件中）**：使用 `slot` 标签定义一个插槽，当父组件用 html 结构填充子组件标签体后，子组件中的 `slot` 标签被替换为了该 html 结构；否则，`slot` 标签会被替换为其中定义的默认内容。

    ```vue
    ......
    <!-- 定义一个默认插槽 -->
    <slot>这里是默认内容</slot>
    ......
    ```

  - **“填土”（父组件中）**

    ```vue
    <子组件名>
        HTML 结构
    </子组件名>
    ```

  - 注意事项：如果子组件中定义了多个默认插槽，则父组件会把每个插槽都视作一个“坑”，将子组件标签体中的填充的 HTML 结构同样的替换每一个默认插槽

- [**具名插槽**](.\CODES\vue_ajax\src_4_具名插槽)

  - **“挖坑”（子组件中**）：使用带 `name` 属性的 `slot` 标签定义一个具名插槽，子组件的 `slot` 标签只会被父组件中通过 `slot` 属性或 `v-slot` 属性（后者仅限 `template` 标签使用）标记（标记值必须与插槽名相同）的 HTML 结构替换；否则，`slot` 标签会被替换为其中定义的默认内容

    ```vue
    ......
    <!-- 定义一个名为 center 的具名插槽 -->
    <slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot>
    <!-- 定义一个名为 footer 的具名插槽 -->
    <slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot>
    ......
    ```

  - **“填土”（父组件中）**

    ```vue
    <!-- 方式一：普通标签 + slot="xxx" -->
    <子组件名>
        <!-- img 标签填充子组件中名为 center 的具名插槽 -->
        <img slot="center" src="xxx" />
        <!-- img 标签填充子组件中名为 footer 的具名插槽 -->
        <a slot="footer" href="xxx">点击获取更多</a>
    </子组件名>
    ```

    ```vue
    <!-- 方式二：template 标签 + v-slot:xxx/slot="xxx" -->
    <子组件名>
        <!-- template 标签其中的内容 (不包括 template) 填充子组件中名为 center 的具名插槽 -->
        <template slot="center">
        	<video controls src="xxx"></video>
        </template>
        <!-- template 标签其中的内容 (不包括 template) 填充子组件中名为 footer 的具名插槽 -->
        <template v-slot:footer>
            <div class="foot">
                <a href="xxx">经典</a>
                <a href="xxx">热门</a>
                <a href="xxx">推荐</a>
            </div>
            <h4>Welcome</h4>
        </template>
    </子组件名>
    ```

  - 注意事项

    - 具名插槽更像“人回家”，有不同的“家”（具名插槽），但只有指定了“居住地址”（name）的 “人”（HTML 结构）才能回到自己的“家”中。
    - 此外，只有 `template` 标签中才可以使用 `v-slot:xxx` 的方式指定插槽名，对于其他标签，只能通过 `slot=xxx` 的方式指定插槽名。
    - `template` 标签最后不会被渲染到页面中

- [**作用域插槽**](.\CODES\vue_ajax\src_5_作用域插槽)：数据存储在子组件中，但是父组件给子组件标签体填充的 HTML 结构要访问子组件数据时，就要使用作用域插槽。

  - **“挖坑”（子组件中**）：通过给 `slot` 标签设置 `属性名="属性值"` 的方式，可以向外（父组件填充的该组件标签体的 HTML 结构）暴露出一个对象，对象的键就是设置的属性名，对象的值就是设置的属性值。父组件中填充的 HTML 结构中要访问到这个暴露的对象，就要包裹在一个 `template` 标签中，并且在 `template` 标签中使用 `scope=xxx` 或 `slot-scope=xxx` 的方式访问到这个对象，`xxx` 此时就是这个暴露的对象，此时可以在 `template` 标签中的所有地方访问到这个对象。

    ```vue
    <template>
        <div>
            <!-- 定义了一个作用域插槽，父组件在该组件对应的标签体中填充的 HTML 结构可以访问该插槽暴露的对象 { games: ['红色警戒','穿越火线','劲舞团','超级玛丽'], title: "游戏", msg: "hello"} -->
            <slot :games="games" :title="title" msg="hello" ></slot>
        </div>
    </template>
    
    <script>
        export default {
            name:'Category',
            // 数据在子组件自身，但是需要被父组件填充在子组件标签体中的内容所访问
            data() {
                return { games:['红色警戒','穿越火线','劲舞团','超级玛丽'], title: "游戏" }
            },
        }
    </script>
    ```

  - **“填土”（父组件中）**

    ```vue
    <!-- 方式一：template 标签 + scope="xxx" -->
    <子组件名>
        <!-- 此时 gamesObject = { games: ['红色警戒','穿越火线','劲舞团','超级玛丽'], title: "游戏", msg: "hello"} -->
        <template scope="gamesObject">
            <ul>
                <li v-for="(game,index) in gamesObject.games" :key="index">{{g}}</li>
            </ul>
        </template>
    </子组件名>
    ```

    ```vue
    <!-- 方式二：template 标签 + scope="xxx" + 解构赋值 -->
    <子组件名>
        <!-- 此时 games: ['红色警戒','穿越火线','劲舞团','超级玛丽'] -->
        <template scope="{games}">
            <ol>
                <li style="color:red" v-for="(g,index) in games" :key="index">{{g}}</li>
            </ol>
        </template>
    </子组件名>
    ```

    ```vue
    <!-- 方式二：template 标签 + slot-scope="xxx" + 解构赋值 -->
    <子组件名>
        <!-- 此时 games: ['红色警戒','穿越火线','劲舞团','超级玛丽'] -->
        <template slot-scope="{games}">
            <h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
        </template>
    </子组件名>
    ```

  - 注意事项
    - 作用域插槽也可以设置 `name` 属性，此时的插槽是**作用域＆具名插槽**
    - 可以用 ES6 解构赋值获取作用域插槽向外暴露的数据的部分内容

## 5. Vuex

### 5.1 Vuex 介绍

1. **定义**：[Vuex ](https://github.com/vuejs/vuex)是一个 **Vue 插件**，用于在 Vue 中实现**集中式状态/数据管理**（读/写）。Vuex 也是一种**组建间通信**的方式，适用于**任意组件间通信**。
2. **使用场景**：多个组件需要**共享**数据时。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240521125409333.png" alt="image-20240521125409333" style="width:70%;" />

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240521125557685.png" alt="image-20240521125557685" style="width:70%;" />

### 5.2 Vuex 的基本原理

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240521131205317.png" alt="image-20240521131205317" style="width:70%;" />

> 注意：**Vuex 主要包括 Actions、Mutations、State 三个部分**，这三个部分都是对象 `{}`，且被 `store` **统一管理**。此外，有时候 Vue Component 也可以略过 `Dispatch`，而直接 `Commit`。

### 5.3 搭建 Vuex 环境

- STEP1：安装 `vuex`

  ```powershell
  npm install vuex@3
  ```

  > 兼容性注意：vue2 对应安装 vuex3 版本，vue3 对应安装 vuex4 版本，因为这里使用的是 vue2，故而需要安装 vuex3 版本，否则会因为不兼容而报错

- STEP2：在 `src/store/index.js` 中创建 `store` 并默认暴露

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex); // 只有使用插件 Vuex 后才可以创建 store 对象，否则会报错
  
  const actions = {}; // 用于响应组件中用户的动作
  const mutations = {}; // 用于修改 state 中的数据
  const state = {}; // 保存具体的数据
  
  /* 创建并暴露 Vuex 中的 store 对象 */
  export default new Vuex.Store({ actions, mutations, state });
  ```

- STEP3：在 `main.js` 中引入 `store`，并传入 Vue 实例的配置中

  ```js
  import Vue from 'vue'
  import App from './App.vue'
  import store from './store' // 当导入路径为一个文件夹时，则会自动导入对应文件夹下的 index.js 文件
  
  Vue.config.productionTip = false
  
  new Vue({
    render: h => h(App),
    /* 当使用 Vue.use(Vuex) 后，创建 Vue 实例时可以传入一个 store 配置项，
    并且之后在 Vue 实例和组件实例对象身上出现 $store 属性 */
    store
  }).$mount('#app')
  ```

  > 脚手架中 import 使用的注意：Vue-cli 在解析文件时，会**先将所有的 import 语句汇总到最上边再依次执行**，因此一个文件中，import 语句是最先执行的，而无论其位置如何。因此，必须在 `src/store/index.js` 中引入 Vue 并执行 Vue.use(Vuex)，如果在 `main.js` 中进行的话就会报错，因为 `import store from 'src/store'` 先执行，此时还没有 `Vue.use(Vuex)`  故会报错。

### 5.4 基本使用

1. **介绍**：根据 [Vuex 的基本原理图](###52 Vuex 的基本原理) 可知，Vuex 通过 `actions`、`mutations`、`state` 三个对象实现**共享数据的操作与管理**。

   - 其中 `actions` 对象中存储用户的动作，`mutations` 对象中存储数据的操作，`state` 对象中存储要共享的数据。

   - Vue 实例通过 `store` 配置传入一个 `Vuex.Store(options)` 对象，其中 `options = { actions, mutations, state }`，然后 Vue 实例和组件实例对象中都会有一个 `$store` 对象。

   - 借助 `$store` 对象，组件实例对象可以对数据进行操作与管理，标准流程为
     - **VueComponent ==> Actions**：`this.$store.dispatch("动作名", 数据)`
     - **Actions ==> Mutations**：`context.commit("操作名", 数据)`
     - **Mutations ==> State**：`state.属性名 = xxx` 等，直接对共享数据进行操作

2. **语法**

   - **组件实例对象发出动作**：通过 `$store` 对象的 `dispatch` 实现，接收两个参数，第一个表示动作名，第二个表示数据值。

     > 组件实例对象也可以通过 `$store.state.共享数据名` 的方式访问到共享数据

   - **actions**：对象，其中可以定义一系列**动作**，不同动作的取值为一个**回调函数**，接收两个参数 `context` 和 `value`。`context` 可以使用 `commit` 方法触发对应操作的回调，并将 `value`  传入。

     > actions 中的动作对应的回调函数中可以实现定时器、发送 AJAX 请求等操作

     ```js
     const actions = {
         动作名(context, value){
             ...
             context.commit("操作名", value);
             ...
         }
     }
     ```

   - **mutations**：对象，其中可以定义一系列**操作**，不同操作的取值为一个**回调函数**，接收两个参数 `state` 和 `value`；通过 `state` 可以直接修改所有共享数据。

     ```js
     const mutations = {
         操作名(state, value){
             ...
             state.共享数据名，这里对共享数据进行一系列操作
             ...
         }
     }
     ```

   - **state**：对象，存储着所有**共享数据**。Vuex 最终会对其中的数据进行响应式处理。

     ```js
     const state = {
         xxxxxx
         共享数据名: 值,
         xxxxxx
     }
     ```

3. **注意事项**

   - 一般而言，**动作名以小写形式命名，操作名以大写形式命名**
   - 组件实例对象中，也可以**通过 `$store.state.共享数据名` 的方式访问和修改共享数据**（不建议修改，此时开发者工具会失效）
   - 如果没有网络请求或其他业务逻辑，组件实例对象也**可以略过 actions，直接使用 `$store.commit("操作名", 数据)` 提交数据修改操作**，此时对应操作的回调函数会执行，修改共享数据
   - 动作的回调函数中的 `context` 参数不仅可以调用 `commit` 执行对应的操作的回调，从而修改共享数据，也可以调用 `dispatch` 执行对应的动作的回调，从而降低代码的复杂程度。

### 5.5 getters 配置项

- **定义**：`getters` 是一个创建 `store` 对象时传入的**非必要的配置项**，可以对 `state` 中的数据进行**加工**。可以将 `state` 类比 `data`，`getters` 类比 `computed`。`getters` 也是一个对象，其中定义了一系列加工后的数据，不同数据的取值为一个回调函数的返回值，每个回调函数接收一个 `state` 参数，可以藉此访问到共享数据，回调返回值就是加工后的数据值。

- **语法**

  - **`getters` 定义**

    ```js
    const getters = {
        数据名(state){
            /* 这里可以对 state 中的共享数据进行操作 */
            return 数据值
        }
    }
    ```

  - **`getters` 用于创建 `store` 对象**

    ```js
    export default new Vuex.Store({
        actions, // 必要
        mutations, // 必要
        state, // 必要
        getters
    })
    ```

  - **`getters` 中数据的访问**：组件实例对象中，可以通过 `$store.getters.加工数据名` 的方式访问到 `getters` 中定义的加工后的数据

### 5.6 四个 Map 方法

当我们想要在组件实例对象中访问到 `state` 中的共享数据、访问到 `getters` 中加工后的数据、发送一个 `action` 或者一个提交 `commit` 时，常常需要使用以下语法

```js
this.$store.state.numer; // state 中定义的共享数据 number
this.$store.getters.bigNumber; // getter 中定义的加工数据 bigNumber
this.$store.dispatch("increasement", 2); // 发送一个名为 increasement 的动作，触发该动作的回调函数，并将 2 作为参数传入
this.$store.commit("INCREASEMENT", 2); // 发送一个名为 INCREASEMENT 的操作，触发该操作的回调函数，并将 2 作为参数传入
```

显然，使用上述方式访问数据或调用方法比较复杂，在 Vue 中我们可以利用 `computed` 或 `methods` 配置项来解决上述问题，如

```js
...
computed:{
    number(){
        return this.$store.state.numer; 
    },
    bigNumber(){
        return this.$store.getters.bigNumber; 
    }
},
methods:{
    increasement(value){
        this.$store.dispatch("increasement", value); 
    },
    INCREASEMENT(value){
        this.$store.commit("INCREASEMENT", value); 
    }
}
...
```

此时我们就可以在 Vue 模板中使用 `number`、`bigNumber`、`increasement(2)`、`INCREASEMENT(2)` 的方式访问数据或调用方法。但是，此时 Vue 组件中的代码量增大，不利于维护，Vuex 为我们提供了四个 `mapXxx` 的方法，用于实现自动生成 `computed` 和 `methods` 中的代码，使程序的编写更加简洁。在此之前，我们需要使用以下方式将这四个方法从 Vuex 中导入。

```js
import {mapState, mapGetters, mapMutations, mapActions} from "vex"
```

- `mapState` 方法：用于将 `state` 数据映射为计算属性。

  - **对象写法**：可以指定计算属性名

    ```js
    computed:{
        ...mapState({qiuhe: "sum", xuexiao: "school", kemu: "subject"});
        /* 这里对象的键名为计算属性名，键值为 state 中的共享数据名 */
        /* 我们可以在 Vue 模板中访问到 qiuhe、xuexiao、kemu 等计算属性 */
    }
    ```

    > `mapState` 方法的返回值为一个对象，因此我们需要**使用扩展运算符 `...` 将对象拆解**成键值对的形式，这样才符合语法。下边的所有的 `mapXxx` 方法都要使用扩展运算符处理，否则会报错。

  - **数组写法**：不可以指定计算属性名，计算属性和 `state` 中的数据必须同名

    ```js
    computed:{
        ...mapState(["sum", "school", "subject"]);
        /* 这里的元素值既表示 state 中的共享数据名，也表示计算属性名 */
        /* 我们可以在 Vue 模板中访问到 sum、school、subject 等计算属性 */
    }
    ```

- `mapGetters` 方法：用于将 `getters` 数据映射为计算属性。

  - **对象写法**：可以指定计算属性名

    ```JS
    computed:{
        ...mapGetters({dahe: "bigSum"});
        /* 与 mapState 的对象写法一样 */
    }
    ```

  - **数组写法**：不可以指定计算属性名，计算属性和 `getters` 中的数据必须同名

    ```js
    computed:{
        ...mapGetters(["bigSum"]);
        /* 与 mapState 的数组写法一样 */
    }
    ```

- `mapActions` 方法：用于生成与 `actions` 对话的方法，每个方法中内置了 `$store.dispatch("动作名", value)`。

  - **对象写法**：可以指定方法名

    ```js
    methods:{
    	...mapActions({jia: "increasement"});
    	/* 这里对象的键名为方法名，键值为 actions 中定义的动作回调名 */
        /* 我们可以在 Vue 模板中调用 jia 等方法 */
    }
    ```

    > `mapActions` 包装的方法需要接收一个参数 `value`，作为 `dispatch` 方法的第二个参数传入

  - **数组写法**：不可以指定方法名，方法名和 `actions` 中对应的动作回调同名

    ```js
    methods:{
    	...mapActions(["increasement"]);
        /* 这里的元素值既表示 actions 中定义的动作回调名，也表示方法 */
        /* 我们可以在 Vue 模板中调用 increasement 等方法 */
    }
    ```

- `mapMutations` 方法：用于生成与 `mutations` 对话的方法，每个方法中内置了 `$store.commit("操作名", value)`

  - **对象写法**：可以指定方法名

    ```js
    methods:{
    	...mapMutations({jia: "INCREASEMENT"});
    	 /* 与 mapActions 的对象写法一样 */
    }
    ```

    > `mapMutations` 包装的方法需要接收一个参数 `value`，作为 `commit` 方法的第二个参数传入

  - **数组写法**：不可以指定方法名，方法名和 `mutations` 中对应的操作回调同名

    ```js
    methods:{
    	...mapMutations(["INCREASEMENT"]);
        /* 与 mapActions 的数组写法一样 */
    }
    ```

### 5.7 Vuex 模块化



## 6. Vue-router

## 7. element-ui

## 8. Vue3













