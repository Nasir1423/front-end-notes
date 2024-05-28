/* Vue2 通过 Object.defineProperty 实现响应式的不足之处：无法监视到属性新增、删除操作 */

// 源数据
const _data = {
    name: "chuanyitu",
    age: 19,
    gender: "male"
};

// 响应式实现 —— Object.defineProperty 数据劫持
const data = {};
const keys = Object.keys(_data)
for (let key of keys) {
    Object.defineProperty(data, key, {
        /* getter: 读取数据时调用 */
        get() {
            console.log(`读取了 ${key} 数据`);
            return _data[key]
        },
        /* setter: 修改数据时调用 */
        set(value) {
            console.log(`修改了 ${key} 数据为 ${value}`);
            _data[key] = value
        },
        configurable: true // 配置可以删除属性
    })
}

// 数据读取
console.log("------------数据读取");
console.log(data.age); // 19
console.log(_data.age); // 19
// 修改数据
console.log("------------数据修改");
data.age = 21
console.log(data.age); // 21
console.log(_data.age); // 21
// 删除数据
console.log("------------数据删除");
console.log(delete data.age); // true
console.log(data.age); // undefined
console.log(_data.age); // 21，源数据中没有删除成功！！！
// 新增数据
console.log("------------数据新增");
data.height = 180
console.log(data.height); // 180，
console.log(_data.height); // undefined，源数据中没有新增成功！！！
