const express = require('express');
const app = express();
const systemFiles = require("fs");
const file = './numeros.txt';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const call = {
    main: function(req ,res) {
        systemFiles.readFile(file, (err, data)=>{
            if(err) {
                res.status(500).send(err);
                return;
            }
            const rgx = /[0-9]/g;
            let nums = [];
            let numbers = data.toString().match(rgx);
            for(let num of numbers){
                nums.push(Number(num));
            }
            var sum = nums.reduce((acc, val) => acc + val);
            var media = (sum / nums.length).toFixed(2);
            res.set({ 'Content-Type': 'text/plain' });
            res.send(`O valor total dos números no arquivo é ${sum.toString()}
A média é ${media.toString()}`);
        })
    }
}


app.get('/', call.main);

app.listen(80, ()=>{console.log("Servidor Rodando")});
