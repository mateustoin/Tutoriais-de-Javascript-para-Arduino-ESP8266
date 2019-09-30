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
