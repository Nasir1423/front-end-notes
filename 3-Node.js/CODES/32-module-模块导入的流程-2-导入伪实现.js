/* 
    使用 require 导入自定义模块的基本流程
        1. 相对路径转换为绝对路径，定位目标模块
        2. 缓存检测：是否已经加载了目标模块？Yes 则跳转 6，No 则继续 3
        3. 读取目标模块代码
        4. 将目标模块代码包裹为一个自执行函数
        5. 缓存该模块的内容
        6. 返回 module.exports 的值

    这里，提供了一个关于模块导入时 require 函数做了什么的一个伪实现
*/

/* 
    伪代码：模拟 require('./32-module-模块导入的流程-1-模块.js') 做了什么
*/

function require(filePath) {
    // 1. 相对路径转换为绝对路径，定位目标模块
    const fileAbsolutePath = path.resolve(__dirname, filePath);
    // 2. 缓存检测：是否已经预先加载了目标模块
    if (caches[fileAbsolutePath]) {
        return caches[fileAbsolutePath];
    }
    // 3. 读取目标模块的代码
    const fileCode = fs.readFileSync(fileAbsolutePath).toString();
    // 4. 将目标模块的代码包裹为一个自执行函数
    let module = {};
    let exports = module.exports = {};
    (function (exports, require, module, __filename, __dirname) {
        /* 
            目标模块的代码，通过自执行函数，可以修改函数体外的 export、module.exports 所指向的对象的内容
        */
        function sayHello() {
            console.log('Hello World!');
        };

        console.log('模块已导入 ^_^');

        module.exports = sayHello;
        /* 
            可以使用以下代码输出该自执行函数
        */
        console.log('当前自执行函数详情为', arguments.callee.toString());
    })(exports, require, module, __filename, __dirname);
    // 5. 缓存该模块要暴露的数据（实际上缓存的是模块对象，而不是 module.exports，但是这里可以这样简单理解）
    caches[fileAbsolutePath] = module.exports;
    // 6. 返回该模块要暴露的数据
    return module.exports;
}