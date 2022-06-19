let botonesCalculadora = document.getElementsByClassName("botonesCalculadora");
let inputCalculadora = document.getElementById("inputDatos");

function mostrar(elemento){
    let capa;
    if(elemento.id == "f6"){//borrar un elemento
        inputCalculadora.value = inputCalculadora.value.slice(0, -1)/*Copiar desde la pocision 0 del array hasta la penultima*/
    }else if(elemento.id == "f5"){
        mostrarResultado();
    }else if(elemento.id == "f13"){
        inputCalculadora.value = "";
    }else if(elemento.id == "f9"){//ans
        verAnterior();
    }else if(elemento.id == "f12"){//md
        
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

function miPropioSplit(arrayAPicar, arrayDePicacion){
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
    let nuevoArr
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
    console.log(arrayDeOperacion+'p');
    return arrayDeOperacion;
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
    console.log(arrayDeOperacion+'MULDI');
    return arrayDeOperacion;
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
    console.log(arrayDeOperacion+'sr');
    
    return arrayDeOperacion;
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
    console.log(arrayDeOperacion+'M');
    return arrayDeOperacion;
}

function calcularPedacito(arrayDeOperacion){
    //para priorizar operadores
    calcularPotencias(arrayDeOperacion);
    calcularMultiplicacionDivision(arrayDeOperacion);
    calcularSumaResta(arrayDeOperacion);
    calcularModulo(arrayDeOperacion);

    return arrayDeOperacion[0];
}

function desapilar(array){
    let arrayDeCalculo = [];
    while(array[array.length-1] != "("){
        arrayDeCalculo.unshift(array[array.length-1]);
        array.pop();
    }
    array.pop();
    return arrayDeCalculo;
}

function calcular(array){
    let pila = [];
    let resultado = 0;
    for(let elemento of array){
        if(elemento != ")"){
            pila.push(elemento);
            console.log(pila);
        }else{
            let arrayACalcular = desapilar(pila);
            pila.push(calcularPedacito(arrayACalcular));
            console.log(pila);
        }
    }
    resultado = calcularPedacito(pila);
    return resultado;
}

function mostrarResultado(){
    let inputOperacion = inputCalculadora.value;
    let arrayDeOperacion = miPropioSplit(inputOperacion, ["+","-","*","/","^","%","(",")"]);
    console.log(arrayDeOperacion);
    let resultado = calcular(arrayDeOperacion);
    localStorage.setItem("ant", resultado);
    inputCalculadora.value = resultado;
}

