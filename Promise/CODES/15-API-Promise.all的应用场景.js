/* 
    案例1：模拟请求三个接口中的数据，全部请求成功后获取。
*/
// function getUsersList() {
//     return new Promise((resolve, reject) => {
//         //模拟请求用户列表数据
//         setTimeout(() => {
//             resolve('用户列表的数据');
//         }, 1000);
//     })
// }
// function getBannersList() {
//     return new Promise((resolve, reject) => {
//         //模拟请求用户列表数据
//         setTimeout(() => {
//             resolve('轮播图的数据');
//         }, 2000);
//     })
// }
// function getVideoList() {
//     return new Promise((resolve, reject) => {
//         //模拟请求用户列表数据
//         setTimeout(() => {
//             resolve('视频列表的数据');
//         }, 3000);
//     })
// }
// //初始加载的时候
// function initLoad() {
//     let all = Promise.all([getUsersList(), getBannersList(), getVideoList()]);
//     //获取成功请求的结果值
//     all.then(value => {
//         console.log(value);
//     })
// }
// initLoad();

/* 
    案例2：修改多文件读取代码
*/
// const fs = require('fs');
// const util = require('util');
// const mywriteFile = util.promisify(fs.readFile);
// let one = mywriteFile('./resource/1.html');
// let two = mywriteFile('./resource/2.html');
// let three = mywriteFile('./resource/3.html');
// let result = Promise.all([one, two, three]);
// result.then(value => {
//     console.log(value.join(''));
// }, reason => {
//     console.log(reason);
// })