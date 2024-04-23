const mongoose = require('mongoose');
const config = require('../config/config.json')
/**
 * 
 * @param {*} success 数据库连接成功时执行的回调函数
 * @param {*} error 数据库连接失败时执行的回调函数
 */
module.exports = function (success, error = () => console.log('mongoose-mongodb 连接失败')) {
    let { DBHOST, DBPORT, DBNAME } = config;
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.connection.once('open', () => {
        success();
    });

    mongoose.connection.on('error', () => {
        error();
    });

    mongoose.connection.on('close', () => {
        console.log('mongoose-mongodb 连接关闭');
    })
}