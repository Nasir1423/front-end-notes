/* 
    这是一个模块，该模块中声明了一个函数 sayHello，可以通过 module.exports 将该函数暴露出去
    
    我们可以在其他 js 文件中使用 require(该模块的路径) 函数导入该模块，返回值就是 module.exports 的值，也就是 sayHello 函数
*/
function sayHello() {
    console.log('Hello World!');
};

console.log('模块已导入 ^_^'); // 通过该输出语句来证明模块加载确实存在缓存检测

// console.log(arguments.callee.toString()); // 通过该输出语句来查看把目标代码包裹成为的自执行函数

module.exports = sayHello;