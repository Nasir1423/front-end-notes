/* Vue3 通过 Proxy 实现响应式的优势：可以监视数据新增与删除操作 */

/* 

    const 代理对象 = new Proxy(源对象, {
        get(target, propName) { ... },
        set(target, propName, value) { ... },
        deleteProperty(target, propName) { ... }
    })

    这里的 target 就是源对象，propName 是对应操作的属性名，value 表示修改或追加的属性值

*/

// 源数据
const _data = {
    name: "chuanyitu",
    age: 19,
    gender: "male"
};

// 响应式实现 —— Proxy 数据劫持
const data = new Proxy(_data, {
    /* 数据读取时调用 */
    get(target, propName) {
        console.log(`读取了源对象的 ${propName} 属性`);
        return Reflect.get(target, propName);
    },
    /* 数据修改时调用、数据追加时调用 */
    set(target, propName, value) {
        if (target[propName]) { // 数据修改
            console.log(`修改了源对象的 ${propName} 属性的值为 ${value}`);
        } else { // 数据新增
            console.log(`新增了源对象的 ${propName} 属性的值为 ${value}`);
        }
        Reflect.set(target, propName, value);
    },
    /* 数据删除时调用 */
    deleteProperty(target, propName) {
        console.log(`删除了源对象的 ${propName} 属性`);
        return Reflect.deleteProperty(target, propName);
    }
});

console.log("--------------数据读取");
console.log(data.age);
console.log(_data);
console.log("--------------数据修改");
data.age = 18;
console.log(_data);
console.log("--------------数据删除");
console.log(delete data.age);
console.log(_data);
console.log("--------------数据新增");
data.height = 180;
console.log(_data);