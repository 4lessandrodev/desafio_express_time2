const path = require('path');
const fs = require('fs');
const caminho = path.join('db','newsletter.json');

const adminController = {
  
  index: (req, res, next) => {
    let inscritos = fs.readFileSync(caminho);
    console.log(inscritos, { encoding: 'utf-8'});
  }
  
  
};

module.exports = adminController;