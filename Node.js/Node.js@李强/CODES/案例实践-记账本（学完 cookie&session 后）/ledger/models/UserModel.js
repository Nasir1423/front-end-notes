const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    "username":{
        type: String,
        required: true
    },
    "password": String
});

let UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;