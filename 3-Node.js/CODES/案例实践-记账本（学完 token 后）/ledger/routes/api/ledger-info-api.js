/* RESTful API 接口实现对数据的增删改查 */
var express = require('express');
var router = express.Router();

var LedgerModel = require('../../models/LedgerModel.js');

var checkTokenMiddleware = require('../../middleware/checkToken.js');

// 获取账单接口
router.get('/ledgers', checkTokenMiddleware, (_, res) => {
  LedgerModel.find().sort({ 'occurrence-time': -1 }).exec()
    .then(data => res.json({
      code: "0000",
      msg: "读取成功",
      data: data
    }))
    .catch(() => res.json({
      code: "1001",
      msg: "读取失败",
      data: null
    }));
});

// 创建账单接口
router.post('/ledgers', checkTokenMiddleware, (req, res) => {
  // 这里还可以添加表单验证
  LedgerModel.create({
    ...req.body,
    'occurrence-time': new Date(req.body['occurrence-time']),
  })
    .then((data) => res.json({
      code: '0000',
      msg: "添加成功",
      data: data
    }))
    .catch(() => res.json({
      code: '1002',
      msg: "添加失败",
      data: null
    }));
});

// 删除账单接口
router.delete('/ledgers/:id', checkTokenMiddleware, (req, res) => {
  let id = req.params.id;
  // 本地同步删除操作
  LedgerModel.deleteOne({ _id: id })
    .then(() => res.json({
      code: '0000',
      msg: "删除成功",
      data: {}
    }))
    .catch(() => res.json({
      code: "1003",
      msg: "删除失败",
      data: null
    }));
});

// 获取单个账单信息接口
router.get('/ledgers/:id', checkTokenMiddleware, (req, res) => {
  let id = req.params.id;
  // 本地同步删除操作
  LedgerModel.findById(id)
    .then((data) => res.json({
      code: '0000',
      msg: "单个账单信息获取成功",
      data: data
    }))
    .catch(() => res.json({
      code: "1004",
      msg: "单个账单信息获取失败",
      data: null
    }));
});

// 更新账单接口
router.patch('/ledgers/:id', checkTokenMiddleware, (req, res) => {
  let id = req.params.id;
  // 本地同步删除操作
  LedgerModel.updateOne({ _id: id }, req.body)
    .then(() => {
      LedgerModel
        .findById(id)
        .then(data => res.json({
          code: '0000',
          msg: "单个账单信息更新成功",
          data: data
        }))
        .catch(() => res.json({
          code: "1001",
          msg: "读取失败",
          data: null
        }));
    })
    .catch(() => res.json({
      code: "1005",
      msg: "单个账单信息更新失败",
      data: null
    }));
});


module.exports = router;
