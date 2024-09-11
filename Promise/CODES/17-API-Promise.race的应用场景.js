/* 使用场景：请求超时提示 */
function request() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('请求成功');
        }, 4000);
    })
}
function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('网络不畅,请求超时');
        }, 3000);
    });
}
Promise.race([request(), timeout()]).then(value => {
    console.log(value)
}).catch(reason => {
    console.log(reason)
});