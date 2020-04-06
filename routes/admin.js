let express = require('express');
let router = express.Router();
let middlewareLogin = require('../middlewares/login');
let adminController = require('../controllers/adminController');

router.get('/', middlewareLogin.logado, adminController.index);
router.get('/cadastro', adminController.renderCadastro);
router.post('/cadastro', adminController.cadastro);
router.post('/login', adminController.login);
router.get('/login', adminController.renderLogin);
router.get('/login', adminController.sair);


module.exports = router;
