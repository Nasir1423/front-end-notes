const mongoose = require('mongoose');

const promise = new Promise((resolve, reject) => {
    mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

    // 连接成功回调
    mongoose.connection.once('open', () => {
        resolve();
    });

    // 连接失败回调
    mongoose.connection.on('error', () => {
        reject();
    });

    // 连接关闭回调
    mongoose.connection.on('close', () => {
        console.log('数据库连接关闭');
    });
});

promise.then(value => {
    console.log('数据库连接成功');

    const NoteSchema = new mongoose.Schema({
        title: String,
        content: String
    });

    const NoteModel = mongoose.model('note', NoteSchema);

    NoteModel.find()
        .then(value => console.log(value),
            reason => console.log(reason))
}, reason => {
    console.log('数据库连接失败');
})