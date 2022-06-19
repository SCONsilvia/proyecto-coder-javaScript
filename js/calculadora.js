let botonesCalculadora = document.getElementsByClassName("botonesCalculadora");
let inputCalculadora = document.getElementById("inputDatos");

function mostrar(elemento){
    let capa;
    if(elemento.id == "f6"){//borrar un elemento
        inputCalculadora.value = inputCalculadora.value.slice(0, -1)/*Copiar desde la pocision 0 del array hasta la penultima*/
    }else if(elemento.id == "f5"){
        mostrarResultado();
    }else if(elemento.id == "f13"){//Ce borrar todo
        inputCalculadora.value = "";
    }else if(elemento.id == "f9"){//ans
        verAnterior();
    }else{
        inputCalculadora.value += elemento.innerHTML;//agregar a value el contenido del a
    }
}

function verAnterior(){
    if(localStorage.getItem("ant")){
        inputCalculadora.value += localStorage.getItem("ant");
    }
}

for(let elemento of botonesCalculadora){
    elemento.addEventListener("click", () => {mostrar(elemento)})
}

function esUnSimbolo(elemento,arrayAVer){
    return arrayAVer.some((elementoDeArray) => elementoDeArray == elemento);
}

function miPropioSplit(arrayAPicar, arrayDePicacion){//separa el strin en array de 1*-1+1 a [1,*,-1,+,1]
    let numero = "";
    let array = [];
    if (arrayAPicar[0] == "("){
        array.push(arrayAPicar[0]);
    }else{
        numero += arrayAPicar[0];
    }
    for(let elemento in arrayAPicar){
        /*ignorando el primer elemento pues ya lo agregamos */
        if(parseInt(elemento) === 0){
            continue;
        }
        /*ALGORITMO PARA QUE FUNCIONE (1+1)*((2--3)/(-4+6)) Y -3+2 */
        if(esUnSimbolo(arrayAPicar[elemento],arrayDePicacion)){
            if(esUnSimbolo(arrayAPicar[elemento - 1],arrayDePicacion)){// - -4 
                if(arrayAPicar[elemento] == "-" || arrayAPicar[elemento] == "+"){
                    if(arrayAPicar[elemento-1] == ")"){
                        array.push(arrayAPicar[elemento]);
                    }else{
                        numero += arrayAPicar[elemento];
                    }
                }else{
                    array.push(arrayAPicar[elemento]);
                }
            }else{
                array.push(numero);
                array.push(arrayAPicar[elemento]);
                numero = "";
            }   
        }else{
            numero += arrayAPicar[elemento];
        }
    }
    /* expresion && lo que va a pasar*/
    numero != "" && array.push(numero);
    return array
}

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;
const modulo = (a, b) => a % b;
const potencia = (a, b) => Math.pow(a, b);//base y exponente

function queOperacionUsar(a,b,funcion){
    return funcion(a,b);
}

function calcularPotencias(arrayDeOperacion){
    let operacion;
    let a;
    let b;
    let resultado;
    for(let i = 0; i < arrayDeOperacion.length; i++){
        if(arrayDeOperacion[i] == "^"){
            operacion = potencia;
            a = arrayDeOperacion[i-1];
            b = arrayDeOperacion[i+1];

            resultado = queOperacionUsar(parseFloat(a),parseFloat(b),operacion);
            arrayDeOperacion[i-1] = resultado;
            arrayDeOperacion.splice(i, 2);
            i = i-1;
        }
    }
}

function calcularMultiplicacionDivision(arrayDeOperacion){
    let operacion;
    let a;
    let b;
    let resultado
    for(let i = 0; i < arrayDeOperacion.length; i++){
        if(arrayDeOperacion[i] == "*"){
            operacion = multiplicacion;
            a = arrayDeOperacion[i-1];
            b = arrayDeOperacion[i+1];

            resultado = queOperacionUsar(parseFloat(a),parseFloat(b),operacion);
            arrayDeOperacion[i-1] = resultado;
            arrayDeOperacion.splice(i, 2);
            i = i-1;
        }else if(arrayDeOperacion[i] == "/"){
            operacion = division;
            a = arrayDeOperacion[i-1];
            b = arrayDeOperacion[i+1];

            resultado = queOperacionUsar(parseFloat(a),parseFloat(b),operacion);
            arrayDeOperacion[i-1] = resultado;
            arrayDeOperacion.splice(i, 2);
            i = i-1;
        }
    }
}

function calcularSumaResta(arrayDeOperacion){
    let operacion;
    let a;
    let b;
    let resultado
    for(let i = 0; i < arrayDeOperacion.length; i++){
        if(arrayDeOperacion[i] == "+"){
            operacion = suma;
            a = arrayDeOperacion[i-1];
            b = arrayDeOperacion[i+1];

            resultado = queOperacionUsar(parseFloat(a),parseFloat(b),operacion);
            arrayDeOperacion[i-1] = resultado;
            arrayDeOperacion.splice(i, 2);
            i = i-1;
        }else if(arrayDeOperacion[i] == "-"){
            operacion = resta;
            a = arrayDeOperacion[i-1];
            b = arrayDeOperacion[i+1];

            resultado = queOperacionUsar(parseFloat(a),parseFloat(b),operacion);
            arrayDeOperacion[i-1] = resultado;
            arrayDeOperacion.splice(i, 2);
            i = i-1;
        }
    }
}

function calcularModulo(arrayDeOperacion){
    let operacion;
    let a;
    let b;
    let resultado
    for(let i = 0; i < arrayDeOperacion.length; i++){
        if(arrayDeOperacion[i] == "%"){
            operacion = modulo;
            a = arrayDeOperacion[i-1];
            b = arrayDeOperacion[i+1];

            resultado = queOperacionUsar(parseFloat(a),parseFloat(b),operacion);
            arrayDeOperacion[i-1] = resultado;
            arrayDeOperacion.splice(i, 2);
            i = i-1;
        }
    }
}

function calcularPedacito(arrayDeOperacion){
    //para priorizar operadores
    calcularPotencias(arrayDeOperacion);
    calcularMultiplicacionDivision(arrayDeOperacion);
    calcularSumaResta(arrayDeOperacion);
    calcularModulo(arrayDeOperacion);

    return arrayDeOperacion[0];
}

function desapilar(array){//desapila hasta que encuentre (
    let arrayDeCalculo = [];
    while(array[array.length-1] != "("){
        arrayDeCalculo.unshift(array[array.length-1]);
        array.pop();
    }
    array.pop();
    return arrayDeCalculo;
}

function calcular(array){//[(,1,+,2,)]
    let pila = [];
    let resultado = 0;
    for(let elemento of array){
        if(elemento != ")"){//apilo hasta todo lo que no sea )
            pila.push(elemento);
        }else{
            let arrayACalcular = desapilar(pila);//desapilo todo hasta ( y todo lo que voy desapilando es lo que voy a calcular
            pila.push(calcularPedacito(arrayACalcular));//calcularPedacito([(,1,+,2]) retorna 3. Calcula una expresion que estaba entre parentesis
        }
    }
    resultado = calcularPedacito(pila);//calcula lo que quedo en la pila que seria una expresion sin parentesis
    return resultado;
}

function mostrarResultado(){
    let inputOperacion = inputCalculadora.value;
    let arrayDeOperacion = miPropioSplit(inputOperacion, ["+","-","*","/","^","%","(",")"]);
    let resultado = calcular(arrayDeOperacion);
    localStorage.setItem("ant", resultado);//guardo el resultado en el local
    inputCalculadora.value = resultado;
}

