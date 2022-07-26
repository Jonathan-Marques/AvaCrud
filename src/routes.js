const express = require('express');
const router = express.Router();

const ProdutoController = require('./controllers/ProdutoController');

router.get('/produtos', ProdutoController.buscarTodos);
router.get('/produto/:codigo', ProdutoController.buscarUm);
router.post('/produto', ProdutoController.inserir);
router.put('/produto/:codigo', ProdutoController.alterar);
router.delete('/produto/:codigo', ProdutoController.excluir);

module.exports = router;
