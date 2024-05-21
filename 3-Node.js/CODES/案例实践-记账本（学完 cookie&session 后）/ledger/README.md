## 项目结构
.
├── app.js 主应用程序文件。定义了 Express 应用的主要配置，包括中间件、路由和错误处理。app.js 通常是应用程序的入口文件。
├── bin
│   └── www 应用程序的启动脚本。设置了服务器的端口，启动并监听请求。可以通过 npm start 命令启动服务器。
├── package.json
├── public 静态文件目录。用于存放公开访问的静态资源，如图片、JavaScript 文件和 CSS 文件。
│   ├── images
│   ├── js
│   └── css
│       └── style.css
├── routes 路由定义目录。用于定义应用的不同路由。
│   ├── index.js index.js: 处理根路径 (/) 的路由逻辑。
│   └── users.js users.js: 处理 /users 路径的路由逻辑。
└── views 视图模板文件目录。存放模板引擎文件，用于渲染 HTML 内容。
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files








## 响应注册页面

## 注册用户

## 用户登录

## 写入 session

## 用户登录检测

## 退出登陆

## 首页和 404 页面

## CSRF 跨站请求伪造的解决方式
1. 在本案例中我们通过 `<a href="/logout" class="btn btn-danger">退出登陆</a>` 实现退出登录，该超链接发起一个 `get` 请求，请求路径是 `/log`，此时如果我们在其他网站也发送这种请求，如 `<link rel="stylesheet" href="http://127.0.0.1:3000/logout">`，此时记账本网站就会被退出登陆，这称为 CSRF 跨站请求伪造
2. 为了解决这样的隐患，我们可以将退出登录的请求方式改为 `post` 此时就不容易通过标签（通常是 `get` 请求）直接威胁到记账本网站了