const mongoose = require('mongoose');

let NovelSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean
});

let NovelModel = mongoose.model('novel', NovelSchema);

module.exports = NovelModel;