/* 
    练习：批量重命名，如果文件名以 0-9 开头，则更改为 00-09 的形式（为了通过修改文件名，使其符合文件的自然排序）
*/

const fs = require('fs');

// 随机生成一些文件
for (let i = 0; i < 20; i++) {
    let data = [];
    for (let j = 0; j < 100; j++) {
        data.push(String(Math.random()));
    }
    data = String(data);
    fs.writeFileSync(`${__dirname}/FSData/batch-rename-demo/${i}-randomContent.txt`, data);
}

// 批量重命名
let fileNames = fs.readdirSync(`${__dirname}/FSData/batch-rename-demo`);
fileNames.forEach(fileName => {
    let [fileNameNum, fileNameResidual] = fileName.split('-');
    if (Number(fileNameNum) < 10) {
        fileNameNum = 0 + fileNameNum;
    }
    fs.renameSync(`${__dirname}/FSData/batch-rename-demo/${fileName}`,
        `${__dirname}/FSData/batch-rename-demo/${fileNameNum}-${fileNameResidual}`)
});
