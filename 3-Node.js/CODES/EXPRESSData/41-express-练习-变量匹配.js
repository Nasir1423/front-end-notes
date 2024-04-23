const ejs = require('ejs');
const fs = require('fs');

// EJS 简单实用
// 模板字符串
let template = '<h1>Welcome to <%= country %>!</h1>';
// 变量解释对象
let data = { country: "China" };
// 使用变量解释对象解析模板字符串
let result = ejs.render(template, data);
console.log(result); // <h1>Welcome to China!</h1>

// EJS 用于 HTML 渲染
// HTML 模板字符串
template = fs.readFileSync(__dirname + '/template1.html').toString();
// 变量解释对象
data = { name: 'Tom Sun', country: 'China' };
// 使用变量解释对象解析模板字符串
result = ejs.render(template, data);
console.log(result);
/* 
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>

    <body>
        <h1>
            Tom Sun: Welcome to China!
        </h1>
    </body>

    </html>
*/