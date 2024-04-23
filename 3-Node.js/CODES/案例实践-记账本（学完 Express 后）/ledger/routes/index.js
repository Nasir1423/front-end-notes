var express = require('express');
var router = express.Router();

// 生成记账 entry 的 id
const nanoid = require('nanoid');
// 获取 db 对象
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/../public/db.json');
const db = low(adapter);

// 渲染账单详情，每次都要根据本地数据重新渲染
router.get('/ledger-list', (_, res) => {
  res.render('index', { ledgerList: db.get('ledger-list').value() });
});

// 渲染表单页面，用户填写相关数据
router.get('/add-entries', (_, res) => {
  res.render('create');
});

// 渲染表单提交结果，用户提交数据后，需要将用户数据保存到本地
router.post('/ledger-list', (req, res) => {
  /* 这里我们使用 lowdb 包实现数据的简单保存 */
  db.get('ledger-list').unshift({ id: nanoid(), ...req.body }).write();
  res.render('success', { msg: '添加成功', url: '/ledger-list' });
});

// 渲染账单删除结果，用户点击对应条目的叉号，需要将用户删除条目与本地同步
router.get('/delete-entries-:id', (req, res) => {
  // 获取用户要删除的条目的 id
  let id = req.params.id;
  // 本地同步删除操作
  db.get('ledger-list').remove({ id: id }).write();
  // 渲染删除结果
  res.render('success', { msg: '删除成功', url: '/ledger-list' });
});


module.exports = router;
