let express = require('express');
let router = express.Router();

let adminController = require('../controllers/adminController');

router.get('/', adminController.index);
router.get('/cadastro', adminController.renderCadastro);
router.post('/cadastro', adminController.cadastro);
router.post('/login', adminController.login);
router.get('/login', adminController.renderLogin);


module.exports = router;
