const fs = require('fs');

const p = new Promise((resolve, reject) => {
    // 异步操作代码
    fs.readFile(__dirname + '\\resources\\宣州謝脁樓餞別校書叔雲.txt', (err, data) => {
        if (err) reject(err); // 成功时调用
        resolve(data); // 失败时调用
    });
});

p.then((value) => {
    console.log('文件读取成功，结果\n');
    console.log(value.toString());
}, (reason) => {
    console.log('文件读取失败，原因: ' + reason.message);
});