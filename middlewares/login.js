
const logado = (req, res, next) =>{
    if(typeof (req.session.user) != 'undefined'){
        console.log("msg 1");
        res.redirect('/admin')
    }else{
        console.log("msg 2");
        res.redirect('/admin/login');
    }
    console.log("nextttt");
    next();
};
const salvarUsuario = (req, res, next, usuario) =>{
    console.log("msg 3");
    req.session.user = usuario;
};

module.exports = {logado, salvarUsuario};