/* 
    我们可以使用 Node.js 的 http 模块的方法创建一个 http 服务，当我们启动该服务后，可以通过浏览器向该服务发出请求、接受响应

    1. http 模块的导入：require('http')
    2. 创建 http 服务：http.create((request, response) => {}): object
        - 描述：http.create 方法创建了一个 http 服务，该方法接收一个回调函数，用于获取请求报文、设置响应报文
        - 参数：callback 回调函数，接受 request、response 两个参数，当服务端接受到 HTTP 请求时就会执行
            - request 请求报文的封装对象，可以通过该参数获取请求报文的数据
            - response 响应报文的封装对象，可以通过改参数设置响应报文的内容
        - response 对象的相关方法
            - response.setHeader('content-type', 'text/html;charset=utf-8')
                - response.setHeader 方法可以设置响应报文的响应头，接受两个参数，表示一个键值对数据
                - Content-Type:text/html;charset=utf-8 表示告诉浏览器返回的内容是 html，并且以 utf-8 编码，通过该设置，返回给
                浏览器的中文不会乱码
            - response.end(msg) 设置响应体的内容，并结束响应
    3. 启动 http 服务：server.listen(port, () => {})
        - 描述：启动 http 服务，并监视端口 port；当浏览器向端口 port 发出请求时，此时 http 服务就会根据预设的逻辑获取请求报文并返
        回给浏览器响应报文
        - 参数：callback 回调函数，http 服务成功启动时实行
        - 关于端口
            - HTTP 协议的默认端口是 80
            - HTTPS 协议的默认端口是 443
            - HTTP 服务开发常用的端口有 3000、8080、8090、9000 等
        - 注意
            - 我们可以在命令行中使用 ctrl + c 终止 http 服务
            - 当服务启动后，如果更新了代码，则必须重启服务
            - 当启动服务报错端口占用时的处理办法
                - 方式一：关闭当前正在运行的监听对应端口的服务
                - 方式二：修改当前服务要监视的端口
    4. 测试 http 服务：我们可以在浏览器中输入 http://127.0.0.1:port 对本机的 port 端口发送请求，此时服务器如果启动，便会进行响应

    注：怎么找到正在占用端口 port 的程序？
        step 1 打开资源监视器 => 网络选项卡 => 侦听端口部分：获取到正在占用 port 端口的进程的 pid
        step 2 打开任务管理器 => 详细信息选项卡：根据获取到的 pid 找到相应的进程并关闭
*/

// 1. 导入 http 模块
const http = require('http');

// 2. 创建 http 服务对象
const server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('你好，HTTP');
});

// 3. 监听端口，启动服务对象
server.listen(9000, ()=>{
    console.log('9000 端口的 http 服务已启动');
});

// 4. 测试 http 服务
// 浏览器输入 http://127.0.0.1:9000