var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 文件上传 GET ＆ POST */
// GET 请求：表单页面，提示用户提交个人信息
router.get('/portrait', (_, res) => {
  res.render('portrait');
});

// POST 请求：对用户提交的个人信息（包括文件）进行处理
// 文件的处理使用 formidable 包，使用 npm i formidable 安装包
const { formidable } = require('formidable');

router.post('/portrait', (req, res) => {
  // 表单对象，用于解析表单请求中的内容
  const form = formidable({
    multiples: true, // 设置是否在本地存储上传的文件
    uploadDir: __dirname + '/../public/resources', // 设置上传文件的保存目录
    keepExtensions: true // 设置是否保存文件的后缀
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    /* 
      在获取表单数据、保存文件到本地后，仍需要做一个操作：保存访问该图片的 URL（绝对路径，省略协议、域名、端口等信息），然后将该数
      据存放到数据库中，便于以后的访问
    */
    let fileUrl = '/resources/' + files.avatar[0].newFilename;
    console.log(fileUrl); // /resources/5868edc658fb373e76f7e9200.js
    console.log(123);

    res.json({ fields, files }); // fields 表示非文件数据信息；files 表示文件数据信息
  });
});

module.exports = router;
