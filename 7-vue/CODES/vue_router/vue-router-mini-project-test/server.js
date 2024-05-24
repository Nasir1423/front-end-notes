const express = require("express"); // Express 框架
const history = require("connect-history-api-fallback"); // 用于解决 history 工作模式问题的中间件

const app = express(); // 创建应用对象

app.use(history()); // 使用中间件，解决 history 工作模式带来的问题
app.use(express.static(__dirname + "/static")); // 设置静态资源目录

app.get("/hello", (req, res) => {
    res.send("<h1>欢迎来到该项目</h1>")
})

app.listen(5000, (err) => {
    if(!err) console.log("服务器启动成功，项目以部署完成")
})