const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM produto', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM produto WHERE codigo = ?', [codigo], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){ //vai verificar se retornou mais de 1 e pegar o 1
                    aceito(results[0]);
                }else {
                    aceito(false);
                }
            });
        });
    },
    inserir: (momeproduto, fabricante, categoria, quantidade, preco)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO produto (momeproduto, fabricante,categoria, quantidade, preco) VALUES (?, ?, ?, ?, ?)',
                [momeproduto, fabricante, categoria, quantidade, preco],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },
    alterar:(codigo, momeproduto, fabricante, categoria, quantidade, preco)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE produto SET momeproduto = ?, fabricante =? , categoria = ?, quantidade = ?, preco = ? WHERE codigo = ?',
                [momeproduto, fabricante, categoria, quantidade, preco, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (codigo)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM produto WHERE codigo = ?',[codigo], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};