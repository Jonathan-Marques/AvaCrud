const ProdutoService = require('../services/ProdutoService');

module.exports = {
    
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let produtos = await ProdutoService.buscarTodos();

        for(let i in produtos){
            json.result.push({
                codigo: produtos[i].codigo,
                produto: produtos[i].nomeproduto,
                fabricante: produtos[i].fabricante,
                categoria: produtos[i].categoria,
                quantidade: produtos[i].quantidade,
                preco: produtos[i].preco
            });
        }

        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; //para pegar o parametro
        let produto = await ProdutoService.buscarUm(codigo);

        if(produto){
            json.result = produto; //se tiver nota ele joga no json
        }

        res.json(json);
    },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let nomeproduto = req.body.nomeproduto;
        let fabricante = req.body.fabricante;
        let categoria = req.body.categoria;
        let quantidade = req.body.quantidade;
        let preco = req.body.preco;
        
        if (nomeproduto && fabricante && categoria && quantidade && preco){
            let produtoCodigo = await ProdutoService.inserir(nomeproduto, fabricante, categoria, quantidade, preco);
            json.result = {
                codigo: produtoCodigo,
                nomeproduto,
                fabricante,
                categoria,
                quantidade,
                preco
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo;
        let nomeproduto = req.body.nomeproduto;
        let fabricante = req.body.fabricante;
        let categoria = req.body.categoria;
        let quantidade = req.body.quantidade;
        let preco = req.body.preco;

        if (codigo && nomeproduto && fabricante && categoria && quantidade && preco){
            await ProdutoService.alterar(codigo, nomeproduto, fabricante);
            json.result = {
                codigo,
                nomeproduto,
                fabricante,
                categoria,
                quantidade,
                preco
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },
    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await ProdutoService.excluir(req.params.codigo);
        
        res.json(json);
    },
}