const ejs = require('ejs');
const fs = require('fs');

let arr = ['唐僧', '孙悟空', '猪八戒', '沙和尚'];

// 原生 JS 实现列表渲染（即将 arr 内容转换为 HTML 中的列表）
let str = '<ul>';
arr.forEach(item => str += `<li>${item}</li>`);
str += '</ul>';
console.log(str);
/* 
    <ul><li>唐僧</li><li>孙悟空</li><li>猪八戒</li><li>沙和尚</li></ul>
*/

// EJS 实现列表渲染
// 模板字符串
let template = '<ul><% arr.forEach(item => { %><li><%= item %></li><% }) %></ul>';
// 变量解释对象
let data = { arr: arr };
// 渲染结果
let renderRes = ejs.render(template, data);
console.log(renderRes);
/* 
    <ul><li>唐僧</li><li>孙悟空</li><li>猪八戒</li><li>沙和尚</li></ul>
*/

// EJS 实现 HTML 中的列表渲染
template = fs.readFileSync(__dirname + '/template2.html').toString();
data = {arr: arr};
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
    <ul>
        
        <li>唐僧</li>
        
        <li>孙悟空</li>
        
        <li>猪八戒</li>
        
        <li>沙和尚</li>
        
    </ul>
</body>

</html>
*/
