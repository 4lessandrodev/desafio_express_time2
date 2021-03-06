const path = require('path');
const fs = require('fs');
const caminhoInscritos = path.join('db','newsletter.json');
const caminhoContatos = path.join('db', 'contato.json');
const caminhoUsuarios = path.join('db', 'usuarios.json');
const bcrypt = require('bcrypt');



const adminController = {
  
  index: (req, res, next) => {
    let inscritos = fs.readFileSync(caminhoInscritos);
    let contatos = fs.readFileSync(caminhoContatos);
    inscritos = JSON.parse(inscritos, { encoding: 'utf-8'});
    contatos = JSON.parse(contatos, { encoding: 'utf-8'});
    res.render("admin", {title: "admin", inscritos: inscritos.inscritos, contatos: contatos.contatos});
  },
  
  
  renderCadastro: (req, res) => {
    res.render('cadastroUsuario', { title: 'Cadastro', msg:null });
  },
  
  renderLogin: (req, res) => {
    (req.session.user == undefined)? res.render('login', { title: 'Login', msg: null }) : res.redirect('/admin');
  },
  
  
  
  cadastro: (req, res) => {
    let { nome, email, senha } = req.body;
    let senhaCriptografada = bcrypt.hashSync(senha, 10);
    let infoUsuario = { nome, email, senhaCriptografada };
    
    let listaUsuarios = {};
    if (fs.existsSync(caminhoUsuarios)) {
      // trazendo conteudo do arquivo em formato JSON
      listaUsuarios = fs.readFileSync(caminhoUsuarios, { encoding: 'utf-8' });
      // transformando JSON em obj
      listaUsuarios = JSON.parse(listaUsuarios);
      // pegando array de inscritos e adicionando um novo email
      listaUsuarios.usuarios.push(infoUsuario);
    } else {
      listaUsuarios = {
        usuarios: [infoUsuario]
      };
    }
    // transforma obj em JSON
    listaUsuarios = JSON.stringify(listaUsuarios);
    // guardando lista de inscritos com o novo email
    fs.writeFileSync(caminhoUsuarios, listaUsuarios);
    console.log(infoUsuario);
    // -----
    res.render('cadastroUsuario', { nome, email, senha, title: 'Cadastro', msg:'Cadastro realizado com sucesso!' });
  },
  
  login: (req, res) => {
    let { senha, email } = req.body;
    
    let usuarios = fs.readFileSync(caminhoUsuarios, { encoding: 'utf-8' });
    usuarios = JSON.parse(usuarios);
    
    let usuarioEncontrado = usuarios.usuarios.filter((usuario) => {
      return usuario.email == email;
    });
    
    if (usuarioEncontrado[0]) {
      
      let comparacao = bcrypt.compareSync(senha, usuarioEncontrado[0].senhaCriptografada);
      
      if (comparacao) {
        req.session.user = usuarioEncontrado[0];
        res.redirect('/admin');
      } else {
        res.render('login', { email, senha, title: 'Login', msg: 'Senha inválida' });
      }
      
    } else {
      res.render('login', { email, senha, title: 'Login', msg: 'Usuário não cadastrado' });
    }
  },
  
  sair: (req, res, next) => {
    req.session.user = undefined;
    res.redirect('/admin/login');
  }
  
  
};

module.exports = adminController;