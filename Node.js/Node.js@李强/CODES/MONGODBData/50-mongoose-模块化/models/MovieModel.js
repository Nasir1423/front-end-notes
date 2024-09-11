const mongoose = require('mongoose');

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

let MovieModel = mongoose.model('movie', MovieSchema);

module.exports = MovieModel;