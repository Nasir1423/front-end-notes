# Less Overview

[Less 演练场](https://lesscss.org/less-preview/#eyJjb2RlIjoiI2xpYigpIHtcbiAgICAuY29sb3JzKCkge1xuICAgICAgQHByaW1hcnk6IGJsdWU7XG4gICAgICBAc2Vjb25kYXJ5OiBncmVlbjtcbiAgICB9XG4gICAgLnJ1bGVzKEBzaXplKSB7XG4gICAgICBib3JkZXI6IEBzaXplIHNvbGlkIHdoaXRlO1xuICAgIH1cbiAgfVxuICBcbiAgLmJveCB3aGVuICgjbGliLmNvbG9yc1tAcHJpbWFyeV0gPSBibHVlKSB7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogKCR3aWR0aCAvIDIpO1xuICB9XG4gIFxuICAuYmFyOmV4dGVuZCguYm94KSB7XG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XG4gICAgICB3aWR0aDogMjAwcHg7XG4gICAgICAjbGliLnJ1bGVzKDFweCk7XG4gICAgfVxuICB9IiwiYWN0aXZlVmVyc2lvbiI6IjQuMi4wIiwibWF0aCI6InBhcmVucy1kaXZpc2lvbiIsInN0cmljdFVuaXRzIjpmYWxzZX0=)

## 变量 Variables

```less
/* .less */
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

相当于

```css
/* .css */
#header {
  width: 10px;
  height: 20px;
}
```

## 混入 Mixins

混入是一种**将一个规则集中的属性包含到另一个规则集中**的方式，有利于实现规则复用，精简代码。

```less
/* 定义混入 .less */
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

> 我们也可以使用 `#ids` 的方式定义一个混入

```less
/* 使用混入 .less */
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

## 嵌套 Nesting

Less 中**使用嵌套代替 CSS 中的级联**，使得代码更加简洁，同时与 HTML 格式类似。

```less
/* .less */
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

相当于

```css
/* .css */
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

### 嵌套的@规则和冒泡 Nested At-Rules and Bubbling

```less
/* .less */
.component {
  width: 300px; // 默认情况 .component 对应的规则
  @media (min-width: 768px) { // width >= 768px 时 .component 对应的规则
    width: 600px;
    @media  (min-resolution: 192dpi) { // width >= 768 且 min-resolution = 192dpi 时 .component 对应的规则
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) { // width >=1280px 时 .component 对应的规则
    width: 800px;
  }
}
```

以上 @ 规则的嵌套相当于

```less
/* less */
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```

可以把 @规则嵌套的实际含义看做是 @规则的“冒泡”到外部规则的条件范围内，同时保持其自身的条件逻辑。

## 运算 Operations

Less 中可以对**数值、颜色、变量**进行**算术运算**，即 `+`、`-`、`*`、`/`。

- 如果数值携带单位，Less 会**将从左到右数第一个数值的单位作为结果的单位**，然后**将所有数值转换为结果单位下的数值**，再**计算得到结果**。

- 如果数值携带单位，确定结果单位后，**无法进行数值转换，或数值转换无意义**，此时 Less **不会进行数值转换，而是直接按数值原始值进行计算得到结果**。
- 对于**乘法和除法**，确定结果单位后，Less **不会进行数值转换，直接按照数值原始值进行计算得到结果**。这样做是因为考虑 CSS 中涉及到单位的乘法和除法没有意义。
- **除法运算的两个操作数必须放在括号中**才有效，如 `(操作数1 / 操作数2)`。

```less
/* less */
/* 数值运算 */
// 确定结果单位 => 数值转换 => 计算结果
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm

// 确定结果单位 => 数制转换失败 => 直接按原始值计算结果（这种结果显然是无意义的）
@incompatible-units: 2 + 5px - 3cm; // result is 4px

// 乘法：确定结果单位 => 直接按原始值计算结果
@base: 2cm * 3mm; // result is 6cm

/* 变量运算 */
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%

/* 颜色运算 */
@color: (#224488 / 2); // result is #112244
background-color: (#FFFFFF / 16); //results is #101010
background-color: #112244 + #111; // result is #223355

// 除法运算的操作数没有放在括号中，因此无法执行除法计算
@color: #222 / 2; // results in `#222 / 2`, not #111
```

### cal() 例外 exception

为了 CSS 兼容性，Less **不会计算 `cal()` 中的数学表达式**，但会**对其中的变量和嵌套函数**进行求值。

```less
/* less */
@var: 50vh/2;
width: calc(50% + (@var - 20px));  // result is calc(50% + (25vh - 20px))
```

## 转义  Escaping

转义是一种**使用任意字符串动态生成 CSS 属性值**的方式。与混入不同，转义仅表示单个属性值，而混入表示一个规则集中的所有属性。

```less
/* .less 转义-旧方式 */
@min768: ~"(min-width: 768px)"; // 当使用 @min768 这个变量时，其会被转义为具体的 CSS 属性
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

```less
/* .less 转义-新方式 */
@min768: (min-width: 768px); // 当使用 @min768 这个变量时，其会被转义为具体的 CSS 属性
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

相当于

```css
/* .css */
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

## 函数 Functions

Less 中提供了许多**内置函数**，可以用于**转换颜色、操作字符串、进行数学运算**等。

```less
/* .less */
@base: #f04615;
@width: 0.5;

.class {
  // percentage 将数字转换为对应的百分比
  width: percentage(@width); // returns `50%`
  // saturate 增加颜色的饱和度
  color: saturate(@base, 5%);
  // lighten 增加颜色的亮度；spin 调整颜色的色相
  background-color: spin(lighten(@base, 25%), 8);
}
```

## 命名空间和访问器 Namespaces and Accessors

> Less 中的命名空间和 CSS 中的命名空间不是一个东西！！！

Less 中使用命名空间来**管理一组混入**，通过命名空间可以实现有组织的管理混入，同时有利于封装的实现。

```less
/* .less */
/* 定义命名空间 bundle */
#bundle() { // 定义命名空间时，一定要带 ()
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { // 这里的 & 表示当前的选择器，即 .button
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}

#header a {
  color: orange;
  /* 使用命名空间中的混入，语法为 #命名空间.混入名() 或 #命名空间 > .混入名 */
  #bundle.button();
}
```

## 映射 Maps

Less 不仅支持使用混入定义样式以便复用，在 Less 3.5+ 中，我们可以**将混入作为一组映射关系（键值对）来使用**。

```less
/* .less 定义混入 */
#colors() {
  primary: blue;
  secondary: green;
}
```

```less
/* .less 使用混入（作为映射关系） */
.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

相当于

```css
.button {
  color: blue;
  border: 1px solid green;
}
```

## 作用域 Scope

Less 中使用一个变量或混合时，**先在本地查找变量或混合，如果没有找到，再去父作用域中继承**。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

## 注释 Comments

Less 中支持**块状注释** `/* 注释文字 */` 和**行内注释** `//`。

## 导入  Importing

Less 中可以使用 `@import` 导入 `.less` 文件，其中后缀名是可选的。

```less
@import "library"; // library.less (后缀名是可选的)
@import "typo.less";
```

# Less In-Depth

## 变量 Variables

### 基本使用 Basic Use

### 变量插值 Variable Interpolation

