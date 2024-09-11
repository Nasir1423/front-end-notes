/* 增删查账本信息的路由 */
var express = require('express');
var router = express.Router();

var LedgerModel = require('../../models/LedgerModel.js');

var checkLoginMiddleWare = require('../../middleware/checkLogin.js')

// 首页路由规则
router.get('/', (_, res) => {
  res.redirect('/ledger-list');
});

// 渲染账单详情，每次都要根据本地数据重新渲染（查）
router.get('/ledger-list', checkLoginMiddleWare, (_, res) => {
  LedgerModel.find().sort({ 'occurrence-time': -1 }).exec()
    .then(data => res.render('index', { ledgerList: data }))
    .catch(() => res.status(500).send('读取失败'));
});

// 渲染表单页面，用户填写相关数据
router.get('/add-entries', checkLoginMiddleWare, (_, res) => {
  res.render('create');
});

// 渲染表单提交结果，用户提交数据后，需要将用户数据保存到本地（增）
router.post('/ledger-list', checkLoginMiddleWare, (req, res) => {
  LedgerModel.create({
    ...req.body,
    'occurrence-time': new Date(req.body['occurrence-time']),
  })
    .then(() => res.render('success', { msg: '添加成功', url: '/ledger-list' }))
    .catch(() => res.status(500).send('插入失败'));
});

// 渲染账单删除结果，用户点击对应条目的叉号，需要将用户删除条目与本地同步（删）
router.get('/delete-entries-:id', checkLoginMiddleWare, (req, res) => {
  // 获取用户要删除的条目的 id
  let id = req.params.id;
  // 本地同步删除操作
  LedgerModel.deleteOne({ _id: id })
    .then(() => res.render('success', { msg: '删除成功', url: '/ledger-list' }))
    .catch(() => res.status(500).send('删除失败'));
});


module.exports = router;
