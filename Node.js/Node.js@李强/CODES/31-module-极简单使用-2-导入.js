/* 
    我们可以使用 require(模块路径) 函数导入一个模块，该模块返回的是模块中通过 module.exports 暴露出的内容
*/
const sayHello = require('./31-module-极简单使用-1-模块');

sayHello(); // Hello World!