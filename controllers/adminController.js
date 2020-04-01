const path = require('path');
const fs = require('fs');
const caminhoInscritos = path.join('db','newsletter.json');
const caminhoContatos = path.join('db', 'contato.json');
const caminhoUsuarios = path.join('db', 'usuarios.json');
const adminController = {
  
  index: (req, res, next) => {
    let inscritos = fs.readFileSync(caminhoInscritos);
    let contatos = fs.readFileSync(caminhoContatos);
    inscritos = JSON.parse(inscritos, { encoding: 'utf-8'});
    contatos = JSON.parse(contatos, { encoding: 'utf-8'});
    console.log(inscritos);
    res.render("admin", {title: "admin", inscritos: inscritos.inscritos, contatos: contatos.contatos});
  },
  

  renderCadastro: (req, res) => {
    res.render('cadastroUsuario', { title: 'Cadastro', msg:null });
  },


  
  cadastro: (req, res) => {
      let { nome, email, senha } = req.body;

      let infoUsuario = { nome, email, senha };

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

      // -----
    res.render('cadastroUsuario', { nome, email, senha, title: 'Cadastro', msg:'Cadastro realizado com sucesso!' });
  }
  
  
};

module.exports = adminController;