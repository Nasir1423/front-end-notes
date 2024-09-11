/* 

    Mongoose 连接数据库分为以下步骤

*/

// 1. 安装 mongoose 包：npm install mongoose

// 2. 导入 mongoose 包
const mongoose = require('mongoose');

// 3. 连接数据库，方法参数包括：协议名称、域名、端口号、数据库名称（不存在则会自动创建）
// 注意：连接数据库之前，一定要保证 mongodb 服务中无任何内容被选中
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

// 4. 设置连接回调
// 4.1 设置连接成功的回调，这里使用 once 绑定回调函数，确保回调函数最多只会执行一次
mongoose.connection.once('open', () => {
    console.log('mongoose-mongodb 连接成功');
});

// 4.2 设置连接失败的回调
mongoose.connection.on('error', () => {
    console.log('mongoose-mongodb 连接失败');
});

// 4.3 设置连接关闭的回调，我们可以使用 mongoose.disconnect() 关闭数据库
mongoose.connection.on('close', () => {
    console.log('mongoose-mongodb 连接关闭');
});