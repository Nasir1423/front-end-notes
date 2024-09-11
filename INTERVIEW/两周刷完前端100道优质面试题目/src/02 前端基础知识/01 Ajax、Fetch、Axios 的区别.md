# Ajax
1. 解释：AJAX（Asynchronous JavaScript And XML）是一种在 Web 应用中通过**异步**发送 **HTTP 请求**向服务器获取内容，并使用这些新内容更新页面中相关的部分，而**无需重新加载**整个页面的 **Web 开发技术**。

2. AJAX 有两种实现方式：`XMLHttpRequest` 接口、`fetch` API。

## XMLHttpRequest

1. 解释：XMLHttpRequest（XHR）对象用于与服务器交互，其可以在**不刷新**页面的情况下请求特定 URL，获取数据。

2. 用 XMLHttpRequest 实现 AJAX

   ```js
   // 创建一个新的 XMLHttpRequest 对象
   var xhr = new XMLHttpRequest();
   
   // 配置请求方法和 URL
   xhr.open('GET', 'https://api.example.com/data', true);
   
   // 设置请求头（如果需要）
   xhr.setRequestHeader('Content-Type', 'application/json');
   
   // 注册事件监听器，用于处理响应
   xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) { // 请求已完成
           if (xhr.status === 200) { // 请求成功
               // 解析 JSON 响应
               var responseData = JSON.parse(xhr.responseText);
               console.log(responseData);
           } else {
               console.error('请求失败，状态码：' + xhr.status);
           }
       }
   };
   
   // 发送请求
   xhr.send();
   
   // 或者如果是 POST 请求，可以发送数据
   // var data = JSON.stringify({ key: 'value' });
   // xhr.send(data);
   
   ```

3. 常用 API

   - 构造函数：`new XMLHttpRequest()`

   - 实例属性

     - `XMLHttpRequest.readyState` 一个无符号短整型（`unsigned short`）数字，代表请求的状态码。
     - `XMLHttpRequest.status` 个无符号短整型（`unsigned short`）数字，代表请求的响应状态。在请求完成前，`status` 的值为 `0`。如果 XMLHttpRequest 出错，浏览器返回的 status 也为 0。status 码是标准的 [HTTP status codes](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)。
     - `XMLHttpRequest.responseText` 一个 DOMString，该 DOMString 包含对请求的响应，如果请求未成功或尚未发送，则返回 `null`。

   - 实例方法

     - `xhrReq.open(method, url)` 初始化一个请求。
     - `XMLHttpRequest.send([body])` 发送 HTTP 请求。如果是异步请求（默认为异步请求），则此方法会在请求发送后立即返回；如果是同步请求，则此方法直到响应到达后才会返回。 
     - `setRequestHeader(header, value)` 设置 HTTP 请求头部的值，此方法必须在 `open()` 方法和 `send()` 之间调用。

   - 事件

     - `XMLHttpRequest.onreadystatechange = callback` 当 `readyState` 的值改变的时候，`callback` 函数会被调用。

       |  值  |        状态        |                        描述                         |
       | :--: | :----------------: | :-------------------------------------------------: |
       | `0`  |      `UNSENT`      |        代理被创建，但尚未调用 open() 方法。         |
       | `1`  |      `OPENED`      |              `open()` 方法已经被调用。              |
       | `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得。 |
       | `3`  |     `LOADING`      |    下载中；`responseText` 属性已经包含部分数据。    |
       | `4`  |       `DONE`       |                  下载操作已完成。                   |

## Fetch

1. 解释：`fetch(url, [init])` 接收两个参数，`url` 是获取资源的路径，`init` 用于对请求进行配置。该方法返回一个 Promise，其会在服务器响应时 `resolve` 为该请求的 `response`（即使是错误响应）。只有网络故障或请求被阻止时，该方法返回的 Promise 才会被标记为 `reject`。

2. 基本使用

   ```js
   fetch("http://example.com/movies.json")
     .then((response) => response.json())
     .then((data) => console.log(data));
   ```

   > `fetch` 返回的 Promise 对象会 `resolve` 为一个 Reponse 对象，其需要调用 `json()` 方法将其转换为一个 Promise，其 `resolve` 的结果才是一个 JSON。

3. `fetch` 常用配置

   ```json
   {
       method: "POST", // *GET, POST, PUT, DELETE, etc. 请求方法
       mode: "cors", // no-cors, *cors, same-origin 请求模式
       /* 
       	no-cors：适用于不需要访问响应数据的简单请求，但功能受限。
           - 浏览器只允许使用 GET 和 POST 方法，且 POST 请求的 Content-Type 头只能是 text/plain、application/x-www-form-urlencoded、或 multipart/form-data。
           - 浏览器无法访问响应体内容，返回的 Response 对象会被限制，只能查看到基本信息（如状态码）。
           
       	cors：允许跨域请求，并在服务器允许的情况下，获取完整响应，是处理跨域请求的主要方式。
       	- 浏览器允许使用多种 HTTP 方法（如 GET、POST、PUT、DELETE 等）和任意 Content-Type。
       	- 请求会自动发送一个预检请求（OPTIONS 方法），以确保服务器允许该请求。
       	- 如果服务器允许请求，浏览器将返回完整的响应，并且可以访问响应内容。
       	
       	same-origin：只允许同源请求，确保请求和响应都在同一个域中。
       	- 浏览器只允许同源的请求，不允许跨域。
       */
       /*
       	mode: "no-cors" 仅允许使用一组有限的 HTTP 请求头：
           - Accept
           - Accept-Language
           - Content-Language
           - Content-Type 允许使用的值为：application/x-www-form-urlencoded、multipart/form-data 或 text/plain
       */
       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached 缓存模式
       /*
       	default：默认缓存策略
       	no-cache：不使用缓存
       	reload: 强制重新加载
       	force-cache：强制使用缓存
       */
       credentials: "same-origin", // include, *same-origin, omit 指定请求是否发送 cookies
       /*
       	include：发送
       	same-origin：仅在同源时发送
       	omit：不发送
       */
       headers: { // 请求头
       	"Content-Type": "application/json", // 含义：发送的数据格式为 JSON
       },
       redirect: "follow", // manual, *follow, error 重定向的处理方式
       /*
       	manual：允许你手动处理重定向，适合需要自定义重定向行为的场景。
       	- 请求不会自动跟随重定向，返回的 Response 对象中包含原始的重定向响应。
       	- 如果请求返回了 3xx 状态码，Response 对象会保留该状态码，开发者可以通过 response.headers.get('Location') 获取新的 URL 并手动发送新的请求。
       	
       	follow： 浏览器自动跟随重定向，是默认且最常用的模式。
       	- 浏览器会自动跟随所有重定向，直到获得最终的响应。通常你不会感知到重定向的发生。
       	- 最终返回的 Response 对象将包含最后一个响应的状态码（非 3xx），以及响应数据。
       	
       	error：遇到重定向时直接抛出错误，适合不允许重定向的场景。
       	- 请求遇到 3xx 重定向时，浏览器会直接抛出错误，不会跟随重定向，也不会返回响应。
       	- 请求会被中断，Promise 会被拒绝，并返回一个错误。
       */
       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
       /*
       	控制请求时发送的 Referer 头信息。Referer 头包含了发起请求的页面的 URL。
       	no-referer：浏览器不会发送 Referer 头信息 ==> 目标服务器不会知道用户是从哪个页面发起的请求。
       	no-referrer-when-downgrade：浏览器只在请求相同或更高安全级别的 URL 时发送 Referer 头 ==> 如果当前页面是 HTTPS 协议，而请求是 HTTP 协议（安全级别更低），浏览器将不发送 Referer 头。但如果请求的 URL 是 HTTPS 或与当前页面相同的协议（HTTP 或 HTTPS），则会发送 Referer。
       	origin：浏览器只发送来源页面的基础 URL（即域名部分），而不包括路径和查询参数 ==> 如果页面 URL 是 https://example.com/page?a=1，则 Referer 头只会包含 https://example.com/。
       	origin-when-cross-origin：在同源请求时，浏览器会发送完整的 Referer URL（包括路径和查询参数）；但在跨域请求时，只发送来源页面的基础 URL（域名部分）。
       	same-origin：浏览器仅在同源请求时发送 Referer 头，跨域请求则不发送 Referer。
       	strict-origin：浏览器只发送来源页面的基础 URL，但在跨越协议的请求中（例如从 HTTPS 到 HTTP），不会发送 Referer 头。
       	strict-origin-when-cross-origin：在同源请求时发送完整的 Referer URL，跨域请求只发送基础 URL；但在跨越协议的请求中，不发送 Referer 头。
       	unsafe-url：浏览器在所有请求中发送完整的 Referer 头信息，包括路径和查询参数，无论是同源还是跨域请求，甚至跨越协议。
       */
       body: JSON.stringify(data), // body data type must match "Content-Type" header 请求体
   }
   ```

# Axios

1. 解释：Axios 是一个基于 promise 网络请求库，作用于 node.js 和浏览器中。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 `XMLHttpRequests`。

# difference
- Ajax 是一种技术统称，XMLHttpRequest 和 fetch 是对其的实现
- Fetch 是一个原生 API，用于网络请求
- Axios 是一个第三方库，封装了 XMLHttpRequest