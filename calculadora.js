"use strict"

/*Funcion para tomar los parametros de entrada desde la consola*/
var paramsIn = process.argv.slice(2);

var numero1 = parseFloat(paramsIn[0]);
var numero2 = parseFloat(paramsIn[1]);

var plantilla = 
`
la suma es: ${numero1 + numero2 }
la resta es: ${numero1 - numero2 }
la multiplicacion es: ${numero1 * numero2 }
la division es: ${numero1 / numero2 }
`;

console.log(plantilla);
console.log("Hola mundo con Node.js");

