/* 检测是否登录的中间件（通过 session 检测） */
module.exports = function(req, res, next){
    if(req.session.username){
        next();
    }else{
        res.redirect('/login');
    }
}