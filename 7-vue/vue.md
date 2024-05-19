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


2. 对于[列表过滤](./CODES/vue_basic/12.3-列表过滤.html)和[列表排序](./CODES/vue_basic/12.4-列表排序.html)，我们可以通过计算属性实现

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

### 3.1 Vue-cli 介绍

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



## 4. Vue-router

## 5. Vuex

## 6. element-ui

## 7. Vue3













