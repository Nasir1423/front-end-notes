/* 
    db.js 抽离出了 Mongoose 中的基本框架，包含
        - 数据库连接，其中连接路径需要靠配置文件设置
        - 三种回调的设置，并且满足
            - 连接成功的回调中进行数据库相关操作（增删改查等）
            - 连接失败的回调函数中显示连接失败
*/
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