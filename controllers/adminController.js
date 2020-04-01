const path = require('path');
const fs = require('fs');
const caminhoInscritos = path.join('db','newsletter.json');
const caminhoContatos = path.join('db', 'contato.json');
const adminController = {
  
  index: (req, res, next) => {
    let inscritos = fs.readFileSync(caminhoInscritos);
    let contatos = fs.readFileSync(caminhoContatos);
    inscritos = JSON.parse(inscritos, { encoding: 'utf-8'});
    contatos = JSON.parse(contatos, { encoding: 'utf-8'});
    console.log(contatos);
    res.render("admin", {title: "admin", inscritos: inscritos.inscritos, contatos: contatos.contatos});
  }
  
  
};

module.exports = adminController;