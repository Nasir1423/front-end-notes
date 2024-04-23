/* 
    我们可以使用文档模型对象，实现对指定集合文档的增删改查等操作（这里假定文档模型对象为 model）
    
    1. 增
        - 添加一个文档 model.create(文档对象).then(data => {}).catch(err => {})
        - 添加多个文档 model.insertMany([文档对象1, 文档对象2, ..., 文档对象m]).then(data => {}).catch(err => {})
    2. 删
        - 删除一个文档 model.deleteOne(条件对象).then(info => {}).catch(err => {})
        - 删除多个文档 model.deleteMany(条件对象).then(info => {}).catch(err => {})
    3. 改
        - 更新一个文档 model.updateOne(条件对象, 要更新的字段及其取值对象).then(info => {}).catch(err => {})
        - 更新多个文档 model.updateMany(条件对象, 要更新的字段及其取值对象).then(info => {}).catch(err => {})
    4. 查
        - 查询一条数据
            - model.findOne(条件对象).then(data => {}).catch(err => {})
            - model.findById('文档对象的 id').then(data => {}).catch(err => {})
        - 查询多条数据
            - model.find().then(data => {}).catch(err => {})
            - model.find(条件对象).then(data => {}).catch(err => {})
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bilibili');

mongoose.connection.once('open', () => {
    console.log('mongoose-mongodb 连接成功');

    let BookSchema = new mongoose.Schema({
        name: String,
        author: String,
        price: Number,
        is_hot: Boolean
    });

    let BookModel = mongoose.model('novel', BookSchema);

    // 1. 增
    // 1.1 增加一个文档对象
    /* BookModel.create({
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 15.99,
        is_hot: true
    }).then(
        data => {
            console.log("添加成功");
            console.log(data); // data 就是添加成功后的文档对象
        }
    ).catch(
        err => {
            console.log("添加失败");
            console.log(err.Message);
        }
    ) */

    // 1.2 增加多个文档对象
    /* BookModel.insertMany([
        {
            name: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 12.50,
            is_hot: false
        },
        {
            name: "1984",
            author: "George Orwell",
            price: 10.00,
            is_hot: true
        },
        {
            name: "Pride and Prejudice",
            author: "Jane Austen",
            price: 9.99,
            is_hot: false
        },
        {
            name: "Harry Potter and the Philosopher's Stone",
            author: "J.K. Rowling",
            price: 19.99,
            is_hot: true
        }
    ]).then(
        data => {
            console.log("批量添加成功");
            console.log(data); // data 就是添加成功后的文档对象数组
        }
    ).catch(
        err => {
            console.log("批量添加失败");
            console.log(err.Message);
        }
    ) */

    // 2. 删
    // 2.1 删除一个文档对象
    /* BookModel.deleteOne({ _id: '66238206f512927a5bdb6258' })
        .then(
            info => {
                console.log('删除成功');
                console.log(info); // info 是删除信息，如 { acknowledged: true, deletedCount: 1 }
            }
        ).catch(
            err => {
                console.log("删除失败");
                console.log(err);
            }
        ) */

    // 2.2 删除多个文档对象
    /* BookModel.deleteMany({ price: 19.9 })
        .then(
            info => {
                console.log('批量删除成功');
                console.log(info); // info 是删除信息，如 { acknowledged: true, deletedCount: 2 }
            }
        ).catch(
            err => {
                console.log("批量删除失败");
                console.log(err);
            }
        ) */

    // 3. 改
    // 3.1 更新一个文档对象
    /* BookModel.updateOne({ price: 19.99 }, { price: 29.99 })
        .then(
            info => {
                console.log('更新成功');
                console.log(info);
                // info 是更新信息，如
                // {
                //     acknowledged: true,
                //     modifiedCount: 1,
                //     upsertedId: null,
                //     upsertedCount: 0,
                //     matchedCount: 1
                // }
            }
        ).catch(
            err => {
                console.log('更新失败');
                console.log(err.Message);
            }
        ) */

    // 3.2 更新多个文档对象
    /* BookModel.updateMany({ price: 59 }, { price: 69.99 })
        .then(
            info => {
                console.log('批量更新成功');
                console.log(info);
                // info 是更新信息，如
                // {
                //     acknowledged: true,
                //     modifiedCount: 3,
                //     upsertedId: null,
                //     upsertedCount: 0,
                //     matchedCount: 3
                // }
            }
        ).catch(
            err => {
                console.log('批量更新失败');
                console.log(err.Message);
            }
        ) */

    // 4. 查
    // 4.1 查询一个文档对象-根据条件对象查询
    /* BookModel.findOne({ name: "红楼梦", author: "曹雪芹", price: 29.9, is_hot: true })
        .then(data => {
            console.log(data); // data 就是查询到的文档对象
        })
        .catch(err => {
            console.log(err);
        }) */

    // 4.2 查询一个文档对象-根据 id 查询
    /* BookModel.findById('66238206f512927a5bdb6245')
        .then(data => {
            console.log(data); // data 就是查询到的文档对象
        })
        .catch(err => {
            console.log(err);
        }) */

    // 4.3 查询多个文档对象-查询全部
    /* BookModel.find()
        .then(data => console.log(data)) // data 就是查询到的文档对象数组
        .catch(err => console.log(err.Message)); */

    // 4.4 查询多个文档对象-根据条件对象查询
    /* BookModel.find({ price: 69.99 })
        .then(data => console.log(data))
        .catch(err => console.log(err)); */
});

mongoose.connection.on('error', () => {
    console.log('mongoose-mongodb 连接失败');
});

mongoose.connection.on('close', () => {
    console.log('mongoose-mongodb 连接关闭');
});