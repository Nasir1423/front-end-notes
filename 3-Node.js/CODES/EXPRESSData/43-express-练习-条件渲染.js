/* 
    通过 isLogin 的值渲染不同的页面：true 则渲染欢迎回来；false 则渲染登录页面
*/
const ejs = require('ejs');
const fs = require('fs');

let isLogin = true;

// 原生 JS 实现条件渲染
isLogin ? console.log('<span>欢迎回来</span>') : console.log('<span>跳转登录/注册</span>'); // <span>欢迎回来</span>

// EJS 实现条件渲染
let template = '<% if(isLogin){ %><span>欢迎回来</span><% } else{ %><span>跳转登录/注册</span><% } %>';
let data = {isLogin: isLogin};
let renderRes = ejs.render(template, data);
console.log(renderRes); // <span>欢迎回来</span>

// EJS 实现 HTML 的条件渲染
template = fs.readFileSync(__dirname + '/template3.html').toString();
data = {isLogin};
renderRes = ejs.render(template, data);
console.log(renderRes);
/* 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    
    <span>欢迎回来</span>
    
</body>

</html>
*/
