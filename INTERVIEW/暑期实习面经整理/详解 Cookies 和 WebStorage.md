# Cookies 和 WebStorage

Cookies 和 WebStorage（包括 LocalStorage、SessionStorage）是三种常见的**将数据存储在客户端**的方式。在任意一个网页中打开开发者工具（F12），我们可以在 Application 选项卡的中看到 LocalStorage、SessionStorage、Cookies ——这些**存储于当前域名**（Current Domain）下的数据。下边我们对这三种数据存储方式进行介绍，并比较分析他们的共性与区别。

<img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/image-20240526134716059.png" alt="image-20240526134716059" style="zoom:50%;" />

## 一、Cookies

### 1.1 简要介绍

Cookies 有一系列别名，如 HTTP Cookies、Internet Cookies、Browser Cookies、Web Cookies，这些名词指向的都是同一个含义。

Cookies 是**服务器发送给浏览器**的**少量**数据。同时，服务器端存储着该数据以及对应的用户 ID。通过 `Cookie` 请求头，**每次浏览器发送 HTTP 请求时， Cookies 都会被自动发送给服务端**。

Cookies 是以**键值对**（key-value）形式存储的数据。我们也可以设置 Cookies 的**过期时间（expiry date）和对应路径**。

### 1.2 操作 Cookies（document.cookie）

我们可以在 JavaScript 中使用`document.cookie` **创建、读取、删除** Cookies，同时也可以设置 Cookies 的**过期时间和对应路径**。使用示例如下，

```javascript
document.cookie = “username=John Doe”; // 创建 Cookies

document.cookie = “username=John Doe; expires=Thu, 14 Dec 2034 12:00:00 UTC”; // 创建 Cookies 并设置 Cookies 的过期时间。时间到了 Cookies 就会被自动删除。
/* 注意：如果没有指定过期时间（expiration date），Cookies 会在浏览器关闭时自动删除 */

document.cookie = "username=John Doe; expires=Thu, 14 Dec 2034 12:00:00 UTC; path=/"; // 创建 Cookie 并设置 Cookies 的过期时间和对应路径。设置对应路径为 /，表示该 Cookie 对应当前域名（current domain）下的根路径（root path）。
/* 强调：我们知道 Cookies 是对应域名存储的，但是 Cookies 也可以对应域名下的路径存储。例如，如果我们创建 Cookies 并设置 path=/admin：当 URL 类型为 /admin 或 /admin/... (.../admin 不行！！！) 时，我们就可以访问到对应 /admin 路径存储的 Cookies；反之，当 URL 类型为 /cart/... 时，我们就无法访问到对应 /admin 路径存储的 Cookies 数据 */
/* 注意：当我们没有设置 Cookies 的对应路径时，Cookies 所属的对应路径为当前页面（即当前 URL 路径） */
```

> **关于 Cookies 可访问性的进一步说明**
>
> - 设置了 `path`
>   - 如果将 Cookie 的路径设置为`path=/admin`，
>     - 那么该 Cookie 将会在以下路径下可用：`/admin`、`/admin/...` （例如，`/admin/dashboard`，`/admin/settings`）
>     - 然而，它不会在以下路径下可用：`/somethingelse/admin`、`/cart/admin`
> - 没有设置 `path`
>   - 如果在`/example/page` 路径上设置了一个没有路径参数的 Cookie，那么这个 Cookie 将会在 `/example/page `以及其任何子路径（如 `/example/page/subpage`）上可用。
>   - 但是这个 Cookie 不会在`/example/anotherpage`或者`/different/path`路径上可用。
>
> **创建 Cookies 时指定的 path 对应的是网页 URL 的请求路径**
>
> <img src="https://cdn.jsdelivr.net/gh/Nasir1423/blog-img@main/20240526152355.png" style="width:80%;" />

### 1.3 不足之处

- **浏览器每次发送 HTTP 请求都会携带 Cookies 数据到服务器，影响网站整体性能**

  > 每次请求携带 Cookie 增加了请求的体积，会导致网络传输变慢、服务器处理请求时间变长等问题

- **存储上限为 4KB**

- **安全问题**

  > 跨站点脚本攻击（XSS）、跨站点请求伪造（SCRF）、Cookie 劫持、Cookie 欺骗

## 二、WebStorage

### 2.1 简要介绍

HTML5 提供了两个新的对象（LocalStorage、SessionStorage）用于**网页数据的本地存储**，统称为 WebStorage。

WebStorage 也以**键值对**（key-value）形式存储数据。

WebStorage 相比于 Cookies 有以下特点及优势

- 存储的数据**不会随着 HTTP 请求而重新加载或发送给服务器**
- 存储的数据大小**高达 5MB** （与浏览器有关），同时不会影响网页的整体性能
- 存储的数据**只能被客户端（client side）访问**，因此数据更加安全

### 2.2 LocalStorage Vs. SessionStorage

当我们关闭浏览器后，**LocalStorage 中的数据不会消失，但是 ~~SessionStorage~~ 中数据被自动删除**。

### 2.3 操作 WebStorage

下述五个基本方法既适用于 LocalStorage，也适用于 SessionStorage，从而实现对网页本地存储的数据进行操作。

1. **setItem('key','value');** 给 LocalStorage 或 SessionStorage 中添加一个键值对数据

   ```js
   localStorage.setItem('name', 'John Doe');
   sessionStorage.setItem('color', 'red');
   ```

2. **getItem('key');** 根据 key 查找 LocalStorage 或 SessionStorage 中存储的对应的 value；不存在对应数据则返回 null

   ```js
   localStorage.getItem('name'); // output: John Due 
   sessionStorage.getItem('color'); // output: red
   sessionStorage.getItem('age'); // output: null
   ```

3. **removeItem('key');** 根据 key 删除 LocalStorage 或 SessionStorage 中存储的对应的键值对

   ```js
   localStorage.removeItem('name'); 
   localStorage.getItem('name'); // output:null
   
   sessionStorage.removeItem('color');
   sessionStorage.getItem('color'); // output: null
   ```

4. **key(index);** 根据索引 index，返回 LocalStorage 或 SessionStorage 中存储的对应的 key

   ```js
   localStorage.key(0); // output: "name"
   sessionStorage.key(0); // output: "color"
   ```

5. **clear();** 删除 LocalStorage 或 SessionStorage 中存储的所有数据

   ```js
   localStorage.clear();
   sessionStorage.clear();
   ```

## 三、三种数据存储方式的对比分析

### 3.1 共性

Cookies、LocalStorage、SessionStorage 三者都

- 将数据**存储于客户端**（client side），客户端可以对这些数据进行读取和修改。
- 都是**键值对**（key-value）形式的数据。
- **value 必须是字符串**。可以使用 `JSON.stringify()` 将对象序列化为一个字符串后再存储。

### 3.2 差异

|           准则           |     Cookies     | LocalStorage |    SessionStorage     |
| :----------------------: | :-------------: | :----------: | :-------------------: |
|         存储容量         |       4kb       |   5-10 MB    |        5-10 MB        |
|        是否会过期        |        √        |      ×       |           √           |
|     服务端是否可访问     |        √        |      ×       |           ×           |
| 数据是否随 HTTP 请求发送 |        √        |      ×       |           ×           |
|       数据丢失时机       |     过期时      |   定期删除   | 浏览器页签（tab）关闭 |
|       数据存储位置       | 客户端 & 服务端 |    客户端    |        客户端         |

## REFERENCES

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage、

https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

https://medium.com/segmentify-tech/cookie-vs-local-storage-session-storage-ee4c0a07b74e

https://medium.com/@dimplekumari0228/describe-the-difference-between-a-cookie-sessionstorage-and-localstorage-e731a627acb1