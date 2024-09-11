## 附录：lowdb@1.0.0 的简单使用

1. Lowdb: **Small JSON database** for Node, Electron and the browser. Powered by Lodash
2. 使用准备
   ```javascript
    const low = require('lowdb');
    const FileSync = require('lowdb/adapters/FileSync');
    const adapter = new FileSync('db.json');
    // 获取 db 对象，后续操作都是基于这个 db 对象实现的，具体数据以 json 的形式保存在 db.json 中
    const db = low(adapter);
   ```
3. 数据初始化
   ```javascript
   db.defaults({ posts: [], user: {} }).write(); // post 是一个数组，user 是一个对象
   ```
4. 数据写入
   ```javascript
    db.get('posts').push({ id: 1, title: 'lowdb is awesome'}).write(); // 向 post 数组添加一个元素
    
    // Set a user using Lodash shorthand syntax
    db.set('user.name', 'typicode').write(); // 向 user 对象中添加一组键值对
   ```
5. 数据读取
   ```javascript
   db.get('posts').find({ id: 1 }).value(); // 从 post 数组中取出满足 id=1 的元素（单条数据）
   db.get('posts').value() // 取出 post 数组的数据
   ```
6. 数据删除
   ```javascript
   db.get('posts').remove({id:2}).write(); // 删除 post 数组中满足 id=2 的元素
   ```
7. 数据更新
   ```javascript
   db.get('posts').find({id: 1}).assign({title: '你好'}).write() // 更新 post 数组中满足 id=1 的元素的某一个字段的值
   ```
## 预先准备

使用 `express -e 路径` 快捷搭建 Express 骨架，然后运行 `npm i` 安装依赖

## 基本结构搭建

## 响应静态网页

## 获取表单数据

## lowdb 的介绍与演示

## 保存账单信息

## 完善成功提醒

## 账单列表

## 删除账单
