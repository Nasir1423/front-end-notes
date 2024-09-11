const db = require('./db/db.js')
const NovelModel = require('./models/NovelModel');
const MovieModel = require('./models/MovieModel');

db(() => {
    console.log('mongoose-mongodb 连接成功');
    NovelModel.find({ price: { $lt: 30 } }).select({ _id: 0, name: 1, price: 1 }).exec().then(data => console.log(data));
    MovieModel.find({ tag: '喜剧' }).select({ _id: 0, __v: 0, tag: 0 }).exec().then(data => console.log(data));
})