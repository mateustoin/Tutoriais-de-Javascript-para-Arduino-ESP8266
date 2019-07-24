# Javascript para Arduino e NodeMCU ESP8266 - Início
<!--<link href="styles.css" rel="stylesheet" link/> 
    ![Flowers](javascript.png "Teste") -->

<p align="center">
  <img width="460" height="300" src="javascript.png">
</p>

Você sabia que dá pra usar Javascript para controlar um Arduino!? E uma ESP8266?! Pois é, também fiquei impressionado quando descobri! Para conseguir fazer isso, você só precisa compilar um código na sua placa, o StandardFirmata (para arduino) ou StandardFirmataWifi (para ESP8266) e pronto, a placa já está pronta para ser controlada através do Javascript.

O [Firmata](https://github.com/firmata/protocol "Página sobre o protocolo") é um protcolo de comunicação que permite a comunicação de microcontroladores com softwares de um computador, tablet ou até celulares, por exemplo. O protocolo pode ser implementado em qualquer arquitetura de microcontroaldor, assim como o software pode ser implementado em qualquer dispositivo, com tanto que as bibliotecas padrão consigam ser utilizadas. A seguir você pode dar uma olhadinha em algumas bibliotecas que você pode utilizar para controlar sua placa:

- [Johnny-Five](https://github.com/rwaldron/johnny-five "Biblioteca Johnny-Five")
- [Breakout.js](http://breakoutjs.com/ "Biblioteca BreakoutJS")
- [Firmata.js](https://github.com/firmata/firmata.js "Biblioteca Firmata.js")
- [CylonJS](https://cylonjs.com/ "Biblioteca CylonJS")

Dentre as opções citadas, utilizaremos o Johnny-Five. Antes de começar, precisamos preparar as ferramentas necessárias para começar a programar.

## O que devemos instalar e configurar?

Para rodar e testar o Javascript nas placas você precisará de duas ferramentas muito importantes (clique no link para acessar a página e baixar pelo site oficial):

- [NodeJS]("https://nodejs.org/en/" "Link para download do NodeJS")
- [NPM]("https://www.npmjs.com/get-npm" "Site oficial do NPM")

> Tutoriais de instalação:
> - [Como instalar no Windows](https://www.youtube.com/watch?v=l5B4yUr87uo)
> - [Como instalar no Ubuntu](https://www.youtube.com/watch?v=AHWbz012kxI)

### Configuraçãoda IDE do Arduino para Arduino

Se utilizar um Arduino para a realização desse tutorial, precisará apenas instalar a [IDE do Arduino]("https://www.arduino.cc/en/Main/Software" "Página de download da IDE") para configurar a placa.

Depois de instalar a IDE, agora precisará compilar o código referente ao protocolo de comunicação Firmata. Ele está localizado em **Arquivo > Exemplos > Firmata > StandardFirmata**. Lembrando que esse código deve ser compilado numa placa **Arduino**.

<p align="center">
  <img width="460" height="300" src="StandardFirmata.png">
  <p align="center">Programa utilizado na placa para receber comandos Javascript</p>
</p>

Depois carregue esse código na placa arduino e estará configurado para a próxima etapa.

### Configuraçãoda IDE do Arduino para NodeMCU

Se utilizar uma NodeMCU para a realização desse tutorial, precisará instalar a [IDE do Arduino]("https://www.arduino.cc/en/Main/Software" "Página de download da IDE") para configurar a placa. Após a instalação, deverá instalar os pacotes para utilização da placa com ESP8266. Para isso, vá em **Arquivo > Preferências**.

<p align="center">
  <img width="460" height="300" src="ArquivoPreferencia.png">
  <p align="center">Janela Preferrências serve para adição de pacotes</p>
</p>

Depois basta colar o link a seguir no campo *URLs Adicionais para Gereniadores de Placas*.

```http://arduino.esp8266.com/stable/package_esp8266com_index.json```

<p align="center">
  <img width="460" height="300" src="Preferencias.png">
  <p align="center">URL adicionada em preferências</p>
</p>

Para finalizar a configuração da NodeMCU, vá em **Ferramentas > Placa > Gerenciador de Placas...**

<p align="center">
  <img width="460" height="300" src="Placa.png">
  <p align="center">Gerenciador de atualização e instalação de diversos tipos de placas</p>
</p>

Pesquise por esp8266 e instale a versão que aparece indicada por ESP8266 Community.

<p align="center">
  <img width="460" height="300" src="esp8266.png">
  <p align="center">Instalação necessária para programar no NodeMCU</p>
</p>

Agora precisará abrir o código referente ao protocolo de comunicação Firmata. Ele está localizado em **Arquivo > Exemplos > Firmata > StandardFirmataWifi**. Antes de compilar o código, **RETIRE O COMENTÁRIO** da linha 85 do arquivo *StandardFirmataWifi*, pois precisaremos disso para debugar e pegar o valor do IP da placa, depois **PREENCHA** as linhas 119 e 151 do arquivo *wifiConfig.h*, mudando o *your_network_name* para o nome do seu WiFi e *your_wpa_passphrase* para o nome da senha do seu WiFi. Lembrando que esse código deve ser compilado numa placa **NodeMCU**, pois a conexão será feita através do seu IP na rede. Os códigos devem 

> Configuração da StandardFirmataWifi
> ```cpp
> 85: #define SERIAL_DEBUG
> ```
> 
> Configuração da wifiConfig.h
> ```cpp
> 119: char ssid[] = "your_network_name";
> 151: char wpa_passphrase[] = "your_wpa_passphrase";
> ``` 

## Agora vamos programar (Arduino)!

Crie uma paste onde ficará salvo o seu projeto, nela instalaremos todos os pacotes necessários para a conexão com a placa. Abra a pasta no terminal e utilize os comandos:

```
npm install johnny-five
```

Depois de instalado, uma pasta chamada *node_modules* surgirá e nela devem estar todos os pacotes que precisaremos para programar. Agora basta criar um arquivo chamado **exemplo1.js** na pasta para começar o nosso programa. O primeiro código será o **blink** em JavaScript, famoso Hello World do Arduino! Copie o código a seguir, para testar o blink no Led OnBoard da placa.

```javascript
//Para usar o módulo no seu aplicativo, use a função require para chamá-lo a partir de qualquer arquivo JavaScript:
var five = require("johnny-five");
//Cria objeto para conectar a placa
var board = new five.Board();

//Quando conseguir se conectar a placa, realiza os comandos dentro da 'function()'
board.on("ready", function() {
  // Cria um led no pino digital 13 do Arduino
  var led = new five.Led(13);
  // Pisca o led a cada 1000ms (1 segundo)
  led.blink(1000);
});
```

Agora conecte o Arduino, com o código *StandardFirmata* compilado. Depois digite o comando a seguir no terminal, para executar o código com o NodeJS:

```
node arduino.js
```

Se tudo der certo, ele encontrará o arduino na porta USB e conectará na placa, indicando na tela que está disponível e conectado, logo após o Led OnBoard deve começar a piscar.

<p align="center">
  <img width="460" height="100" src="conexaoArduino.png">
  <p align="center">Conexão com Arduino estabelecida através do NodeJS</p>
</p>

Parabéns, você acabou de executar um código JavaScript para Arduino!

## Agora vamos programar (NodeMCU)!