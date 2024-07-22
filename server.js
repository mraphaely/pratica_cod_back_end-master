//Paciência e uma boa prova. Que a Força esteja com você!
import { v4 as uuidv4 } from 'uuid'; //Se não souber, não precisa usar.

import { createServer } from 'node:http';
import fs from "node:fs";

import lerDados from './helper/lerDados.js';
const livros = [];
const PORT = 3333;

const server = createServer((request, response) => {
    const { url, method } = request;

    if (method === "POST" && url === "/livros") {//200
        //título, ano de publicação, autor e editora.
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const novoLivro = JSON.parse(body)
            lerDados((err, livros) => {
                if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Erro ao ler dados" }));
                    return
                }
                // novoLivro.id = livros.length + 1
                novoLivro.id = uuidv4();
                livros.push(novoLivro)
                fs.writeFile("livros.json", JSON.stringify(livros, null, 2), (err) => {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Erro ao ler livro" }));
                        return
                    }
                    response.writeHead(201, { "Content-Type": "application/json" })
                    response.end(JSON.stringify({ novoLivro }));
                })
            })
        });
    } else if (method === "POST" && url === "/autores") {//200
        // nome, data de nascimento e nacionalidade.
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const autorLivro = JSON.parse(body)
            lerDados((err, livros) => {
                if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Erro ao ler dados" }));
                    return
                }
                
                
                livros.push(autorLivro)
                fs.writeFile("livros.json", JSON.stringify(livros, null, 2), (err) => {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Erro ao ler dados." }));
                        return
                    }
                    response.writeHead(201, { "Content-Type": "application/json" })
                    response.end(JSON.stringify({ autorLivro }));
                })
            })
        });
    } else if (method === "POST" && url === "/editoras") {//200
        //nome, país e ano de fundação.
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            const editoraLivros = JSON.parse(body)
            lerDados((err, livros) => {
                if (err) {
                    response.writeHead(500, { "Content-Type": "application/json" });
                    response.end(JSON.stringify({ message: "Erro ao ler dados" }));
                    return
                }
                
                // livros.id = uuidv4();
                livros.push(editoraLivros)
                fs.writeFile("livros.json", JSON.stringify(livros, null, 2), (err) => {
                    if (err) {
                        response.writeHead(500, { "Content-Type": "application/json" });
                        response.end(JSON.stringify({ message: "Erro ao ler dados." }));
                        return
                    }
                    response.writeHead(201, { "Content-Type": "application/json" })
                    response.end(JSON.stringify({ editoraLivros }));
                })
            })
        });
    } else if (method === "GET" && url.startsWith("/livros/")) {//200
        const id = parseInt(url.split("/")[2])
        lerDados((err, livros) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Erro ao ler dados" }));
                return
            }

            const encontrarLivro = livros.find((livro) => livro.id === id);

            if (!livros) {
              response.writeHead(404, { 'Content-Type': 'application/json' })
              response.end(JSON.stringify({ message: 'Livro não encontrado.' }));
              return
            }
            response.writeHead(200, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(encontrarLivro));
    
        })
    } else if (method === "PUT" && url.startsWith("/editoras/")) {
        const id = parseInt(url.split('/')[2]);
        let body = ''
        request.on("data", (chunk) => {
          body += chunk;
        })
        request.on('end', () => {
          const editoraAtual = JSON.parse(body)
    
          const indexEditora = livros.findIndex((livro) => livro.id === id);
    
          if (indexEditora === -1) {
            response.writeHead(404, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: "Receita selecionada não existe." }));
            return;
          }
    
          livros[indexEditora] = { ...livros[indexEditora], ...editoraAtual };
    
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify(editoraAtual));
        });
    } else if (method === "DELETE" && url.startsWith("/autores/")) {//+ou-
        const id = parseInt(url.split('/')[2]);
        lerDados((err, livros) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "application/json" });
                response.end(JSON.stringify({ message: "Erro ao ler dados" }));
                return
            }
            const autorLivro = livros.findIndex((livros) => livros.id === id);

            if (autorLivro === -1) {
              response.writeHead(404, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ message: "Autor não encontrado" }));
              return
            }
            livros.splice(autorLivro, 1)
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ message: `Autor(a) ${autorLivro} deletado` }));
        })

    } else if (method === "GET" && url.startsWith("/editoras")) {
        lerDados((err, livros) => {
            if (err) {
              response.writeHead(500, { "Content-Type": "application/json" });
              response.end(JSON.stringify({ message: "Erro ao ler dados" }));
              return
            }
            // const autorLivro = livros.findIndex((livros) => livros.autorLivro === autorLivro);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify(livros));
          })
    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Página não encontrada" }));
    }

});

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});