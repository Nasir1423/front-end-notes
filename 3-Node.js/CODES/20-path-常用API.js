/* 

    path 模块的常用 API

    1. path.resolve(绝对路径, 相对路径)：根据绝对路径和相对路径拼接出一个规范的绝对路径
    2. path.sep 获取当前操作系统的路径分隔符（windows 的分隔符为 \，linux 的分隔符为 /）
    3. path.parse(路径) 解析当前路径，返回路径对象
    4. path.basename(路径) 解析当前路径，返回路径对象的名称（文件名）
    5. path.dirname(路径) 解析当前路径，返回路径对象的所在目录
    6. path.extname(路径) 解析当前路径，返回路径对象的扩展名

    注
        - __dirname 表示当前文件所在目录的绝对路径
        - __filename 表示当前文件的绝对路径
        - __dirname 和 __filename 都可以看做是全局变量
*/

// 导入 path 模块
const path = require('path');

// resolve 拼接绝对路径
const resolvedPath = path.resolve(__dirname + './20-path-常用API.js');
// const resolvedPath = path.resolve(__dirname + '20-path-常用API.js'); // 这种方式也可以
console.log(`拼接后的绝对路径为 ${resolvedPath}`);

// sep 路径分隔符
const separator = path.sep;
console.log(`当前系统的路径分隔符为 ${separator}`);

// parse 解析路径对象
const currentPathObj = path.parse(__filename);
console.log("当前文件路径信息");
console.log(`>>> 根路径: ${currentPathObj.root}`);
console.log(`>>> 目录: ${currentPathObj.dir}`);
console.log(`>>> 文件全名: ${currentPathObj.base}`);
console.log(`>>> 扩展名: ${currentPathObj.ext}`);
console.log(`>>> 文件名: ${currentPathObj.name}`);

// basename 解析路径对象的文件名
const fileName = path.basename(__filename);
console.log(`当前路径的文件名为: ${fileName}`);

// dirname 解析路径对象的所在目录
const fileDir = path.dirname(__filename);
console.log(`当前路径的文件所在目录为: ${fileDir}`);

// extname 解析路径对象的扩展名
const fileExt = path.extname(__filename);
console.log(`当前路径的文件扩展名为: ${fileExt}`);