
const logado = (req, res, next) =>{
    if(typeof (req.session.user) != 'undefined'){
        res.redirect('/admin');
        return next();
    }else{
        res.redirect('/admin/login');
    }
    next();
};
const salvarUsuario = (req, res, next, usuario) =>{
    req.session.user = usuario;
    console.log(req.session.user);
    next();
};

module.exports = {logado, salvarUsuario};