import fs from "node:fs"
                        //()=>{}
const lerDados = (callback) => {
    fs.readFile('livros.json', "utf-8", (err, data)=>{
        if(err){
            callback(err);
        }
        try {
            const livros = JSON.parse(data)
            callback(null, livros);
        } catch (error) {
            callback(error)
        }
    });
}

export default lerDados