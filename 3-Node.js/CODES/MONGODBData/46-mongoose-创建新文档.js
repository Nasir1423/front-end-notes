/* 

    Mongoose 通常在 mongoose.connection('open', callback) 的回调函数中进行文档的创建等操作

    第一步：创建文档结构对象 schema = new mongoose.Schema(obj) => 传入一个对象，对文档对象的结构进行限制
    第二步：创建文档模型对象 model = mongoose.model('集合的单数名称', schema) => 文档操作的封装对象
    第三步：创建文档对象 model.create(obj).then(data => {}).catch(err => {}) 
        => 传入一个文档对象，添加到对应的集合中，
            - 创建成功，则调用回调函数 data => {}，data 表示数据库中的该文档对象的值
            - 创建失败，则调用回调函数 err => {}，err 表示错误对象

*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testdb');

mongoose.connection.once('open', () => {
    console.log('mongoose-mongodb 连接成功');

    // 1. 创建文档结构对象
    // 我们可以通过文档结构对象限制某个集合中文档对象的结构（即属性和属性值类型）
    let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
    });

    // 2. 创建文档模型对象
    // 我们可以通过文档模型对象指定文档对象的结构（第二个参数）及其所属集合（第一个参数是集合名的单数形式）
    // 文档模型对象一个操作文档的封装对象，用于实现文档操作
    let BookModel = mongoose.model('books', BookSchema);

    // 3. 基于文档模型对象操作文档 => 创建新文档对象
    // 注意：文档对象创建时，mongodb 会为该对象添加一个唯一编号 __id，mongoose 会为该对象添加一个版本编号 __v
    let book = { name: '西游记', author: '吴承恩', price: 19.9 };
    BookModel.create(book)
        .then( // 文档创建成功
            data => {
                console.log('文档创建成功，文档信息为');
                console.log(data);
                mongoose.disconnect(); // 项目运行过程中不会添加该代码
            })
        .catch( // 文档创建失败
            err => {
                console.log('文档创建出错，错误信息为');
                console.log(err.message);
                mongoose.disconnect(); // 项目运行过程中不会添加该代码
            }
        )
});

mongoose.connection.on('error', () => {
    console.log('mongoose-mongodb 连接失败');
});

mongoose.connection.on('close', () => {
    console.log('mongoose-mongodb 连接关闭');
});