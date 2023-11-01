const express = require('express');
const app = express();
const systemFiles = require("fs");
const file = './numeros.txt';
const num = './nums.txt';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const call = {
    //Função que soma os números e calcula a média dos mesmos. (Melhorei essa função e agora é possível ler os números com mais de 2 algarismos)
    //Inclusive ler na mesma linha os números que estiverem separados por espaços em branco.
    main: function(req ,res) {
        systemFiles.readFile(num, (err, data)=>{
            if(err) {
                res.status(500).send(err);
                return;
            }
            const rgxSpace = /\s/g;
            const nums = [];
            const numbers = data.toString().split("\r\n");
            numbers.forEach(str => {
                if(!rgxSpace.test(str)){
                    nums.push(+str);
                } else {
                    const line = str.split(" ");
                    line.forEach(num => {
                        nums.push(+num);
                    })
                }
            })
            nums.pop();
            const sum = nums.reduce((acc, val) => acc + val).toFixed(2);
            console.log(sum);
            const media = (sum / nums.length).toFixed(2);
            res.set({ 'Content-Type': 'text/plain' });
            res.send(`O valor total dos números no arquivo é ${sum}\nA média é ${media}`);
        });
    },

    count: function(req, res) {
        systemFiles.readFile(file, (err, data) => {
            if(err) {
                res.status(500).send(err);
                return;
            }
            var algarisms = {
                zero: 0,
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0,
                six: 0,
                seven: 0,
                eight: 0,
                nine: 0 
            };
            const rgx = /[0-9]/g;
            const count = data.toString().match(rgx);
            count.forEach(num => {
                if(+num == 0) return algarisms.zero += 1;
                if(+num == 1) return algarisms.one += 1;
                if(+num == 2) return algarisms.two += 1;
                if(+num == 3) return algarisms.three += 1;
                if(+num == 4) return algarisms.four += 1;
                if(+num == 5) return algarisms.five += 1;
                if(+num == 6) return algarisms.six += 1;
                if(+num == 7) return algarisms.seven += 1;
                if(+num == 8) return algarisms.eight += 1;
                if(+num == 9) return algarisms.nine += 1;
            })
            res.set({ 'Content-Type': 'text/plain' })
            res.send(`Quantidade de algarismos numéricos: ${count.length}\n\nZero: ${algarisms.zero}\nUm: ${algarisms.one}\nDois: ${algarisms.two}\nTrês: ${algarisms.three}\nQuatro: ${algarisms.four}\nCinco: ${algarisms.five}\nSeis: ${algarisms.six}\nSete: ${algarisms.seven}\nOito: ${algarisms.eight}\nNove: ${algarisms.nine}\n\nUma pequena análise de dados extraídos de um arquivo com diversos caracteres alfanuméricos.`);
        });
    },
    
    bin: function(req,res) {
        systemFiles.readFile(file, (err, data) => {
            if(err) {
                res.status(500).send(err);
                return;
            }
            const rgx = /[0-9]/g;
            const arr = data.toString().match(rgx);
            const nums = [];
            arr.forEach(num => {
                nums.push(+num);
            });
            const binary = [];
            nums.forEach(num => {
                binary.push(num.toString(2));
            });
            const binaryFormated = [];
            binary.forEach(num => {
                if(num.length == 4) return binaryFormated.push(num);
                if(num.length == 3) return binaryFormated.push('0' + num);
                if(num.length == 2) return binaryFormated.push('00' + num);
                if(num.length == 1) return binaryFormated.push('000' + num);
            });
            res.send(binaryFormated.join("\n"));
        });
    },
    //Função que decodifica os números do arquivo de texto que foram transformados em binários... 
    decypher: function(req, res) {
        systemFiles.readFile(file, (err, data) => {
            if(err) {
                res.status(500).send(err);
                return;
            }
            const rgx = /[0-9]/g;
            const arr = data.toString().match(rgx);
            const nums = [];
            arr.forEach(num => {
                nums.push(+num);
            })
            const bin = [];
            nums.forEach(num => {
                bin.push(+num);
            });
            const dcp = [];
            bin.forEach(bin => {
                dcp.push(bin.toString());
            });
            res.send(dcp.join("\n"));
        })
    }

}


app.get('/', call.main);
app.get('/count', call.count);
app.get('/bin', call.bin);
app.get('/decypher', call.decypher);

app.listen(80, ()=>{console.log("Servidor Rodando")});
