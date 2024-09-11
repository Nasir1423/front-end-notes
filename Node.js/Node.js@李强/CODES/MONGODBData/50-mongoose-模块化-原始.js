const mongoose = require('mongoose');

/* 
// 这一部分的主机名、端口、数据库名可以暴露出去，以一个配置文件的形式保存
mongoose.connect('mongodb://127.0.0.1:27017/bilibili'); 
*/

mongoose.connection.once('open', () => {
    console.log('mongoose-mongodb 连接成功');

    /* 
    // 这一部分可以抽离出去，然后暴露出文档模型对象 NovelModel
    let NovelSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
        is_hot: Boolean
    });

    let NovelModel = mongoose.model('novel', NovelSchema); */

    NovelModel.find({ price: { $lt: 30 } }).select({ _id: 0, name: 1, price: 1 }).exec().then(data => console.log(data));

    /* 
    // 这一部分可以抽离出去，然后暴露出文档模型对象 MovieModel
    let MovieSchema = new mongoose.Schema({
        name: String,
        tag: {
            type: String,
            enum: ['喜剧', '悲剧']
        },
        nation: {
            type: String,
            enum: ['欧美', '东亚', '其他']
        }
    });

    let MovieModel = mongoose.model('movie', MovieSchema); */

    MovieModel.find({ tag: '喜剧' }).select({ _id: 0, __v: 0, tag: 0 }).exec().then(data => console.log(data));
});

mongoose.connection.on('error', () => {
    console.log('mongoose-mongodb 连接失败');
});

mongoose.connection.on('close', () => {
    console.log('mongoose-mongodb 连接关闭');
});