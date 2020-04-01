let express = require('express');
let router = express.Router();

let adminController = require('../controllers/adminController');

router.get('/', adminController.index);
router.get('/cadastro', adminController.renderCadastro);
router.post('/cadastro', adminController.cadastro);


module.exports = router;
