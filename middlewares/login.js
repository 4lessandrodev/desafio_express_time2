
const logado = (req, res, next) =>{
    if(typeof(req.session.user) != 'undefined'){
        next();
    }else{
        res.redirect('/admin/login');
    }
};
module.exports = {logado};