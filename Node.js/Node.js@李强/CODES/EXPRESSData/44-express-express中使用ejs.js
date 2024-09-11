const express = require('express');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
// 设置模板文件的存放位置（所谓模板文件，即具有模板语法内容的文件）
app.set('views', __dirname); // 就让模板文件存放在当前文件夹中

app.get('/', (_, response) => {
    let templateName = 'welcomeWhoWhere';
    let data = { name: 'Tom Sun', country: 'China' };
    response.render(templateName, data);
});

app.listen(9000, ()=>{
    console.log('Express 应用程序监听 9000 端口中...');
});