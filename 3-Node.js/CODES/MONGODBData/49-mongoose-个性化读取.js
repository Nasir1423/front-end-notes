/* 

    对于查找到的文档模型，我们可以进行个性化读取，如（假设 model 为文档模型对象）
    1. 筛选特定字段
        - 语法：model.find().select({字段1: 0/1, 字段2: 0/1, ...,.字段n: 0/1}).exec().then(data => {}).catch(err => {})
        - 说明：select 中传入一个对象，对每个字段是否筛选进行说明，0 表示不要该字段，1 表示要该字段
    2. 数据排序
        - 语法：model.find().sort({字段名: 1/-1}).exec().then(data => {}).catch(err => {})
        - 说明：sort 中传入一个对象，对基于哪个字段排序进行说明，-1 表示降序，1 表示升序
    3. 数据截取
        - 语法：model.find().skip(num1).limit(num2).exec().then(data => {}).catch(err => {})
        - 说明：skip(num1) 表示跳过查找结果前 num1 个文档模型；limit(num2) 表示解决查找结果前 num2 个文档模型

*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

mongoose.connection.once('open', () => {
    console.log('mongoose-mongodb 连接成功');

    let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
        is_hot: Boolean
    });

    let BookModel = mongoose.model('novel', BookSchema);

    // 1. 筛选特定字段
    // 以下代码表示查找 price < 20 的文档对象，并且每个对象只显示 name、price 两个字段
    /* BookModel.find({ price: { $lt: 20 } })
        .select({ _id: 0, name: 1, price: 1 }).exec()
        .then(data => console.log(data))
        .catch(err => console.log(err.Message)); */

    // 2. 数据排序
    // 以下代码表示查找 price < 20 的文档对象，并且每个对象基于 price 升序排序，并且每个对象只显示 name、price 两个字段
    /* BookModel.find({ price: { $lt: 20 } })
        .select({ _id: 0, name: 1, price: 1 })
        .sort({ price: 1 }).exec()
        .then(data => console.log(data))
        .catch(err => console.log(err.Message)); */

    // 3. 数据截取
    // 以下代码表示查找 price < 20 的文档对象，并且每个对象只显示 name、price 两个字段，
    // 然后在这些符合条件的文档对象中取前两个
    /* BookModel.find({ price: { $lt: 20 } })
        .select({ _id: 0, name: 1, price: 1 })
        .limit(2)
        .then(data => console.log(data))
        .catch(err => console.log(err.Message));  */

    // 以下代码表示查找 price < 20 的文档对象，并且每个对象只显示 name、price 两个字段，
    // 然后在这些符合条件的文档对象中跳过两个取剩下的
    /* BookModel.find({ price: { $lt: 20 } })
        .select({ _id: 0, name: 1, price: 1 })
        .skip(2)
        .then(data => console.log(data))
        .catch(err => console.log(err.Message)); */

    // 以下代码表示查找 price < 20 的文档对象，并且每个对象只显示 name、price 两个字段，
    // 然后在这些符合条件的文档对象中跳过两个取剩下的前两个
    /* BookModel.find({ price: { $lt: 20 } })
        .select({ _id: 0, name: 1, price: 1 })
        .skip(2)
        .limit(2)
        .then(data => console.log(data))
        .catch(err => console.log(err.Message)); */

});

mongoose.connection.on('error', () => {
    console.log('mongoose-mongodb 连接失败');
});

mongoose.connection.on('close', () => {
    console.log('mongoose-mongodb 连接关闭');
});