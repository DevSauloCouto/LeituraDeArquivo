# LeituraDeArquivo

Este algoritmo tem como funcionalidade capturar valores numéricos inteiros em um arquivo de texto e calcular a média dos números.
Ainda acho possível adicionar uma melhor funcionalidade a esse algoritmo, pois ele tem um problema:
Não é possível ler qualquer valor que tenha 2 ou mais caracteres como 10 por exemplo. Ele ler um caracter de cada vez, nesse caso, adicionando o 10, ele leria 1 e 0.

Se no arquivo de texto tiver letras ou símbolos, ele ignora e só captura os números. Fiz essa condição utilizando Regex.
Exemplo: numeros.txt (saldWDWBW2R6R6R364636344354FGWIUWICVWVCW85R3RR6222528DWEVCVEVSJCF65R2R272)

Saída do programa: 
<img src="Captura de tela 2023-10-25 011736.png"
width=500 height=250>
