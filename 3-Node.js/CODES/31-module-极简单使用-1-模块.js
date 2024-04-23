/* 
    这是一个模块，该模块中声明了一个函数 sayHello，可以通过 module.exports 将该函数暴露出去
    
    我们可以在其他 js 文件中使用 require(该模块的路径) 函数导入该模块，返回值就是 module.exports 的值，也就是 sayHello 函数
*/
function sayHello() {
    console.log('Hello World!');
};

module.exports = sayHello;