/* Promise 封装 fs.readFile */
function ReadFile(path) {
    return new Promise((resolve, reject) => {
        require('fs').readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}

/* 调用封装函数 */
ReadFile(__dirname + '\\resources\\宣州謝脁樓餞別校書叔雲.txt')
    .then((value) => {
        console.log('文件读取成功，内容为');
        console.log(value.toString());
    }, (reason) => {
        console.log('文件读取失败，原因: ' + reason.message);
    })